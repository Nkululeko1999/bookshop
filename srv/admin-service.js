const cds = require("@sap/cds");
const cloudinary = require("./utils/cloudinary");

module.exports = class AdminService extends cds.ApplicationService {
  async init() {
    const { Authors, Books } = this.entities;

    this.before("CREATE", "Orders", (req) => {
  const items = req.data.items || [];

  req.data.total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
});

    return super.init();
  }
};