const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title:{ 
    type: String,
    required: [true, "must provide the title"]
  },
  mainImage: {
    type: String,
    required: [true, "must provide the main image"]
  },
  description: {
    type: String,
    required: [true, "must provide the description"]
  },
  category: {
    type: String,
    required: [true, "must provide the category"]
  },
  title1: {
    type: String,
  },
  image1: {
    type: String,
  },
  para1: {
    type: String,
  },
  title2: {
    type: String,
  },
  image2: {
    type: String,
  },
  para2: {
    type: String,
  },
  title3: {
    type: String,
  },
  image3: {
    type: String,
  },
  para3: {
    type: String,
  },
  title4: {
    type: String,
  },
  image4: {
    type: String,
  },
  para4: {
    type: String,
  },
  title5: {
    type: String,
  },
  image5: {
    type: String,
  },
  para5: {
    type: String
  },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
