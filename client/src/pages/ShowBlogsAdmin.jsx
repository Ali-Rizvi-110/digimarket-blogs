import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../showBlogs.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

const ShowBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };
  useEffect(() => {
    // Fetch blogs from the server
    fetchBlogs();
  }, []);
  const handleLogout = () => {
    // Clear any stored authentication-related data in the frontend
    sessionStorage.removeItem('token');
    // Redirect to the login page
    navigate('/');
  };
  const deleteBlog = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.delete(`http://localhost:3000/api/admin/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Blog deleted successfully");
      // Handle the response or perform any necessary actions
      fetchBlogs();
    } catch (error) {
      console.log({ err: "Error in deleteBlog function", error });
      // Handle the error
    }
  };
  
  return (
    <div className="blog-list">
      <h2>List of Blogs</h2>
      <button onClick={() => navigate("/changeadmin")}>Change Admin</button>
      <button onClick={() => navigate("/createblog")}>Create Blogs</button>
      <button onClick={handleLogout}>LogOut</button>
      {blogs.map((blog) => (
        <div key={blog._id} className="blog-item">
          <h3>{blog.title}</h3>
          <img src={`http://localhost:3000/api/uploads/${blog.mainImage}`} alt="Blog Image" />

          {/* Render additional title, image, and paragraph fields */}
          {Array.from({ length: 5 }).map((_, index) => {
            const titleKey = `title${index + 1}`;
            const imageKey = `image${index + 1}`;
            const paraKey = `para${index + 1}`;
            const title = blog[titleKey];
            const image = blog[imageKey];
            const para = blog[paraKey];

            if (title && para) {
              return (
                <div key={index} className="blog-paragraph">
                  <h4>{title}</h4>
                  { image && <img src={`http://localhost:3000/api/uploads/${image}`} alt="Additional Image" /> }
                  <p>{para}</p>
                </div>
              );
            }
        })}
        <button onClick={()=>{deleteBlog(blog._id)}} >Delete this blog</button>
        </div>
      ))}
    </div>
  );
};

export default ShowBlogs;
