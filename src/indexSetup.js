const net = require('./network-resources')
const es = net.elasticsearch

const settings = {
    index : {
        refresh_interval : "1m"
    }
}
const mappings = {
    record: {
        properties: {
            entity_type: {
                type: "text",
                fields: {
                    keyword: {
                        type: "keyword",
                        ignore_above: 256
                    }
                }
            },
            location: {
                type: "geo_point"
            },
            npi: {
                type: "long"
            },
            performances: {
                properties: {
                    avg_mcare_allowed_amt: {
                        type: "float",
                    },
                    avg_mcare_pay_amt: {
                        type: "float",
                    },
                    avg_mcare_standardized_amt: {
                        type: "float",
                    },
                    avg_submitted_charge_amt: {
                        type: "float",
                    },
                    est_ttl_mcare_pay_amt: {
                        type: "float",
                    },
                    est_ttl_submitted_charge_amt: {
                        type: "float",
                    },
                    hcpcs_code: {
                        type: "text",
                        fields: {
                            keyword: {
                                type: "keyword",
                                ignore_above: 256
                            }
                        }
                    },
                    mcare_participation_indicator: {
                        type: "boolean",
                    },
                    n_of_distinct_mcare_beneficiary_per_day_svcs: {
                        type: "long"
                    },
                    n_of_mcare_beneficiaries: {
                        type: "long"
                    },
                    n_of_svcs: {
                        type: "float",
                    },
                    npi: {
                        type: "long"
                    },
                    place_of_service: {
                        type: "text",
                        fields: {
                            keyword: {
                                type: "keyword",
                                ignore_above: 256
                            }
                        }
                    },
                    rank_avg_mcare_allowed_amt: {
                        type: "long"
                    },
                    rank_avg_mcare_pay_amt: {
                        type: "long"
                    },
                    rank_avg_mcare_standardized_amt: {
                        type: "long"
                    },
                    rank_avg_submitted_charge_amt: {
                        type: "long"
                    },
                    rank_est_ttl_mcare_pay_amt: {
                        type: "long"
                    },
                    rank_est_ttl_submitted_charge_amt: {
                        type: "long"
                    },
                    rank_n_of_distinct_mcare_beneficiary_per_day_svcs: {
                        type: "long"
                    },
                    rank_n_of_mcare_beneficiaries: {
                        type: "long"
                    },
                    rank_n_of_svcs: {
                        type: "long"
                    },
                    rank_var_avg_mcare_submitted_charge_pay_amt: {
                        type: "long"
                    },
                    var_avg_mcare_submitted_charge_pay_amt: {
                        type: "float",
                    }
                }
            }
        }
    }
}

es.indices.delete({
    index: "provider-performance"
}).then(data => {
    console.log(data)
}).catch(e => {
    console.log(e)
})


es.indices.create({
    index: "provider-performance", body: { settings, mappings }
}).then(data => {
    console.log(data)
}).catch(e => {
    console.log(e)
})


