const net = require('../network-resources.js')
const es = net.elasticsearch


var args = process.argv.slice(2);

const index = args[0]

const run = async () => {
    const { count } = await es.count({
        index
    }).catch(e => {
        console.log('error: ')
        console.log(e)
    })
    console.log('count: ', count)
    process.exit(0)
}



run()
