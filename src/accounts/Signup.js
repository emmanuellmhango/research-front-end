import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import './style.css';

function Signup() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/api/v1/users', formData)
      .then(() => {
        alert('Account created successfully! Please log in.');
        window.location.href = '/login';
      })
      .catch(() => {
        alert(`Error creating account, Please try again!!`);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="account">
      <br />
      {' '}
      <br />
      <br />
      {' '}
      <br />
      <br />    
      <div className="signup-container">
        <div className="signup-form">
          <h1> Create Account </h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your First Name</label> <br />
              <input onChange={handleInputChange} type="text" name='first_name' className="form-control-l" required />
            </div>
            <div className="form-group">
              <label>Your Last Name</label> <br />
              <input onChange={handleInputChange} type="text" name="last_name" className="form-control-l" required />
            </div>
            <div className="form-group">
              <label >Your Phone Number</label> <br />
              <input onChange={handleInputChange} type="tel" name="phone" className="form-control-l" required />
            </div>
            <div className="form-group">
              <label >Your Email address</label> <br />    
              <input onChange={handleInputChange} type="email" name="email" className="form-control-l" required />
            </div>
            <div className="form-group">
              <label >Your Password</label> <br />    
              <input onChange={handleInputChange} type="password" name="password" className="form-control-l" required />
            </div>
            <div className="form-group">
              <input type="submit" value="Create Account" className="form-control-btn" />
            </div>
          </form>
        </div>
        <br />
        <NavLink to="/login">Already have an account? Log in</NavLink>
      </div>
    </div>
  );
}

export default Signup;