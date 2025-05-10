import multer from 'multer';
import path from 'path';
import fs from 'fs';

const dir = '/uploads/avatars';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// config multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve("src", "uploads", "avatars");

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, uniqueName);
  }
});

// filter file (jpg, png, jpeg)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Hanya file gambar (jpeg, jpg, png) yang diperbolehkan!'));
  }
};

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter });

export default upload;