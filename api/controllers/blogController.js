const Blog = require('../models/blog');

const authenticateToken = (req, res, next) => {
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

    next();
  });
};


const createBlog = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    console.log("Inside the create Blog", req.body);
    const mainImage = req.files['mainImage'][0].filename; // Assuming you have a single mainImage file
    console.log(req.files);
    const paragraphs = [];
    for (let i = 1; i <= 5; i++) {
      const imageField = req.files[`image${i}`];

      let image = null; // Default value for image field
      if (imageField && imageField.length > 0) {
        image = imageField[0].filename;
      }

      const title = req.body[`title${i}`] || '';
      const content = req.body[`para${i}`] || '';

      const paragraph = {
        [`title${i}`]: title,
        [`image${i}`]: image,
        [`para${i}`]: content,
      };

      paragraphs.push(paragraph);
    }

    const blog = new Blog({
      title,
      mainImage,
      description,
      category,
      ...paragraphs.reduce((acc, curr) => ({ ...acc, ...curr }), {}),
    });

    await blog.save();

    res.status(200).json({ message: 'Blog created successfully' });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Failed to create blog' });
  }
};


const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();

    // Map the blogs array and append the image URLs to each blog object
    const blogsWithImages = blogs.map((blog) => {
      const blogObj = blog._doc;
      const imageFields = ['mainImage', 'image1', 'image2', 'image3', 'image4', 'image5'];
      const images = {};

      imageFields.forEach((field) => {
        const imageName = blogObj[field];
        if (imageName) {
          images[field] = `/${imageName}`;
        }
      });

      return {
        ...blogObj,
        ...images,
      };
    });

    res.json(blogsWithImages);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};


module.exports = {
  createBlog,
  getAllBlogs,
}