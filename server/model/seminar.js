const mongoose = require('mongoose');

const seminarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  picture: {
    filename: {
      type: String,
    },
    mimetype: {
      type: String,
    },
    path: {
      type: String,
    },
  },
  users: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true, 
      },
      phone: {
        type: String,
        required: true,
        unique: true, 
      },
    },
  ],
});

const Seminar = mongoose.model('Seminar', seminarSchema);

module.exports = Seminar;
