const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // no two users can share an email
  },
  password: {
    type: String,
    required: true, // this will store the HASHED password, never the plain text
  },
}, { timestamps: true }); // adds createdAt/updatedAt automatically

module.exports = mongoose.model('User', userSchema);

