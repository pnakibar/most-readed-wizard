const cheerio = require('cheerio')
const fs = require('fs')
const files = fs.readdirSync('./src/htmls/www-uol-com-br-/')

const treated = files.map(filename => {
  const file = fs
    .readFileSync(
      `/Users/pn/Workspace/tcc/src/htmls/www-uol-com-br-/${filename}`
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

fs.writeFileSync('/Users/pn/Workspace/tcc/www-uol-com-br-.json', JSON.stringify(treated, null, 2))
