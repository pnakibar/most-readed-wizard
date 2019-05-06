/**
 * Parser for the veja.abril.com.br files
 */

const cheerio = require("cheerio");
const fs = require("fs");
const scrapperResults =
  "/Users/pedro.nakibar/Workspace-Pedro/most-readed-wizard/scrapper-results/veja-abril-com-br-/";
const files = fs.readdirSync(scrapperResults);

const treated = files.map(filename => {
  const file = fs.readFileSync(`${scrapperResults}${filename}`).toString();
  const $ = cheerio.load(file);

  let topNews = [];
  if (filename >= "20170225194337.html") {
    topNews = $("span.widget-popular-posts-item-title a")
      .toArray()
      .map(x => ({ ...x.attribs, title: x.children[0].data }));
  } else {
    topNews = $(
      "#abril_popular_posts_widget-3 > div > div > div > div > div > span > a"
    )
      .toArray()
      .map(x => ({
        ...x.attribs,
        title: x.children[0].data
      }));
  }

  return {
    filename,
    topNews
  };
});

fs.writeFileSync('/Users/pedro.nakibar/Workspace-Pedro/most-readed-wizard/veja-abril-com-br-.json', JSON.stringify(treated, null, 2))
