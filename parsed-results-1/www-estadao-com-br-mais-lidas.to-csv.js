const js = require('./www-estadao-com-br-mais-lidas.json')
const moment = require('moment')
const csv = require('csv-stringify/lib/sync')
const fs = require('fs')

const vejaParsed = js.map(j => {
  const date = j.filename.replace('.html', '')
  const topNews = j.mostReaded.map(({ href, text }, i) => ({ 
    [`${i + 1} - Título`]: text,
    [`${i + 1} - URL`]: href
  }))

  const a = topNews.reduce((a, acc) => ({ ...a, ...acc }), {})

  return {
    date: moment(date, 'YYYYMMDDHHmmSS'),
    ...a
  }
})

fs.writeFileSync('./www-estadao-com-br-mais-lidas.csv', csv(vejaParsed, { header: true }))
