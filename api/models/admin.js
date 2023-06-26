const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    default: "admin"
  },
  password: {
    type: String,
    required: true,
    default: "password"
  },
});

const Admin = mongoose.model('Admin', adminSchema, 'admin');

module.exports = Admin;
