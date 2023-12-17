const path = require('path');
const mime = require('mime');
const multer = require('multer');
const express = require('express');
const nodemailer = require('nodemailer');
const SeminarSchema = require('../model/seminar');
const RegistrationSchema = require('../model/RegistrationShema')
const subscription = require('../model/subscription')
const User = require('../model/User');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.use(express.json());

router.post(
  '/seminar',
  upload.fields([{ name: 'picture' }, { name: 'pdf' }]),
  async (req, res) => {
    const { content, title } = req.body;
    const pictureFile = req.files['picture'] ? req.files['picture'][0] : null;

    try {
      const seminar = new SeminarSchema({
        content,
        title,
        picture: pictureFile
          ? {
            filename: pictureFile.filename,
            mimetype: pictureFile.mimetype,
            path: pictureFile.path,
          }
          : null,
      });

      await seminar.save();

      res.json({ message: 'Seminar post created successfully' });
      const users = await User.find({}).exec();
      const subscribers = await subscription.find({}).exec();
  
      const allRecipients = [...users, ...subscribers]; // Combine users and subscribers
  
      if (allRecipients.length > 0) {
        const emailRecipients = allRecipients.map((recipient) => recipient.email);
  
        emailRecipients.forEach((email) => {
          const mailOptions = {
            from: 'help@ogendu.org',
            to: email,
            subject: 'NEW SEMINAR POST ' + name,
            text: 'New Seminar post from ogendu academy Visit https://ogendacademy.com  and register  ',
            attachments: [
              {
                filename: pictureFile
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

    } catch (error) {
      console.error('Error creating seminar post:', error);
      res.status(500).json({ message: 'Error creating seminar post' });
    }
  }
);

// Retrieve all seminars
router.get('/seminar', async (req, res) => {
  console.log('all seminar sent to the frontend ')
  try {
    const seminars = await SeminarSchema.find();
    res.json(seminars);
    console.log(seminars)
  } catch (error) {
    console.error('Error retrieving seminars:', error);
    res.status(500).json({ message: 'Error retrieving seminars' });
  }
});

// Retrieve a specific seminar by ID
router.get('/seminar/:id', async (req, res) => {
  console.log('one seminar sent to the frontend ')
  const seminarId = req.params.id;

  try {
    const seminar = await SeminarSchema.findById(seminarId);
    if (!seminar) {
      return res.status(404).json({ message: 'Seminar not found' });
    }
    res.json(seminar);
  } catch (error) {
    console.error('Error retrieving seminar:', error);u
    res.status(500).json({ message: 'Error retrieving seminar' });
  }
});



router.post('/seminar/:id/register', async (req, res) => {
  console.log('new seminar registration');
  const seminarId = req.params.id;
  console.log(seminarId)
  const { name, email, phone } = req.body;

  try {
    const seminar = await SeminarSchema.findById(seminarId);
    if (!seminar) {
      return res.status(404).json({ message: 'Seminar not found' });
    }

    const alreadyRegistered = seminar.users.some(
      (user) => user.email === email
    );
    if (alreadyRegistered) {
      return res.json({ message: ' You have already registered  ' });
    }

    const user = {
      name,
      email,
      phone,
    };

    seminar.users.push(user);
    await seminar.save();

    // Send registration confirmation email
    const transporter = nodemailer.createTransport({
      host: 'server71.web-hosting.com',
      port: 465,
      secure: true, 
      auth: {
        user: 'help@ogendu.org',
        pass: 'chinedu001#@'
      }
    });

    await transporter.sendMail({
      from: 'help@ogendu.org', // Replace with your email address
      to: email,
      subject: `Registration Confirmation: ${seminar.title}`,
      text: `Thank you for registering for the seminar ${seminar.title}.`,
    });


    const registeredSeminarId = seminarId;
    await User.findOneAndUpdate(
      { email: email },
      { $push: { registeredSeminars: registeredSeminarId } },
      { new: true }
    );

    res.json({ message: `Registration successful, the link has been sent to ${email}` });
  } catch (error) {
    console.error('Error registering for seminar:', error);
    res.status(500).json({ message: 'Error registering for seminar' });
  }
});


router.get('/registered_seminar', async (req, res) => {
  const userId = req.user.id; 

  try {
    const user = await User.findById(userId).populate('registeredSeminars');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const registeredSeminars = user.registeredSeminars.map((seminar) => seminar._id);

    res.json({ registeredSeminars });
  } catch (error) {
    console.error('Error fetching registered seminars:', error);
    res.status(500).json({ message: 'Error fetching registered seminars' });
  }
});





module.exports = router;








