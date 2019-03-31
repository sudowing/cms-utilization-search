const individualMapper = (provider) => {
    const record = {
        ...provider,
        suggest: [
            {
                input: `${provider.name_last}, ${provider.name_first}`,
                weight: 10,
            },
            {
                input: `${provider.name_last} ${provider.name_first}`,
                weight: 9,
            },
            {
                input: `${provider.name_first} ${provider.name_last}`,
                weight: 8,
            },
            {
                input: provider.name_last,
                weight: 5,
            },
            {
                input: provider.name_first,
                weight: 1,
            },

        ]
    }
    return record

    console.log('record')
    console.log(record)
}

const organizationMapper = (provider) => {
    const record = {
        ...provider,
        suggest: [provider.name]
    }
    return record

    console.log('record')
    console.log(record)

}

module.exports = {
    individualMapper, organizationMapper
}