const fs = require("fs");

const files = {
  veja: require("/Users/pedro.nakibar/Workspace-Pedro/most-readed-wizard/results-final/veja-abril-com-br-.json"),
  estadao: require("/Users/pedro.nakibar/Workspace-Pedro/most-readed-wizard/results-final/www-estadao-com-br-.json"),
  uol: require("/Users/pedro.nakibar/Workspace-Pedro/most-readed-wizard/results-final/www-uol-com-br-.json"),
  folha: require("/Users/pedro.nakibar/Workspace-Pedro/most-readed-wizard/results-final/www1-folha-uol-com-br-maispopulares-.json"),
}
const moment = require("moment");
const csv = require("csv-stringify/lib/sync");

const parser = arr =>
  arr.map(line => {
    const giraffe = line.mostReaded.reduce(
      (acc, a, index) => ({
        ...acc,
        [`${index + 1} - Título`]: a.title.trim(),
        [`${index + 1} - URL`]: a.href,
        [`${index + 1} - Tema`]: a.theme
      }),
      {}
    );

    return {
      date: moment(line.filename, "YYYYMMDDHHmmss"),
      ...giraffe
    };
  });


Object.keys(files).map(file => {
  fs.writeFileSync(
    `./${file}.csv`,
    csv(parser(files[file]), { header: true })
  );
})
