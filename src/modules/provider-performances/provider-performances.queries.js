const net = require('../../network-resources.js')
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
