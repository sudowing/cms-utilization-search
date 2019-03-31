const genIndexReport = (items) => {
    const report = items.reduce((accum, curr) => {
        const { index: record } = curr
        accum.successful = accum.successful + record._shards.successful
        accum.failed = accum.failed + record._shards.failed
        return accum
    }, { successful: 0, failed: 0 })
    return report
}

module.exports = {
    genIndexReport
}