const net = require('../../network-resources.js')
const performanceFields = require('./provider-performances.helpers').performanceFields

const db = net.db

const countProviders = (exclude=false) => {
  const tbl = exclude ? 'cms.index_contents' : 'cms.providers'
  return db.from(tbl).count()
}

const readProviders = (lmt = 10, off=0, exclude=false) => {
  const qry = db.from('cms.providers')
    .select(['providers.npi', 'entity_type', 'address_latitude', 'address_longitude'])

    if (exclude) {
      qry.leftOuterJoin('cms.index_contents', function(){
        this.on('index_contents.npi', '=', 'providers.npi')
      })
      .whereNull('index_contents.npi')
    }

    return qry
      .limit(lmt)
      .offset(off)
}


const readProviderPerformance = (npis) => {
  return db.from('cms.service_provider_performance')
    .select(performanceFields)
    .whereIn('npi', npis)
}

module.exports = {
  countProviders,
  readProviders,
  readProviderPerformance
}
