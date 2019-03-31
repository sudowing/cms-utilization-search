const ProgressBar = require('progress');
const net = require('../../network-resources.js')
const helpers = require('../../utils/indexHelpers')
const perfHelpers = require('./provider-performances.helpers')
const data = require('./provider-performances.queries.js')
const reporter = helpers.genIndexReport
const es = net.elasticsearch

const args = process.argv.slice(2);
const docBuilder = perfHelpers.docBuilder
const exclude = args[0] && args[0] === "rerun"
const limit = 20
const logger = console
const perfTypeCaster = perfHelpers.perfTypeCaster

const run = async (exclude= false) => {

    const dbResponseCountTotalProviders = await data.countProviders()
    const countTotalProviders = dbResponseCountTotalProviders[0].count

    let providersRemaining = countTotalProviders
    if (exclude) {
        const dbResponseCountIndexedProviders = await data.countProviders(exclude)
        const countIndexedProviders = dbResponseCountIndexedProviders[0].count
        providersRemaining = countTotalProviders - countIndexedProviders
    }

    const count = parseInt(providersRemaining, 10)

    console.log(`# Records to Index 'provider-performance': ${count}`)
    const bar = new ProgressBar('  reporting to DB [:bar] :rate/documents-per-second :percent :etas', {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total: count
    });
      
    const batches = Math.ceil(count / limit)
    
    for (let n=0; n<batches; ++n) {
        const offset = n * limit

        const message = `BATCH ${n}/${batches} (size: ${limit})`
        // logger.log(message)

        const providers = await data.readProviders(limit, offset, exclude).map(docBuilder)
    
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

        bar.tick(documents.length)

    }
    process.exit(0)

}

run(exclude)
