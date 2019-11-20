const fs = require('fs')
const veja = '/Users/pedro.nakibar/Workspace/most-readed-wizard/results-final/veja-abril-com-br-.json'
const fileRead = veja
const file = require(fileRead)
console.log(file)

function removeArchive(url) {
  const regex = /https?.*(https?.*)/g
  return regex.exec(url)[1]
}

const removeUrl = url  => {
  const r = url.replace('http://', '').replace('https://', '').split('/').filter(x => x)

  return {
    theme: r.slice(1, -1).join('/'), // everything between the first and the last one
    headline: r.slice(-1)[0] // last one
  }
}

const j = file.map(x => ({
  ...x,
  mostReaded: x.mostReaded.map(
    y => ({ ...y, ...removeUrl(removeArchive(y.href)) })
  ),
}))


fs.writeFileSync(fileRead, JSON.stringify(j, null, 2))


