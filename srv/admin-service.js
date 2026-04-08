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
        folder: "books",
        resource_type: "image",
        allowed_formats: ["png", "jpg", "webp"]
      });

      await cds.run(
        UPDATE(Books)
        .set({ imageUrl: result.secure_url, imageID: result.public_id })
        .where({ ID: bookId })
      )

      return { url: result.secure_url }
    });

      this.on("uploadBookImage", async (req) => {
    const { file, bookId } = req.data;

    if (!file || !bookId) {
      return req.error(400, "Missing book ID or file");
    }

    if (
      typeof file !== "string" ||
      !/^data:image\/(png|jpeg|jpg);base64,/.test(file)
    ) {
      return req.error(400, "Only PNG, JPG, and JPEG images are allowed");
    }

    const book = await SELECT.one.from(Books).where({ ID: bookId });

    if (!book) {
      return req.error(404, "Book not found");
    }

    if (book.imageID) {
      await cloudinary.uploader.destroy(book.imageID);
    }

    const result = await cloudinary.uploader.upload(file, {
      folder: "books",
      resource_type: "image",
      allowed_formats: ["jpg", "jpeg", "png"],
    });

    await UPDATE(Books)
      .set({
        imageUrl: result.secure_url,
        imageID: result.public_id,
      })
      .where({ ID: bookId });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  });

  // Delete book image
  this.on("deleteBookImage", async (req) => {
    const { bookId } = req.data;

    if (!bookId) {
      return req.error(400, "Missing book ID");
    }

    const book = await SELECT.one.from(Books).where({ ID: bookId });

    if (!book) {
      return req.error(404, "Book not found");
    }

    if (book.imageID) {
      await cloudinary.uploader.destroy(book.imageID);
    }

    await UPDATE(Books)
      .set({
        imageUrl: null,
        imageID: null,
      })
      .where({ ID: bookId });

    return { success: true };
  });
    return super.init();
  }
};
