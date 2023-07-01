import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangeAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }else if(e.target.name === "rePassword"){
      setRePassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(password!==rePassword){
        setMessage('Your password does not match');
        return;
      }
      const token = sessionStorage.getItem('token'); // Retrieve the token from session storage
      const response = await axios.put('http://localhost:3000/api/admin/update', { username, password }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response", response.data);
      setMessage(response.data.message);
      setUsername("");
      setPassword("");
      setPassword("");
      navigate('/');
    } catch (error) {
      setMessage("Error occurred while changing admin credentials");
    }
  };
  
  const handleLogout = () => {
    // Clear any stored authentication-related data in the frontend
    sessionStorage.removeItem("token");
    // Redirect to the login page
    navigate("/");
  };

  return (
    <div>
      <button onClick={() => navigate("/changeadmin")}>Change Admin</button>
      <button onClick={() => navigate("/createblog")}>Create Blogs</button>
      <button onClick={handleLogout}>LogOut</button>
      <h2>Change Admin Credentials</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="rePassword"
            value={rePassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Change</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangeAdmin;
