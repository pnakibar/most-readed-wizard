const cheerio = require("cheerio");
const fs = require("fs");
const scrapperResults = "/Users/pedro.nakibar/Workspace-Pedro/most-readed-wizard/scrapper-results/www-estadao-com-br-/"
const files = fs.readdirSync(scrapperResults);


const treated = files.map(filename => {
  const file = fs
    .readFileSync(
      `${scrapperResults}${filename}`
    )
    .toString();
  const $ = cheerio.load(file);
  const mostReaded = $("a.link-title")
    .toArray()
    .map(x => ({
      href: x.attribs.href,
      text: x.children[1].children[0].data.trim()
    }));

  return {
    filename,
    mostReaded
  };
});

fs.writeFileSync(
  "/Users/pedro.nakibar/Workspace-Pedro/most-readed-wizard/www-estadao-com-br-.json",
  JSON.stringify(treated, null, 2)
);
