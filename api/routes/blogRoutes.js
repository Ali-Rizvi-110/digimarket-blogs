const express = require('express');
const router = express.Router();
const multer = require('multer');
const blogController = require('../controllers/blogController');
const jwt = require('jsonwebtoken');

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

const secretKey = 'your-secret-key';

const uploadAndAuthenticate = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  // Verify the token
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }

    // Set the user data in the request object
    req.user = user;

    // Continue with the file upload
    upload.fields([
      { name: 'mainImage', maxCount: 1 },
      { name: 'image1', maxCount: 1 },
      { name: 'image2', maxCount: 1 },
      { name: 'image3', maxCount: 1 },
      { name: 'image4', maxCount: 1 },
      { name: 'image5', maxCount: 1 },
    ])(req, res, next);
  });
};

router.post('/', uploadAndAuthenticate, blogController.createBlog);

// router.post('/', upload.fields([
//   { name: 'mainImage', maxCount: 1 },
//   { name: 'image1', maxCount: 1 },
//   { name: 'image2', maxCount: 1 },
//   { name: 'image3', maxCount: 1 },
//   { name: 'image4', maxCount: 1 },
//   { name: 'image5', maxCount: 1 },
// ]), blogController.createBlog);

router.get('/', blogController.getAllBlogs);

module.exports = router;
