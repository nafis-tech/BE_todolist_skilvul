const multer = require("multer");

const profileImg = (img) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // folder penyimpanan untuk foto profile SDM
      cb(null, "uploads/profil_sdm");
    },
    filename: (req, file, cb) => {
      // rename file upload dengan menambahkan date sebagai nama pertama
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
    },
  });
  // memfilter jenis file yang masuk
  const fileFilter = (req, file, cb) => {
    // cek file ada atau tidak
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  // set max size image file
  const maxSize = 10 * 1024 * 1024;

  // call multer for upload single file
  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize,
    },
  }).single(img);

  return upload;
};

module.exports = {
  profileImg,
};
