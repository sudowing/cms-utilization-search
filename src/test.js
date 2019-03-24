const data = require('./queries.js')


const run = async () => {
    const countResponse = await data.countProviders()
    const count = parseInt(countResponse[0].count, 10)
    console.log(count)

    const providers = await data.readProviders().map(provider => {
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
    
    console.log(batchPerformances)

    process.exit(0)

}

run()
