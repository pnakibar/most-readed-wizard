const fs = require('fs')
const globo = require('/Users/pn/Workspace/tcc/globo.json')
const moment = require('moment')
const csv = require('csv-stringify/lib/sync')

const globoParsed = globo.map(line => {
    const giraffe = line.topNewsJournalism.reduce(
        (acc, a, index) => ({
            ...acc,
            [`${index + 1} - Título`]: a.title.trim(),
            [`${index + 1} - URL`]: a.href
        }),
        {}
    )

    return {
        date: moment(line.filename, 'YYYYMMDDHHmmss'),
        ...giraffe
    }
})

fs.writeFileSync('/Users/pn/Workspace/tcc/globoParsed.csv', csv(globoParsed, { header: true }))