import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../showBlogs.css'; // Import the CSS file for styling

const ShowBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch blogs from the server
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/blogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blog-list">
      <h2>List of Blogs</h2>
      {blogs.map((blog) => (
        <div key={blog._id} className="blog-item">
          <h3>{blog.title}</h3>
          <img src={`http://localhost:3000/uploads/${blog.mainImage}`} alt="Blog Image" />

          {/* Render additional title, image, and paragraph fields */}
          {Array.from({ length: 5 }).map((_, index) => {
            const titleKey = `title${index + 1}`;
            const imageKey = `image${index + 1}`;
            const paraKey = `para${index + 1}`;
            const title = blog[titleKey];
            const image = blog[imageKey];
            const para = blog[paraKey];

            if (title && image && para) {
              return (
                <div key={index} className="blog-paragraph">
                  <h4>{title}</h4>
                  <img src={`http://localhost:3000/uploads/${image}`} alt="Additional Image" />
                  <p>{para}</p>
                </div>
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
};

export default ShowBlogs;
