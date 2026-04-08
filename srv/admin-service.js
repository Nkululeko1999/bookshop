const cds = require("@sap/cds");
const cloudinary = require("./utils/cloudinary");

module.exports = class AdminService extends cds.ApplicationService {
  init() {
    const { Authors, Books, Genres } = cds.entities("AdminService");

    // Upload book image
    this.on("uploadBookImage", async (req) => {
      const { file, bookId } = req.data;

      if (!file || !bookId) {
        return req.error("Missing book ID or file");
      }

      const book = await SELECT.from('Books').where({ ID: bookId });

      if (book.imageID) {
        await cloudinary.uploader.destroy(book.imageID);
      }

      const result = await cloudinary.uploader.upload(file, {
        folder: "books"
      });

      await cds.run(
        UPDATE(Books)
        .set({ imageUrl: result.secure_url, imageID: result.public_id })
        .where({ ID: bookId })
      )

      return { url: result.secure_url }
    });

    this.before(["CREATE", "UPDATE"], Authors, async (req) => {
      console.log("Before CREATE/UPDATE Authors", req.data);
    });

    this.after("READ", "Authors", (authors) => {
      console.log("AFTER READ Authors", authors);
      
    });

    this.before(["CREATE", "UPDATE"], Books, async (req) => {
      console.log("Before CREATE/UPDATE Books", req.data);
    });
    this.after("READ", Books, async (books, req) => {
      console.log("After READ Books", books);
    });
    this.before(["CREATE", "UPDATE"], Genres, async (req) => {
      console.log("Before CREATE/UPDATE Genres", req.data);
    });
    this.after("READ", Genres, async (genres, req) => {
      console.log("After READ Genres", genres);
    });

    return super.init();
  }
};
