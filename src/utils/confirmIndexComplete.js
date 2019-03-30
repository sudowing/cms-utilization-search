const net = require('../network-resources.js')
const es = net.elasticsearch

var args = process.argv.slice(2);

const totalServices = 6022
const totalProviders = 1000924
const totalProviderPerformance = 1000924

const run = async () => {
    try{

        const counts = await Promise.all([
            es.count({ index: 'services' }),
            es.count({ index: 'providers' }),
            es.count({ index: 'provider-performance' }),
        ])
        const [ docCountServices, docCountProviders, docCountProviderPerformance ] = counts
        const complete = (
            docCountServices.count === totalServices &&
            docCountProviders.count === totalProviders &&
            docCountProviderPerformance.count === totalProviderPerformance
        )
        console.log(complete)
        if (!complete) {
            if (docCountServices.count < totalServices){
                console.log(`index 'services' short ${totalServices - docCountServices.count} documents`)
            }
            if (docCountProviders.count < totalProviders){
                console.log(`index 'providers' short ${totalProviders - docCountProviders.count} documents`)
            }
            if (docCountProviderPerformance.count < totalProviderPerformance){
                console.log(`index 'providerPerformance' short ${totalProviderPerformance - docCountProviderPerformance.count} documents`)
            }
        }
    }
    catch(e) {
        console.log('error: ')
        console.log(e)
    }
    process.exit(0)
}

run()
