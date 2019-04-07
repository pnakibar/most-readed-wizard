import { scrapper } from "./scrapper";
import BPromise from 'bluebird'

const YEAR = 2017;
const URL = process.argv[2];

const scrapperWrapepr = async url => {
  await scrapper(url, 2017)
  await scrapper(url, 2018)
}


const urls = [
  // 'http://g1.globo.com/', // na sessão mais lidas // feito
  // 'https://www.globo.com/', // na sessão top globo // feito
  // 'https://veja.abril.com.br/', // feito
  // 'https://www.uol.com.br/',
  'https://www.folha.uol.com.br/',
  'https://www.estadao.com.br/',

]

BPromise.each(urls, scrapperWrapepr)
  .then(() => console.log('ended'))
  .then(() => process.exit())
  .catch((e) => console.log(e))
  .then(() => process.exit(1));




