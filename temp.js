const got = require('got')
const { parse } = require('node-html-parser')

const getTitle = dom => {
  return dom.getElementsByTagName('h1')[0].textContent || 'Custom recipe'
}

// got("https://www.merceriabotton.es/blog/costura-para-novatos-como-empezar-a-aprender/").then(result => {
// got("https://recetasrealfooding.com/pastas/pasta-de-espelta-marinera/").then(result => {
// got("https://www.simplyrecipes.com/raspberry-chess-pie-bars-5225099").then(result => {
got('https://www.bbc.co.uk/food/recipes/cheesy_bean_and_lentil_71817')
  .then(result => {
    // got("https://www.javirecetas.com/tarta-de-calabaza/").then(result => {
    // got("https://www.recetasgratis.net/receta-de-canastas-de-choclo-75949.html").then(result => {
    const linkElement = parse(result.body)

    console.log('Receta: ', getTitle(linkElement))

    const allNodes = linkElement.getElementsByTagName('*')

    const titleIndex = allNodes.findIndex(element => element.tagName === 'H1')
    console.log('Receta -- 2 : ', allNodes[titleIndex].textContent)

    const tupi = allNodes
      .slice(titleIndex + 1)
      .filter((element, index) => {
        const isElementAList =
          element.tagName === 'UL' || element.tagName === 'OL'
        return isElementAList
      })
      .map(list => {
        const controller = list
          .getElementsByTagName('li')
          .map(element =>
            element.textContent.replace(/[-\\\n\t^$*+?.()|[\]{}]/g, '')
          )
        return controller.length ? controller : false
      })

    console.log('Listas: ', tupi || [])
  })
  .catch(err => {
    console.log(err)
  })
