const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    default: 'admin'
  },
  password: {
    type: String,
    required: true,
    default: 'password'
  }
});

adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const Admin = mongoose.model('Admin', adminSchema, 'admin');

// Create initial admin user if none exists
const createInitialAdmin = async () => {
  try {
    const count = await Admin.countDocuments();
    if (count === 0) {
      const initialAdmin = new Admin({
        username: 'admin',
        password: 'password' // You can change the default password here if needed
      });
      await initialAdmin.save();
      console.log('Initial admin user created successfully');
    }
  } catch (error) {
    console.error('Error creating initial admin user:', error);
  }
};

createInitialAdmin();

module.exports = Admin;
