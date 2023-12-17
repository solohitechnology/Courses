const path = require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const User = require('../model/User');
const Book = require('../model/bookSchema');
const Subscriber = require('../model/subscription')
const nodemailer = require('nodemailer');

const multer = require('multer');

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

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'server71.web-hosting.com',
  port: 465,
  secure: true,
  auth: {
    user: 'help@ogendu.org',
    pass: 'chinedu001#@',
  },
});

router.post('/upload-book', upload.fields([{ name: 'picture' }, { name: 'pdf' }]), async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const { picture, pdf } = req.files;
    // console.log(req.files);

    // Check if files exist
    if (!picture || !pdf) {
      return res.status(400).json({ success: false, error: 'Picture and PDF files are required' });
    }

    // Create a new Book instance
    const book = new Book({
      name,
      price,
      description,
      coverPhoto: picture[0].filename, // Save the filename with its original extension
      pdfFile: pdf[0].filename, // Save the filename with its original extension
    });

    // Save the book to MongoDB
    await book.save();

    // Send emails to users
    const users = await User.find({}).exec();
    const subscribers = await Subscriber.find({}).exec();

    const allRecipients = [...users, ...subscribers]; // Combine users and subscribers

    if (allRecipients.length > 0) {
      const emailRecipients = allRecipients.map((recipient) => recipient.email);

      emailRecipients.forEach((email) => {
        const mailOptions = {
          from: 'help@ogendu.org',
          to: email,
          subject: 'NEW BOOK ON ' + name,
          text: 'New book for research purposes. Visit https://ogenduresearch.org/books and search for this book by name.',
          attachments: [
            {
              filename: picture[0].originalname,
              path: picture[0].path, // Attach the file from its path
            }
          ],
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log('Error sending mail to users:', error);
          } else {
            console.log('Email sent to users successfully:', info.response);
          }
        });
      });
    }

    res.json({ success: true, message: 'File uploaded successfully' });
  } catch (error) {
    console.log('Error uploading file:', error);
    res.status(500).json({ success: false, error: 'Failed to upload file' });
  }
});








// router.post('/upload-book', async (req, res) => {
//   try {
//     const { name, price, description } = req.body;
//     const picture = req.files['picture'];
//     const pdf = req.files['pdf'];
//     console.log(pdf, picture);

//     const picturePath = picture.tempFilePath;
//     const pdfPath = pdf.tempFilePath;

//     // Upload the picture to Cloudinary
//     const pictureUploadResult = await cloudinary.uploader.upload(picturePath);

//     // Upload the pdf to Cloudinary
//     const pdfUploadResult = await cloudinary.uploader.upload(pdfPath);

//     const pictureUrl = pictureUploadResult.secure_url;
//     const pdfUrl = pdfUploadResult.secure_url;

//     // Send emails to users
//     const users = await User.find({}).exec();

//     if (users) {
//       const emailUsers = users.map((user) => user.email);

//       emailUsers.forEach((email) => {
//         const mailOptions = {
//           from: 'help@ogendu.org',
//           to: email,
//           subject: 'NEW BOOK ON ' + name,
//           text: 'New book for research purposes. Visit https://ogenduresearch.org/books and search for this book by name.',
//           attachments: [
//             {
//               filename: picture.name,
//               path: pictureUrl,
//             },
//             {
//               filename: pdf.name,
//               path: pdfUrl,
//             },
//           ],
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//           if (error) {
//             console.log('Error sending mail to users: ' + error);
//           } else {
//             console.log('Email sent to users successfully: ' + info.response);
//           }
//         });
//       });
//     }

//     res.json({ success: true, pictureUrl, pdfUrl, message: 'File uploaded successfully' });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, error: 'Failed to upload file' });
//   }
// });








//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//get all file


// const soloresult = ['niger', 'abuja', 'lagos', 'calabar']

router.get('/book1', async (req, res) => {
  try {
    const files = await Book.find();
    console.log('solohitechnology book')
     console.log(files)
    res.status(200).json({ success: true, files });
    // res.send(soloresult)
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Failed to get files' });
  }
});



// router.get('/book1', async (req, res) => {

//   try {
//     const books = await Book.find();
//     console.log(books)

//     // Convert the picture to base64 and include it in the response
//     const booksWithPictureBase64 = books.map((book) => {
//       const picturePath = path.join('uploads', book.coverPhoto);
//       const pictureBase64 = fs.readFileSync(picturePath, 'base64');
//       return { ...book._doc, coverPhotoBase64: pictureBase64 };
//     });


//     res.status(200).json({ success: true, books: booksWithPictureBase64 });
//   } catch (error) {
//     // ...
//   }
// });




// router.post('/solohitech/:ID', async (req, res) => {
//   try {

//     await File.count(req.params);


//   } catch (e) {
//     console.log(e)
//   }

// })

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/files/:ID', async (req, res) => {
  try {
    const singleFile = await File.findById(req.params.id);
    !singleFile && res.status(401).json('no file with this id exist ');
    res.status(200).json(singleFile)
  } catch (e) {
    console.log(e)
  }

});


//DOWNLOAD THE FILE....
router.get('/download/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ success: false, error: 'File not found' });
    }

    const filePath = path.join(__dirname, file.pdf.path);
    const fileStream = fs.createReadStream(filePath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${file.pdf.filename}`);
    fileStream.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'Failed to download file' });
  }
});



module.exports = router;