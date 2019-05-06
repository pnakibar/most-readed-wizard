const cheerio = require('cheerio')
const fs = require('fs')
const dir = '/Users/pedro.nakibar/Workspace-Pedro/most-readed-wizard/scrapper-results/www1-folha-uol-com-br-maispopulares-'
const files = fs.readdirSync(dir)

const treated = files.map(filename => {
  const file = fs
    .readFileSync(
      `${dir}/${filename}`
    )
    .toString()
  const $ = cheerio.load(file)
  
  if (filename >= '20180219063227.html') {
    const mostReaded = Array.from($('#mais-lidas > ol > li > .c-most-popular__content > a')).map(x => ({
      href: x.attribs.href,
      title: x.children[0].data
    }))
    return {
      filename,
      mostReaded
    }
  }

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
  '/Users/pedro.nakibar/Workspace-Pedro/most-readed-wizard/www1-folha-uol-com-br-maispopulares-.json',
  JSON.stringify(treated, null, 2)
)