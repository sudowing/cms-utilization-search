const prepIndexContentsTable = require('./dbHelpers').prepIndexContentsTable

const go = async () => {
    await prepIndexContentsTable(true)
    process.exit(0)
}

go()