const net = require('../../network-resources.js')
const data = require('./providers.queries.js')
const es = net.elasticsearch


const run = async () => {
    const countResponse = await data.countProviders()
    const count = parseInt(countResponse[0].count, 10)
    console.log(count)
    
    // for (let n=0; n<9391; ++n) {
    //     const limit = 100
    //     const offset = n * limit

    //     const message = `PROCESSING BATCH #${n} (${limit})`
    //     console.log(message)

    //     const providers = await data.readProvidersIndivituals(limit, offset).map(provider => {
    //         const output = {
    //             ...provider,
    //             suggest: [
    //                 {
    //                     input: `${provider.name_last}, ${provider.name_first}`,
    //                     weight: 10,
    //                 },
    //                 {
    //                     input: `${provider.name_last} ${provider.name_first}`,
    //                     weight: 9,
    //                 },
    //                 {
    //                     input: `${provider.name_first} ${provider.name_last}`,
    //                     weight: 8,
    //                 },
    //                 {
    //                     input: provider.name_last,
    //                     weight: 5,
    //                 },
    //                 {
    //                     input: provider.name_first,
    //                     weight: 1,
    //                 },

    //             ]
    //         }
    //         return output
    //     })

    //     const batch = []

    //     for (let doc of providers){
    //         const meta = { index:  { _index: 'providers', _type: 'record', _id: doc.npi } }
    //         batch.push(meta, doc)
    //     }

    //     const indexResponse = await es.bulk({
    //         body: batch
    //       }).catch(e => {
    //         console.log('error: ')
    //         console.log(e)
    //     })
                  

    //     console.log(JSON.stringify(indexResponse))


    // }




    for (let n=0; n<11; ++n) {
        const limit = 1
        const offset = n * limit

        const message = `PROCESSING BATCH #${n} (${limit})`
        console.log(message)

        const providers = await data.readProvidersOrganizations(limit, offset).map(provider => {
            const output = {
                ...provider,
                suggest: [provider.name]
            }
            return output
        })

        const batch = []

        for (let doc of providers){
            const meta = { index:  { _index: 'providers', _type: 'record', _id: doc.npi } }
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
