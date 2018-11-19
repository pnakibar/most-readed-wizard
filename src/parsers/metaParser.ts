import cheerio from "cheerio";
import fs from "fs";

export function readFromDir(dir: string) {
  return fs.readdirSync(dir);
}

export function treatFiles(dir, forEachFile, )
