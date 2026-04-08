const cds = require("@sap/cds");
const cloudinary = require("./utils/cloudinary");

module.exports = class AdminService extends cds.ApplicationService {
  async init() {
    const { Authors, Books } = this.entities;

    return super.init();
  }
};