const js = require('./www1-folha-uol-com-br-maispopulares-.json')
const moment = require('moment')
const csv = require('csv-stringify/lib/sync')
const fs = require('fs')

const vejaParsed = js.map(j => {
  const date = j.filename.replace('.html', '')
  const topNews = j.mostReaded.map(({ href, title }, i) => ({ 
    [`${i + 1} - Título`]: title.trim(),
    [`${i + 1} - URL`]: href
  }))

  const a = topNews.reduce((a, acc) => ({ ...a, ...acc }), {})

  return {
    date: moment(date, 'YYYYMMDDHHmmSS'),
    ...a
  }
})

fs.writeFileSync('./www1-folha-uol-com-br-maispopulares-.csv', csv(vejaParsed, { header: true }))
