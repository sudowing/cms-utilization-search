const net = require('../../network-resources.js')
const helpers = require('../../utils/indexHelpers')
const perfTypeCaster = require('./provider-performances.helpers').perfTypeCaster
const data = require('./provider-performances.queries.js')
const reporter = helpers.genIndexReport
const es = net.elasticsearch

var args = process.argv.slice(2);
const exclude = args[0] && args[0] === "rerun"

const logger = console
const limit = 10

const run = async (exclude= false) => {

    const countResponse = await data.countProviders(exclude)
    const count = parseInt(countResponse[0].count, 10)
    const batches = Math.ceil(count / limit)
    
    for (let n=0; n<batches; ++n) {
        const offset = n * limit

        const message = `BATCH ${n}/${batches} (size: ${limit})`
        logger.log(message)

        const providers = await data.readProviders(limit, offset, exclude).map(provider => {
            return {
                npi: provider.npi,
                entity_type: provider.entity_type,
                location: {
                    lat: provider.address_latitude,
                    lon: provider.address_longitude,
                }
            }
        })

        const batchPerformances = {}
        for (let provider of providers) {
            batchPerformances[provider.npi] = []
        }
        const providerPerformances = await data.readProviderPerformance(providers.map(provider => provider.npi))
        for (let performance of providerPerformances) {
            const typedRecord = perfTypeCaster(performance)
            batchPerformances[performance.npi].push(typedRecord)
        }

        const documents = providers.map(provider => {
            return {
                ...provider,
                performances: batchPerformances[provider.npi] || null
            }
        })

        const batch = []

        for (let doc of documents){
            const meta = { index:  { _index: 'provider-performance', _type: 'record', _id: doc.npi } }
            batch.push(meta, doc)
        }

        const indexResponse = await es.bulk({
            body: batch
          }).catch(e => {
            logger.log('error: ')
            logger.log(e)
        })

        const report = reporter(indexResponse.items)
                  

        logger.log(`  :: successful: ${report.successful}`)
        logger.log(`  :: failed: ${report.failed}`)
    }
    process.exit(0)

}

run(exclude)
