import axios from 'axios'
import { promises as fs } from 'fs'
import mkdirp from 'mkdirp'
import moment from 'moment'
import * as R from 'ramda'
import BPromise from 'bluebird'

const rangeOfDate = (initial, final) =>
  R.until(
    (arr) => R.last(arr).isSameOrAfter(final, 'day'),
    (d) =>
      R.append(
        R.last(d)
          .clone()
          .add(1, 'day'),
        d,
      ),
    [initial.clone()],
  )

const getFromWayback = (url, date) =>
  axios.get(
    `https://archive.org/wayback/available?url=${url}&timestamp=${date}`,
    { headers: { Accept: 'Application/json' } },
  )

const getPastHtml = (url) => axios.get(url)

const saveTo = (url, filename, data) => {
  const formattedUrl = url
    .replace(/https:\/\/|http:\/\//, '')
    .replace(/\/|\./g, '-')
  const filepath = `/Users/pedro.nakibar/Workspace-Pedro/most-readed-wizard/scrapper-results/${formattedUrl}`
  mkdirp.sync(filepath)
  fs.writeFile(`${filepath}/${filename}.html`, data)
}

export async function scrapper(url: string, yearToExtract: number) {
  const startDate = moment()
    .year(yearToExtract)
    .startOf('year')
  const endDate = moment()
    .clone()
    .month('october')
    .endOf('month')
  const formattedDateRange = rangeOfDate(startDate, endDate).map((x) =>
    x.format('YYYYMMDD000000'),
  )
  return BPromise.each(formattedDateRange, async (date) => {
    try {
      const apiResponse = await getFromWayback(url, date)
      const {
        url: waybackURL,
        timestamp,
      } = apiResponse.data.archived_snapshots.closest

      console.log(`timestamp: ${timestamp} waybackurl: ${waybackURL}`)

      const { data: pastHtml } = await getPastHtml(waybackURL)
      return saveTo(url, timestamp, pastHtml)
    } catch (e) {
      console.log(`error: timestamp: ${date}`)
      console.log(e)
    }
  })
}
