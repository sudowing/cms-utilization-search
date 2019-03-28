const net = require('../../network-resources.js')
const data = require('./provider-performances.queries.js')
const es = net.elasticsearch


const run = async () => {
    const countResponse = await data.countProviders()
    const count = parseInt(countResponse[0].count, 10)
    console.log(count)
    
    for (let n=0; n<150; ++n) {
        const limit = 10
        const offset = n * limit

        const message = `PROCESSING BATCH #${n} (${limit})`
        console.log(message)

        const providers = await data.readProviders(limit, offset).map(provider => {
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
            performance.mcare_participation_indicator = performance.mcare_participation_indicator === "Y"
            performance.n_of_svcs = parseFloat(performance.n_of_svcs).toFixed(2)
            performance.avg_mcare_pay_amt = parseFloat(performance.avg_mcare_pay_amt).toFixed(2)
            performance.avg_submitted_charge_amt = parseFloat(performance.avg_submitted_charge_amt).toFixed(2)
            performance.avg_mcare_allowed_amt = parseFloat(performance.avg_mcare_allowed_amt).toFixed(2)
            performance.avg_mcare_standardized_amt = parseFloat(performance.avg_mcare_standardized_amt).toFixed(2)
            performance.est_ttl_mcare_pay_amt = parseFloat(performance.est_ttl_mcare_pay_amt).toFixed(2)
            performance.est_ttl_submitted_charge_amt = parseFloat(performance.est_ttl_submitted_charge_amt).toFixed(2)
            performance.var_avg_mcare_submitted_charge_pay_amt = parseFloat(performance.var_avg_mcare_submitted_charge_pay_amt).toFixed(2)
            performance.rank_n_of_svcs = parseInt(performance.rank_n_of_svcs, 10)
            performance.rank_n_of_distinct_mcare_beneficiary_per_day_svcs = parseInt(performance.rank_n_of_distinct_mcare_beneficiary_per_day_svcs, 10)
            performance.rank_n_of_mcare_beneficiaries = parseInt(performance.rank_n_of_mcare_beneficiaries, 10)
            performance.rank_avg_mcare_standardized_amt = parseInt(performance.rank_avg_mcare_standardized_amt, 10)
            performance.rank_avg_mcare_allowed_amt = parseInt(performance.rank_avg_mcare_allowed_amt, 10)
            performance.rank_avg_submitted_charge_amt = parseInt(performance.rank_avg_submitted_charge_amt, 10)
            performance.rank_avg_mcare_pay_amt = parseInt(performance.rank_avg_mcare_pay_amt, 10)
            performance.rank_est_ttl_mcare_pay_amt = parseInt(performance.rank_est_ttl_mcare_pay_amt, 10)
            performance.rank_est_ttl_submitted_charge_amt = parseInt(performance.rank_est_ttl_submitted_charge_amt, 10)
            performance.rank_var_avg_mcare_submitted_charge_pay_amt = parseInt(performance.rank_var_avg_mcare_submitted_charge_pay_amt, 10)
            batchPerformances[performance.npi].push(performance)
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
            console.log('error: ')
            console.log(e)
        })
                  

        console.log(JSON.stringify(indexResponse))
    }
    process.exit(0)

}

run()
