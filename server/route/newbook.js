const express = require('express');
const Book = require('../model/Book');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route to handle book upload
router.post('/addnewbook', upload.fields([{ name: 'pdf', maxCount: 1 }, { name: 'picture', maxCount: 1 }]), async (req, res) => {
    console.log(req.body)
    console.log(req.files) // Updated this line to log uploaded files

  try {
    const { category, title, author, description, pages, size, date, price } = req.body;

    // Access files from req.files instead of req.body
    const pdf = req.files['pdf'];
    const picture = req.files['picture'];

    // Check if the required files are present
    if (!pdf || !picture || !pdf[0] || !picture[0]) {
      return res.status(400).json({ error: 'PDF and/or picture file not uploaded' });
    }

    const newBook = new Book({
      category,
      title,
      author,
      price,
      description,
      pages,
      size,
      date,
      pdf: pdf[0].filename,
      picture: picture[0].filename, 
    });

    await newBook.save();
    res.status(200).json({ message: 'Book uploaded successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

router.get('/allbooks', async (req, res) => {
  console.log('solohitechnology')
  try {
    const allBooks = await Book.find();
    res.status(200).json(allBooks);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});


// New route to fetch a single PDF file by ID
router.get('/download-pdf/:id', async (req, res) => {
  console.log('downloading pdf')
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const pdfPath = path.join(__dirname, '..', 'uploads', book.pdf);

    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ error: 'PDF file not found' });
    }

    // Increment popularity
    await Book.findByIdAndUpdate(req.params.id, { $inc: { popularity: 1 } });

    // Send the PDF file as a response
    res.download(pdfPath, `${book.title}.pdf`);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});



// In your server-side code

router.get('/top-twenty', async (req, res) => {
  try {
    // Find the top twenty books with the highest prices
    const topTwentyBooks = await Book.find().sort({ price: 'desc' }).limit(20);

    if (topTwentyBooks.length === 0) {
      return res.status(404).json({ error: 'No books found' });
    }

    // Send the top twenty books as a JSON response
    res.status(200).json(topTwentyBooks);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});



router.get('/latest-books', async (req, res) => {
  try {
    // Find the latest uploaded books by sorting them based on the date field in descending order
    const latestBooks = await Book.find().sort({ date: 'desc' }).limit(10); // Adjust the limit as needed

    if (latestBooks.length === 0) {
      return res.status(404).json({ error: 'No books found' });
    }

    // Send the latest books as a JSON response
    res.status(200).json(latestBooks);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});


router.get('/trending', async (req, res) => {
  try {
    // Aggregate pipeline to find the top 5 books with the highest popularity
    const trendingBooks = await Book.aggregate([
      {
        $sort: { popularity: -1 }, // Sort in descending order based on popularity
      },
      {
        $limit: 5, // Limit the result to the top 5 books
      },
    ]);

    // If the operation is successful, send a JSON response with the top 5 books
    res.status(200).json(trendingBooks);
  } catch (error) {
    // If there's an error during the database operation, log the error and send a JSON response with an error message
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// In your server-side code

router.get('/single-book/:id', async (req, res) => {
  // console.log('single book clicked')
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Send the book details as a JSON response
    res.status(200).json(book);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});






module.exports = router;
