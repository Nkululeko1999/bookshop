const cds = require('@sap/cds')

module.exports = class CatalogService extends cds.ApplicationService { init() {

  const { Books, Genres } = cds.entities('CatalogService')

  return super.init()
}}
