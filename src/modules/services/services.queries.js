const net = require('../../network-resources.js')
const db = net.db

const countServices = () => {
  return db.from('cms.services').count()
}

const readServices = (lmt = 10, off=0) => {
  const sql = db.from('cms.services as svc')
    .select(['svc.hcpcs_code', 'svc.hcpcs_description', 'svc.hcpcs_drug_indicator'])

    .limit(lmt)
    .offset(off)

  return sql
}


const readServicesPerformanceByCodes = (hcpcsCodes) => {
  const sql = db.from('cms.service_performance as prf')
    .select(['prf.hcpcs_code', 'prf.entity_type', 'prf.providers', 'prf.n_of_svcs', 'prf.avg_avg_mcare_pay_amt'])
    .whereIn('hcpcs_code', hcpcsCodes)
  return sql
}





const readProvidersIndivituals = (lmt = 10, off=0) => {
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



module.exports = {
  countServices,
  readServicesPerformanceByCodes,
  readServices
}
