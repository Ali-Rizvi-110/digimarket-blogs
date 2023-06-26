const Admin = require('../models/admin');

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

module.exports = { getAdmin, updateAdmin };
