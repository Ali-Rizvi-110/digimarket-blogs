const Admin = require('../models/admin');
const Blog = require('../models/blog');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findByIdAndDelete } = require('../models/blog');
// Get the admin details
const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne();
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin' });
  }
};

// Update the admin details
const updateAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne();
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    admin.username = username;
    admin.password = password;
    await admin.save();
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update admin' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the admin user by username
    const admin = await Admin.findOne({ username });

    // If admin user not found, return error
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, admin.password);

    // If passwords don't match, return error
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ adminId: admin._id }, 'your-secret-key', {
      expiresIn: '2h' // Token expires in 1 hour, you can adjust this as needed
    });

    // Return the token in the response
    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
};

const deleteBlog = async (req, res) => {
  const id = req.params.id; // Assuming the blog ID is extracted from the request parameters
  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).send('Blog not found');
    }
    res.status(200).send(`Blog with title '${blog.title}' deleted`);
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};


module.exports = { getAdmin, updateAdmin, login, deleteBlog };
