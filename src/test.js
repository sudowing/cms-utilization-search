const data = require('./queries.js')


const run = async () => {
    for (let n=0; n<10; ++n) {
        const limit = 100
        const offset = n * limit

        const message = `PROCESSING BATCH #${n} (${limit})`
        console.log(message)

        

        const countResponse = await data.countProviders()
        const count = parseInt(countResponse[0].count, 10)
        console.log(count)

        const providers = await data.readProviders(limit, offset).map(provider => {
            return {
                npi: provider.npi,
                entity_type: provider.entity_type,
                location: {
                    lat: provider.address_latitude,
                    lon: provider.address_latitude,
                }
            }
        })

        const batchPerformances = {}
        for (let provider of providers) {
            batchPerformances[provider.npi] = []
        }
        const providerPerformances = await data.readProviderPerformance(providers.map(provider => provider.npi))
        for (let performance of providerPerformances) {
            batchPerformances[performance.npi].push(performance)
        }

        const documents = providers.map(provider => {
            return {
                ...provider,
                performances: batchPerformances[provider.npi] || null
            }
        })

        console.log(documents)
    }
            
    process.exit(0)

}

run()
