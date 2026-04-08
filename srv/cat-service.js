const cds = require('@sap/cds')

module.exports = class CatalogService extends cds.ApplicationService { init() {

  const { Books, Genres } = cds.entities('CatalogService')

  this.before (['CREATE', 'UPDATE'], Books, async (req) => {
    console.log('Before CREATE/UPDATE Books', req.data)
  })

  this.after ('READ', Books, async (books, req) => {
    console.log('After READ Books', books)
  })
  
  this.before (['CREATE', 'UPDATE'], Genres, async (req) => {
    console.log('Before CREATE/UPDATE Genres', req.data)
  })
  this.after ('READ', Genres, async (genres, req) => {
    console.log('After READ Genres', genres)
  })


  return super.init()
}}
