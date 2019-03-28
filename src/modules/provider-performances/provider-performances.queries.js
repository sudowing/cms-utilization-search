const net = require('../../network-resources.js')
const db = net.db

function countProviders() {
  return db.from('cms.providers').count()
}
module.exports.countProviders = countProviders

function _readProviders(lmt = 10, off=0) {
  return db.from('cms.providers')
    .select(['npi', 'entity_type', 'address_latitude', 'address_longitude'])
    .limit(lmt)
    .offset(off)
}

function readProviders(lmt = 10, off=0) {
  const qry = db.from('cms.providers')
    .select(['providers.npi', 'entity_type', 'address_latitude', 'address_longitude'])
    .leftOuterJoin('cms.newtable', function() {
      this.on('newtable.npi', '=', 'providers.npi')
    })
    .whereNull('newtable.npi')
    .limit(lmt)
    .offset(off)

  console.log('')
  console.log('')
  console.log('---------------')
  console.log('qry')
  console.log(qry.toString())
  console.log('---------------')
  console.log('')
  console.log('')

  return qry
}


module.exports.readProviders = readProviders

const performanceFields = [
  'npi',
  'hcpcs_code',
  'n_of_svcs',
  'n_of_distinct_mcare_beneficiary_per_day_svcs',
  'n_of_mcare_beneficiaries',
  'avg_mcare_pay_amt',
  'avg_submitted_charge_amt',
  'avg_mcare_allowed_amt',
  'avg_mcare_standardized_amt',
  'est_ttl_mcare_pay_amt',
  'est_ttl_submitted_charge_amt',
  'rank_n_of_svcs',
  'rank_n_of_distinct_mcare_beneficiary_per_day_svcs',
  'rank_n_of_mcare_beneficiaries',
  'rank_avg_mcare_standardized_amt',
  'rank_avg_mcare_allowed_amt',
  'rank_avg_submitted_charge_amt',
  'rank_avg_mcare_pay_amt',
  'rank_est_ttl_mcare_pay_amt',
  'rank_est_ttl_submitted_charge_amt',
  'mcare_participation_indicator',
  'place_of_service',
  'var_avg_mcare_submitted_charge_pay_amt',
  'rank_var_avg_mcare_submitted_charge_pay_amt'
]

function readProviderPerformance(npis) {
  return db.from('cms.service_provider_performance')
    .select(performanceFields)
    .whereIn('npi', npis)
}

module.exports.readProviderPerformance = readProviderPerformance
