const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/assets/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid Image File!"), false);
    }
  },
});

module.exports = upload;
