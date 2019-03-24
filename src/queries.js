const net = require('./network-resources.js')
const db = net.db

function readProviders() {
  return db.from('cms.providers')
    .select(['npi', 'entity_type', 'address_latitude', 'address_longitude'])
    .limit(10)
}

module.exports.readProviders = readProviders
