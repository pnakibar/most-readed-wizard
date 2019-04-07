const cheerio = require('cheerio')
const fs = require('fs')
const scrapperResults = '/Users/pedro.nakibar/Workspace-Pedro/most-readed-wizard/scrapper-results/www-uol-com-br-/'
const files = fs.readdirSync(scrapperResults)

const treated = files.map(filename => {
  const file = fs
    .readFileSync(
      `${scrapperResults}${filename}`
    )
    .toString()
  const $ = cheerio.load(file)

  const mostReaded = $('li.horizontal-chamada > h2 > a')
    .map(function() {
      const el = $(this)
      return { href: el['0'].attribs.href, title: el.text().trim().substr(1).trim() }
    })
    .get()

  return {
    filename,
    mostReaded
  }
})

fs.writeFileSync('/Users/pedro.nakibar/Workspace-Pedro/most-readed-wizardwww-uol-com-br-.json', JSON.stringify(treated, null, 2))
