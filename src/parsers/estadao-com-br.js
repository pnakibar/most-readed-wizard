const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

const fs = require("fs");
const BPromise = require("bluebird");
const scrapperResults =
  "/Users/pedro.nakibar/Workspace-Pedro/most-readed-wizard/scrapper-results/www-estadao-com-br-mais-lidas/";
const files = fs.readdirSync(scrapperResults);

const parseWithPupetteer = async (file, browser) => {
  const page = await browser.newPage();
  await page.setContent(file);
  return await page.evaluate(
    `Array.from(document.getElementsByClassName('link-title')).map(x => ({ href: x.href, text: x.text}))`
  );
};

(async () => {
  const browser = await puppeteer.launch()

  const treatingFunction = async (filename) => {
    const file = fs.readFileSync(`${scrapperResults}${filename}`).toString();

    if (filename >= "20181106033439.html") {
      const mostReaded = await parseWithPupetteer(file, browser);
      console.log({ filename, mostReaded });
      return {
        filename,
        mostReaded
      };
    }

    const $ = cheerio.load(file);
    const mostReaded = $("a.link-title")
      .toArray()
      .map(x => ({
        href: x.attribs.href,
        text: x.children[1].children[0].data.trim()
      }));

    console.log({ filename, mostReaded });
    return {
      filename,
      mostReaded
    };
  };

  const result = await BPromise.mapSeries(files, treatingFunction);

  console.log(result)
  fs.writeFileSync(
    "/Users/pedro.nakibar/Workspace-Pedro/most-readed-wizard/www-estadao-com-br-.json",
    JSON.stringify(result, null, 2)
  );
  return true;
})()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
