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
  

const perfTypeCaster = (performance) => {
    performance.mcare_participation_indicator = performance.mcare_participation_indicator === "Y"
    performance.n_of_svcs = parseFloat(performance.n_of_svcs).toFixed(2)
    performance.avg_mcare_pay_amt = parseFloat(performance.avg_mcare_pay_amt).toFixed(2)
    performance.avg_submitted_charge_amt = parseFloat(performance.avg_submitted_charge_amt).toFixed(2)
    performance.avg_mcare_allowed_amt = parseFloat(performance.avg_mcare_allowed_amt).toFixed(2)
    performance.avg_mcare_standardized_amt = parseFloat(performance.avg_mcare_standardized_amt).toFixed(2)
    performance.est_ttl_mcare_pay_amt = parseFloat(performance.est_ttl_mcare_pay_amt).toFixed(2)
    performance.est_ttl_submitted_charge_amt = parseFloat(performance.est_ttl_submitted_charge_amt).toFixed(2)
    performance.var_avg_mcare_submitted_charge_pay_amt = parseFloat(performance.var_avg_mcare_submitted_charge_pay_amt).toFixed(2)
    performance.rank_n_of_svcs = parseInt(performance.rank_n_of_svcs, 10)
    performance.rank_n_of_distinct_mcare_beneficiary_per_day_svcs = parseInt(performance.rank_n_of_distinct_mcare_beneficiary_per_day_svcs, 10)
    performance.rank_n_of_mcare_beneficiaries = parseInt(performance.rank_n_of_mcare_beneficiaries, 10)
    performance.rank_avg_mcare_standardized_amt = parseInt(performance.rank_avg_mcare_standardized_amt, 10)
    performance.rank_avg_mcare_allowed_amt = parseInt(performance.rank_avg_mcare_allowed_amt, 10)
    performance.rank_avg_submitted_charge_amt = parseInt(performance.rank_avg_submitted_charge_amt, 10)
    performance.rank_avg_mcare_pay_amt = parseInt(performance.rank_avg_mcare_pay_amt, 10)
    performance.rank_est_ttl_mcare_pay_amt = parseInt(performance.rank_est_ttl_mcare_pay_amt, 10)
    performance.rank_est_ttl_submitted_charge_amt = parseInt(performance.rank_est_ttl_submitted_charge_amt, 10)
    performance.rank_var_avg_mcare_submitted_charge_pay_amt = parseInt(performance.rank_var_avg_mcare_submitted_charge_pay_amt, 10)
    return performance
}

const docBuilder = (provider) => {
    return {
        npi: provider.npi,
        entity_type: provider.entity_type,
        location: {
            lat: provider.address_latitude,
            lon: provider.address_longitude,
        }
    }
}

module.exports = {
    perfTypeCaster, performanceFields, docBuilder
}

