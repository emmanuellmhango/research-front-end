import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import './style.css';

function Signup() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: '',
    image_data: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Update formData with capturedImage
    const updatedFormData = { ...formData, image_data: capturedImage };
    setFormData(updatedFormData);
  
    console.log(updatedFormData.image_data);
    axios.post('http://localhost:3000/api/v1/users', updatedFormData)
      .then(() => {
        alert('Account created successfully! Please log in.');
        window.location.href = '/login';
      })
      .catch(() => {
        alert('Error creating an account. Please try again!');
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const initWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    initWebcam();
  }, []);

  const captureFace = () => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const context = canvasElement.getContext('2d');

    // Draw video frame on the canvas
    context.drawImage(
      videoElement,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    // Convert canvas image to data URL
    const imageDataUrl = canvasElement.toDataURL();
    setCapturedImage(imageDataUrl);
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
              <label>Capture your Face</label> <br />
                {capturedImage ? (
                  <>
                    <img
                      src={capturedImage}
                      alt="Captured Face"
                      className="form-control-l-vid"
                    />
                    <input type="hidden" name="image_data" value={capturedImage} />
                  </>
                ) :
                (
                  <>
                    <video ref={videoRef} className="form-control-l-vid" autoPlay></video> <br />
                    <canvas ref={canvasRef} width="640" height="480" className="form-control-l-vid-canv"></canvas> <br />
                    <button onClick={captureFace} className="form-control-btn">Capture Face</button>
                  </>
                )
                }              
            </div>
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
