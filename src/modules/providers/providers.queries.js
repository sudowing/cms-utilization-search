const net = require('../../network-resources.js')
const db = net.db


const countProviders = (providerType, exclude=false) => {
  if (exclude) {
    return db.from('cms.index_contents').count()
  }
  return db.from('cms.providers')
    .where('entity_type', providerType)
    .count()
}

const readProvidersIndivituals = (lmt = 10, off=0, exclude=false) => {
  const qry = db.from('cms.providers as pro')
    .select(['pro.npi', 'entity_type', 'address_city', 'address_state', 'gender', 'id.name_first', 'id.name_last'])
    .join('cms.providers_individuals as id', 'id.npi', 'pro.npi')
    .where('pro.entity_type', 'I')
  if (exclude) {
    qry.leftOuterJoin('cms.index_contents', function() {
      this.on('index_contents.npi', '=', 'pro.npi')
    })
    .whereNull('index_contents.npi')
  }

  return qry
    .limit(lmt)
    .offset(off)
}

const readProvidersOrganizations = (lmt = 10, off=0, exclude=false) => {
  const qry = db.from('cms.providers as pro')
      .select(['pro.npi', 'entity_type', 'address_city', 'address_state', 'org.name'])
      .join('cms.providers_organizations as org', 'org.npi', 'pro.npi')
      .where('pro.entity_type', 'O')
    if (exclude) {
      qry.leftOuterJoin('cms.index_contents', function() {
        this.on('index_contents.npi', '=', 'pro.npi')
      })
      .whereNull('index_contents.npi')
    }
    return qry
      .limit(lmt)
      .offset(off)
    return sql
  }
  



  module.exports = {
  countProviders,
  readProvidersIndivituals,
  readProvidersOrganizations
}