const express = require('express');
const adminController = require('../controllers/adminController');
const authenticateToken  = require('../controllers/authentication');



const router = express.Router();

// Get the admin details
// router.get('/admin', adminController.getAdmin);


// Update the admin details with JWT authentication middleware
router.put('/update', authenticateToken, adminController.updateAdmin);
router.post('/login', adminController.login);
router.delete('/delete/:id', authenticateToken, adminController.deleteBlog);

module.exports = router;
