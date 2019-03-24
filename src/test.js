const data = require('./queries.js')

const records = data.readProviders()
    .then(records => {
        console.log(records)
    })


