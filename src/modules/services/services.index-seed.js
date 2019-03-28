const net = require('../../network-resources.js')
const data = require('./services.queries.js')
const es = net.elasticsearch


const run = async () => {

    for (let n=0; n<603; ++n) {
        const limit = 10
        const offset = n * limit

        const message = `PROCESSING BATCH #${n} (${limit})`
        console.log(message)

        const servicesRaw = await data.readServices(limit, offset)

        const ids = servicesRaw.map(service => service.hcpcs_code)

        const performances = ids.reduce((acc, curr) => {
            acc[curr] = []
            return acc
        }, {})

        const servicePerformances = await data.readServicesPerformanceByCodes(ids)
        for (let servicePerformance of servicePerformances) {
            const { hcpcs_code, ...prf } = servicePerformance
            prf.providers = parseInt(prf.providers, 10)
            prf.avg_avg_mcare_pay_amt = parseFloat(prf.avg_avg_mcare_pay_amt)
            prf.n_of_svcs = parseFloat(prf.n_of_svcs)
            performances[servicePerformance.hcpcs_code] = performances[servicePerformance.hcpcs_code].concat([prf])
        }

        const services = servicesRaw.map(service => {

            const output = {
                ...service,
                performances: performances[service.hcpcs_code],
                suggest: [
                    {
                        input: service.hcpcs_code,
                        weight: 10,
                    },
                    {
                        input: service.hcpcs_description,
                        weight: 5,
                    },
                ]
            }
            return output
        })

        const batch = []

        for (let doc of services){
            const meta = { index:  { _index: 'services', _type: 'record', _id: doc.hcpcs_code } }
            batch.push(meta, doc)
        }

        const indexResponse = await es.bulk({
            body: batch
          }).catch(e => {
            console.log('error: ')
            console.log(e)
        })
                  

        console.log(JSON.stringify(indexResponse))


    }
    

    process.exit(0)

}

run()
