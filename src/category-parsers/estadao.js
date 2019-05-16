const fs = require('fs')
const filePath = '/Users/pedro.nakibar/Workspace-Pedro/most-readed-wizard/results-final/www-estadao-com-br-.json'
const file = require(filePath)

const removeArchive = url => {
  const regex = /https?.*(https?.*)/g
  return regex.exec(url)[1]
}
const getTheme = url => {
  const x = url.replace('http://', '').replace('https://', '')
  const subsite = x.split('.')[0]
  const route = x.split('/')[1]
  const subcategory = x.split('/')[2].split(',')[0]
  return `${subsite}-${route}-${subcategory}`
}

let skipped = []
const removeUrl = url  => {
  const r = url.replace('http://', '').replace('https://', '').split('/')
  if (!r[1] || !r[2]) {
    skipped.push(r)
  }
  return {
    theme: getTheme(url),
    headline: r[2]
  }
}


const j = file.map(x => ({
  ...x,
  mostReaded: x.mostReaded.map(
    y => ({ ...y, ...removeUrl(removeArchive(y.href)) })
  ),
}))


fs.writeFileSync(filePath, JSON.stringify(j, null, 2))


