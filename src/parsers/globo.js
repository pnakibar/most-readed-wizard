const cheerio = require('cheerio')
const fs = require('fs')
const files = fs.readdirSync('./src/htmls/globo/')

const treated = files.map(filename => {
    const file = fs
        .readFileSync(`/Users/pn/Workspace/tcc/src/htmls/globo/${filename}`)
        .toString()
    const $ = cheerio.load(file)
    const titles = $('a.topglobocom__content-title')
        .toArray()
        .map(x => x.attribs)
    const topNewsJournalism = titles.slice(0, 5)
    const topNewsSports = titles.slice(5, 10)
    const topNewsEntertainment = titles.slice(10, 15)

    return {
        filename,
        topNewsJournalism,
        topNewsSports,
        topNewsEntertainment
    }
})



fs.writeFileSync('/Users/pn/Workspace/tcc/globo.json', JSON.stringify(treated))