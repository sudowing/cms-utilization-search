const net = require('../../network-resources.js')
const db = net.db

function countProviders() {
  return db.from('cms.providers').count()
}
module.exports.countProviders = countProviders

function _readProvidersIndivituals(lmt = 10, off=0) {
  return db.from('cms.providers as pro')
    .select(['pro.npi', 'entity_type', 'address_city', 'address_state', 'gender', 'id.name_first', 'id.name_last'])
    .join('cms.providers_individuals as id', 'id.npi', 'pro.npi')
    .where('pro.entity_type', 'I')
    .limit(lmt)
    .offset(off)
}



function readProvidersIndivituals(lmt = 10, off=0) {
  const qry = db.from('cms.providers as pro')
  .select(['pro.npi', 'entity_type', 'address_city', 'address_state', 'gender', 'id.name_first', 'id.name_last'])
  .join('cms.providers_individuals as id', 'id.npi', 'pro.npi')
  .where('pro.entity_type', 'I')
  .leftOuterJoin('cms.newtable', function() {
    this.on('newtable.npi', '=', 'pro.npi')
  })
  .whereNull('newtable.npi')
  .limit(lmt)
  .offset(off)
  // console.log('')
  // console.log(qry.toString())
  return qry
}


module.exports.readProvidersIndivituals = readProvidersIndivituals


function _readProvidersOrganizations(lmt = 10, off=0) {
const sql = db.from('cms.providers as pro')
    .select(['pro.npi', 'entity_type', 'address_city', 'address_state', 'org.name'])
    .join('cms.providers_organizations as org', 'org.npi', 'pro.npi')
    .where('pro.entity_type', 'O')
    .limit(lmt)
    .offset(off)
  return sql
}

function readProvidersOrganizations(lmt = 10, off=0) {
  const sql = db.from('cms.providers as pro')
      .select(['pro.npi', 'entity_type', 'address_city', 'address_state', 'org.name'])
      .join('cms.providers_organizations as org', 'org.npi', 'pro.npi')
      .where('pro.entity_type', 'O')
      .leftOuterJoin('cms.newtable', function() {
        this.on('newtable.npi', '=', 'pro.npi')
      })
      .whereNull('newtable.npi')
      .limit(lmt)
      .offset(off)
    return sql
  }
  
module.exports.readProvidersOrganizations = readProvidersOrganizations
