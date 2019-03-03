const js = require('./g1-globo-com-politica.json')
const moment = require('moment')
const csv = require('csv-stringify/lib/sync')
const fs = require('fs')

const g1GloboPoliticaParsed = js.map(j => {
  const date = j.filename.replace('.html', '')
  const topNews = j.topNews.map(({ href, title }, i) => ({ 
    [`${i + 1} - Título`]: title,
    [`${i + 1} - URL`]: href
  }))

  const a = topNews.reduce((a, acc) => ({ ...a, ...acc }), {})

  return {
    date: moment(date, 'YYYYMMDDHHmmSS'),
    ...a
  }
})

fs.writeFileSync('./g1-globo-com-politica.csv', csv(g1GloboPoliticaParsed, { header: true }))
