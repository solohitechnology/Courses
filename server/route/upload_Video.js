const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const filename = `${file.fieldname}-${Date.now()}${extension}`;
    cb(null, filename);
  },
});

// ...

// Create a multer upload instance
const upload = multer({ storage });

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'solomon',
  api_key: '679538271999788',
  api_secret: 'kbkl-dm1F0e6xPNXMFyZaBvKX0c',
});

router.post('/upload-video', upload.single('video'), async (req, res) => {
  try {
    // Upload video to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.buffer, {
      resource_type: 'video',
      format: 'mp4', // or the desired video format
    });

    console.log(result);
    console.log('Success upload');

    res.json(result);
  } catch (error) {
    console.error('Upload failed:', error);
    res.status(500).json({ error: 'Failed to upload video' });
  }
});

module.exports = router;
