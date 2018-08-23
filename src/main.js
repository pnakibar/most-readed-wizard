const R = require('ramda')
const axios = require('axios')
const moment = require('moment')
const fs = require('fs').promises
const Promise = require('bluebird')
var mkdirp = require('mkdirp')

const YEAR = 2017
const URL = process.argv[2]

const rangeOfDate = (initial, final) =>
    R.until(
        arr => R.last(arr).isSameOrAfter(final, 'day'),
        d =>
            R.append(
                R.last(d)
                    .clone()
                    .add(1, 'day'),
                d
            ),
        [initial.clone()]
    )

const getFromWayback = (url, date) =>
    axios.get(
        `https://archive.org/wayback/available?url=${url}&timestamp=${date}`,
        { headers: { Accept: 'Application/json' } }
    )

const getPastHtml = url => axios.get(url)

const saveTo = (url, filename, data) => {
    const formattedUrl = url.replace(/https:\/\/|http:\/\//, '').replace(/\/|\./g, '-')
    const filepath = 
        `/Users/pn/Workspace/tcc/src/htmls/${formattedUrl}`
    mkdirp.sync(filepath)
    fs.writeFile(
        `${filepath}/${filename}.html`,
        data
    )
}

async function main() {
    const url = URL
    const startDate = moment()
        .year(YEAR)
        .startOf('year')
    const endDate = startDate.clone().endOf('year')
    const formattedDateRange = rangeOfDate(startDate, endDate).map(x =>
        x.format('YYYYMMDD000000')
    )
    return Promise.each(formattedDateRange, async date => {
        try {
            const apiResponse = await getFromWayback(url, date)
            const {
                url: waybackURL,
                timestamp
            } = apiResponse.data.archived_snapshots.closest

            console.log(`timestamp: ${timestamp} waybackurl: ${waybackURL}`)

            const { data: pastHtml } = await getPastHtml(waybackURL)
            return saveTo(url, timestamp, pastHtml)
        } catch (e) {
            console.log(
                `error: timestamp: ${date}`
            )
            console.log(e)
        }
    })
}

main()
    .then(() => console.log('endend!'))
    .then(() => process.exit())
    .catch(e => console.log(e) && process.exit(1))
