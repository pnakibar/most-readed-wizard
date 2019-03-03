const js = require('./veja-abril-com-br-.json')
const moment = require('moment')
const csv = require('csv-stringify/lib/sync')
const fs = require('fs')

const vejaParsed = js.map(j => {
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

fs.writeFileSync('./veja-abril-com-br-.csv', csv(vejaParsed, { header: true }))
