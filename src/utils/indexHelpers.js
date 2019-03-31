const net = require('../network-resources')
const es = net.elasticsearch

const genIndexReport = (items) => {
    const report = items.reduce((accum, curr) => {
        const { index: record } = curr
        accum.successful = accum.successful + record._shards.successful
        accum.failed = accum.failed + record._shards.failed
        return accum
    }, { successful: 0, failed: 0 })
    return report
}

const countIndexDocuments = async (index) => {
    const { count } = await es.count({
        index
    }).catch(e => {
        console.log('error: ')
        console.log(e)
    })
    return count
}

module.exports = {
    genIndexReport, countIndexDocuments
}