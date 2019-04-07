const cheerio = require('cheerio')
const fs = require('fs')
const scrapperResults = '/Users/pedro.nakibar/Workspace-Pedro/most-readed-wizard/scrapper-results/www-globo-com-/'
const files = fs.readdirSync(scrapperResults)

const treated = files.map(filename => {
    const file = fs
        .readFileSync(`${scrapperResults}${filename}`)
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



fs.writeFileSync('/Users/pedro.nakibar/Workspace-Pedro/most-readed-wizard/globo.json', JSON.stringify(treated))