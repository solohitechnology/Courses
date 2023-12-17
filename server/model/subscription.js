const mongoose = require('mongoose');

const subscription = new mongoose.Schema({
    email: {
        type: String,
        required: true, 
        unique: true,
    }
})

const Subscribe = mongoose.model('subcribers', subscription)
module.exports = Subscribe