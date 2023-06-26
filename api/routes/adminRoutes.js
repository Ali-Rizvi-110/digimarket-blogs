const express = require('express');
const adminController = require('../controllers/adminController');
const { authenticateToken } = require('../controllers/authentication');

const router = express.Router();

// Get the admin details
// router.get('/admin', adminController.getAdmin);

// Update the admin details with JWT authentication middleware
router.put('/admin', adminController.updateAdmin);

module.exports = router;
