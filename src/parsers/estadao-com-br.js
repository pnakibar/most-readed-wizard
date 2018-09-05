const cheerio = require('cheerio')
const fs = require('fs')
const files = fs.readdirSync('./src/htmls/www-estadao-com-br-mais-lidas/')

const treated = files.map(filename => {
    const file = fs
        .readFileSync(`/Users/pn/Workspace/tcc/src/htmls/www-estadao-com-br-mais-lidas/${filename}`)
        .toString()
    const $ = cheerio.load(file)
    const mostReaded = $('a.link-title')
        .toArray()
        .map(x => ({ href: x.attribs.href, text: x.children[1].children[0].data.trim() }))

    return {
        filename,
        mostReaded,
    }
})



fs.writeFileSync('/Users/pn/Workspace/tcc/www-estadao-com-br-mais-lidas.json', JSON.stringify(treated, null, 2))