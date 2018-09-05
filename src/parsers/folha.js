const cheerio = require('cheerio')
const fs = require('fs')
const files = fs.readdirSync('./src/htmls/www1-folha-uol-com-br-maispopulares-/')

const treated = files.map(filename => {
  const file = fs
    .readFileSync(
      `/Users/pn/Workspace/tcc/src/htmls/www1-folha-uol-com-br-maispopulares-/${filename}`
    )
    .toString()
  const $ = cheerio.load(file)
  const mostReaded = $('section.most_popular > ol > li > a')
    .map(function () {
      const el = $(this)
      return { href: el[0].attribs.href, title: el.text().trim() }
    }).get()

  return {
    filename,
    mostReaded
  }
})

fs.writeFileSync(
  '/Users/pn/Workspace/tcc/www1-folha-uol-com-br-maispopulares-.json',
  JSON.stringify(treated, null, 2)
)