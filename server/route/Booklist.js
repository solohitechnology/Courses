const express = require("express");
const router = express.Router();
const Booklist = require("../model/Booklist");
const multer = require('multer');
const path = require('path');
const fs = require('fs')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Change the destination folder as needed
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const filename = `${file.fieldname}-${Date.now()}${extension}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

router.get("/allbook", async (req, res) => {
  try {
    const books = await Booklist.find();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/upload", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), async (req, res) => {
  console.log('newbook for free');
  try {
    const { title, author, description } = req.body;

    if (!title || !author || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const imageUrl = req.files['image'] ? req.files['image'][0].path : null;
    const pdfUrl = req.files['pdf'] ? req.files['pdf'][0].path : null;

    const newBook = new Booklist({
      title,
      author,
      description,
      imageUrl,
      pdfUrl,
    });

    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (error) {
    console.error("Error creating a new book:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/download/:pdfFileName", async (req, res) => {
  try {
    const file = await Booklist.findOne({ pdfUrl: req.params.pdfFileName });

    if (!file) {
      return res.status(404).json({ success: false, error: 'File not found' });
    }

    // Set a constant part of the filename
    const constantPart = 'Ogendu_Academy_freeEbooks_';

    // Use the file title as the dynamic part of the filename
    const dynamicPart = file.title.replace(/\s/g, '_'); // Replace spaces with underscores

    const filePath = path.join(__dirname, '..', file.pdfUrl);
    const fileStream = fs.createReadStream(filePath);

    res.setHeader('Content-Type', 'application/pdf');

    // Concatenate the constant and dynamic parts in the filename
    const fullFilename = `${constantPart}${dynamicPart}.pdf`;

    // Set the Content-Disposition header with the full filename
    res.setHeader('Content-Disposition', `attachment; filename=${fullFilename}`);
    
    fileStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to download file' });
  }
});





module.exports = router;
