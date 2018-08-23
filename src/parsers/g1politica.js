/**
 * Parser for the veja.abril.com.br files
 */

const cheerio = require('cheerio')
const fs = require('fs')
const files = fs.readdirSync('./src/htmls/g1-globo-com-politica/')

const treated = files.map(filename => {
    const file = fs
        .readFileSync(
            `/Users/pn/Workspace/tcc/src/htmls/g1-globo-com-politica/${filename}`
        )
        .toString()
    const $ = cheerio.load(file)


    const topNews = $(
        '.highlight'
    ).map(function () {
        const href = $(this).find('a').toArray()[0].attribs.href
        const title = $(this).find('span').text().trim()
        return {
            href,
            title
        }
    }).get()


    return {
        filename,
        topNews
    }
})

fs.writeFileSync('/Users/pn/Workspace/tcc/g1-globo-com-politica.json', JSON.stringify(treated))
