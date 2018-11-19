import { scrapper } from "./scrapper";

const YEAR = 2017;
const URL = process.argv[2];

scrapper(URL, YEAR)
  .then(() => console.log("endend!"))
  .then(() => process.exit())
  .catch((e) => console.log(e) && process.exit(1));
