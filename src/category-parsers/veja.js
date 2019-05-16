const fs = require('fs')
// const veja = '/Users/pedro.nakibar/Workspace-Pedro/most-readed-wizard/results-final/veja-abril-com-br-.json'
const globo = '/Users/pedro.nakibar/Workspace-Pedro/most-readed-wizard/results-final/globo.json'
const fileRead = globo
const file = require(fileRead)
console.log(file)

const removeArchive = url => {
  const regex = /https?.*(https?.*)/g
  return regex.exec(url)[1]
}
let skipped = []
const removeUrl = url  => {
  const r = url.replace('http://', '').replace('https://', '').split('/')
  if (!r[1] || !r[2]) {
    // console.log(r, r[1], r[2])
    skipped.push(r)
  }
  return {
    theme: r[1],
    headline: r[2]
  }
}

const j = file.map(x => ({
  ...x,
  topNews: x.topNews.map(
    y => ({ ...y, ...removeUrl(removeArchive(y.href)) })
  ),
}))


fs.writeFileSync(fileRead, JSON.stringify(j, null, 2))


