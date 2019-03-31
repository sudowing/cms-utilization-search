
const countIndexDocuments = require('../utils/indexHelpers').countIndexDocuments

const args = process.argv.slice(2);

const index = args[0]

const run = async () => {
    const count = await countIndexDocuments(index)
    console.log('count: ', count)
    process.exit(0)
}

run()
