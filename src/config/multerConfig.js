const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/imagenes');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const filename = uniqueSuffix + extension;
    cb(null, filename);
    req.savedFilePath = filename;
  },
});

const fileFilter = (req, file, cb) => {
  if (['image/jpeg', 'image/png', 'image/gif'].includes(file.mimetype)) {
    cb(null, true);
  } else {
    req.fileValidationError =
      'Formato de archivo no soportado. Solo se permiten archivos JPG, PNG, o GIF.';
    cb(null, false, req.fileValidationError);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
