const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  seminar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seminar',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
