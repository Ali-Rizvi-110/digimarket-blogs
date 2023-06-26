const express = require('express');
const router = express.Router();
const multer = require('multer');
const blogController = require('../controllers/blogController');
const authenticateToken = require('../controllers/authentication');

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination folder for uploaded files
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Extract the file extension
    const fileExtension = file.originalname.split('.').pop();
    // Generate a unique filename with the extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = file.fieldname + '-' + uniqueSuffix + '.' + fileExtension;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 },
  { name: 'image5', maxCount: 1 },
]), blogController.createBlog);

router.get('/', blogController.getAllBlogs);

module.exports = router;
