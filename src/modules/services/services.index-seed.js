const ProgressBar = require('progress');

const net = require('../../network-resources.js')
const data = require('./services.queries.js')
const es = net.elasticsearch

const limit = 20

const run = async () => {

    const dbResponseCountTotalServices = await data.countServices()
    const countTotalServices = dbResponseCountTotalServices[0].count

    const count = parseInt(countTotalServices, 10)

    console.log(`# Records to Index 'services': ${count}`)
    const bar = new ProgressBar('  reporting to DB [:bar] :rate/documents-per-second :percent :etas', {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total: count
    });
      
    const batches = Math.ceil(count / limit)
    
    for (let n=0; n<batches; ++n) {
        const offset = n * limit

        const message = `PROCESSING BATCH #${n} (${limit})`
        // console.log(message)

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

        bar.tick(services.length)

    }

    process.exit(0)

}

run()
