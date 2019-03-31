const countIndexDocuments = require('../utils/indexHelpers').countIndexDocuments


const args = process.argv.slice(2);

const totalServices = 6022
const totalProviders = 1000924
const totalProviderPerformance = 1000924

const run = async () => {
    try{

        const counts = await Promise.all([
            countIndexDocuments('services'),
            countIndexDocuments('providers'),
            countIndexDocuments('provider-performance'),
        ])
        const [ docCountServices, docCountProviders, docCountProviderPerformance ] = counts
        const complete = (
            docCountServices === totalServices &&
            docCountProviders === totalProviders &&
            docCountProviderPerformance === totalProviderPerformance
        )
        console.log(complete)
        if (!complete) {
            if (docCountServices < totalServices){
                console.log(`index 'services' short ${totalServices - docCountServices} documents`)
            }
            if (docCountProviders < totalProviders){
                console.log(`index 'providers' short ${totalProviders - docCountProviders} documents`)
            }
            if (docCountProviderPerformance < totalProviderPerformance){
                console.log(`index 'providerPerformance' short ${totalProviderPerformance - docCountProviderPerformance} documents`)
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
