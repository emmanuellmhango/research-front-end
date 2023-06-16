import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as faceapi from 'face-api.js';
import './style.css';

function CandidateLogin({ onLogin }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storedUserData, setStoredUserData] = useState([]);
  const [capturedImage, setCapturedImage] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const navigate = useNavigate();
  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const fetchStoredUserData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/get_images');
      const { success, user } = response.data;
      if (success) {
        setStoredUserData(user);
      } else {
        console.log('Error fetching user data');
      }
    } catch (error) {
      console.error('Error fetching stored user data:', error);
    }
  };
  
  
  useEffect(() => {
    fetchStoredUserData();
  }, []);  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    await axios
      .get('http://localhost:3000/api/v1/users', {
        params: data,
      })
      .then((response) => {
        if (response.data.success === true) {
          dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });
          onLogin();
          alert('Login successful');
          navigate('/dashboard');
        } else {
          alert('Wrong login credentials, please try again');
        }
      })
      .catch((error) => {
        alert('Seems there is a network error, please try again');
      });
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

    context.drawImage(
      videoElement,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    const imageDataUrl = canvasElement.toDataURL();
    setCapturedImage(imageDataUrl);
  };

  const handleFaceLogin = (e) => {
    e.preventDefault();
    const faceImage = capturedImage;
    let isMatched = false;
    const storedFaceImage = storedUserData.map((user) => user.image_data);
    if (storedFaceImage.includes(faceImage)) {
      console.log('Matched');
      isMatched = true;
    }
    
    if (!isMatched) {
      console.log('Not matched');
    }
  };   

  return (
    <div className='account'>
      <br />
      <br />
      <br /><br />
      <div className='signup-container'>
        <div className='signup-form'>
          <h1> Login as Candidate</h1>
          <h3>Login with Face</h3>
          <form>
          <div className="form-group">
              <label>Capture your Face</label> <br />
                {capturedImage ? (
                  <>
                    <img
                      src={capturedImage}
                      alt="Captured Face"
                      className="form-control-l-vid"
                    />
                    <input type="hidden" name="image_data" value={capturedImage} /> <br />
                    <button onClick={handleFaceLogin} className="form-control-btn">Login with Face</button>
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
          </form>
          <h2>OR</h2>
          <h3>Login with Email</h3>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                value={email}
                onChange={handleUsernameChange}
                type='email'
                id='email'
                name='email'
                placeholder='Email Address'
                className='form-control-l'
              />
            </div>
            <div className='form-group'>
              <input
                value={password}
                onChange={handlePasswordChange}
                type='password'
                id='password'
                name='password'
                placeholder='Your Password'
                className='form-control-l'
              />
            </div>
            <div className='form-group'>
              <input type='submit' value='Login' className='form-control-btn' />
            </div>
          </form>
        </div>
        <br />
        <NavLink to='/signup-as'>
          You don't have an account? <span className='big-up'>Create Account Now!</span>
        </NavLink>
      </div>
    </div>
  );
}

export default CandidateLogin;
