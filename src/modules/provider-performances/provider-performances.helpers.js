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

module.exports = {
    perfTypeCaster
}

