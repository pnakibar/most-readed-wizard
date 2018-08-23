/**
 * Parser for the veja.abril.com.br files
 */

const cheerio = require('cheerio')
const fs = require('fs')
const files = fs.readdirSync('./src/htmls/veja-abril-com-br-/')

const treated = files.map(filename => {
    const file = fs
        .readFileSync(
            `/Users/pn/Workspace/tcc/src/htmls/veja-abril-com-br-/${filename}`
        )
        .toString()
    const $ = cheerio.load(file)
    const topNews = $(
        '#abril_popular_posts_widget-3 > div > div > div > div > div > span > a'
    )
        .toArray()
        .map(x => ({
            ...x.attribs,
            title: x.children[0].data
        }))

    return {
        filename,
        topNews
    }
})

fs.writeFileSync('/Users/pn/Workspace/tcc/veja-abril-com-br-.json', JSON.stringify(treated))
