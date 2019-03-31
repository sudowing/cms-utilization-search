const ProgressBar = require('progress');

const net = require('../../network-resources.js')
const helpers = require('../../utils/indexHelpers')
const data = require('./providers.queries.js')
const reporter = helpers.genIndexReport
const providerHelpers = require('./providers.helpers')

const es = net.elasticsearch

const args = process.argv.slice(2);

const providerType = args[0] && args[0] === "organizations" ? 'O' : 'I'
const exclude = args[1] && args[1] === "rerun"
const limit = 100
const logger = console

const run = async (providerType, exclude= false) => {
    const dbResponseCountTotalProviders = await data.countProviders(providerType)
    const countTotalProviders = dbResponseCountTotalProviders[0].count

    let providersRemaining = countTotalProviders
    if (exclude) {
        const dbResponseCountIndexedProviders = await data.countProviders(providerType, exclude)
        const countIndexedProviders = dbResponseCountIndexedProviders[0].count
        providersRemaining = countTotalProviders - countIndexedProviders
    }
    
    const count = parseInt(providersRemaining, 10)
    
    console.log(`# Records to Index 'providers': ${count}`)
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

        let recordFetcher = data.readProvidersIndivituals
        let recordMapper = providerHelpers.individualMapper

        if (providerType === 'O') {
            recordFetcher = data.readProvidersOrganizations
            recordMapper = providerHelpers.organizationMapper
        }

        const providers = await recordFetcher(limit, offset, exclude).map(recordMapper)

        const batch = []

        for (let doc of providers){
            const meta = { index:  { _index: 'providers', _type: 'record', _id: doc.npi } }
            batch.push(meta, doc)
        }

        const indexResponse = await es.bulk({
            body: batch
          }).catch(e => {
            logger.log('error: ')
            logger.log(e)
        })

        const report = reporter(indexResponse.items)

        bar.tick(providers.length)
                  
    }

    process.exit(0)
}

run(providerType, exclude)
