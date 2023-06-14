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
      const users = response.data;
      setStoredUserData(users);
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
    let videoStream = null;

    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models'),
      ]);
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoStream = stream;
        })
        .catch((error) => {
          console.error('Error accessing webcam:', error);
        });
    };

    const recognizeFace = async () => {
      const videoElement = videoRef.current;
      const canvasElement = canvasRef.current;
      let displaySize = { width: 0, height: 0 };
    
      videoElement.addEventListener('loadeddata', () => {
        displaySize = { width: videoElement.videoWidth, height: videoElement.videoHeight };
        faceapi.matchDimensions(canvasElement, displaySize);
      });
    
      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors()
          .withFaceExpressions();
    
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        const canvasContext = canvasElement.getContext('2d');
        canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
        faceapi.draw.drawDetections(canvasElement, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvasElement, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvasElement, resizedDetections);
    
        // Perform your desired actions based on face recognition results
        if (detections.length > 0) {
          console.log('Face recognized!');
          handleFaceLogin(storedUserData);
        }
      }, 100);
    };        

    loadModels()
      .then(() => startVideo())
      .then(() => recognizeFace());

    return () => {
      // Clean up resources when component unmounts
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleFaceLogin = (users) => {
    const canvasElement = canvasRef.current;
    const faceImage = canvasElement.toDataURL();
    
    // Compare the recognized face with each stored face image
    let isMatched = false;
    for (const user of users) {
      const storedFaceImage = user.image_data;
  
      // Compare the stored face image with the recognized face
      if (faceImage === storedFaceImage) {
        console.log('Matched');
        isMatched = true;
        break;
      }
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
            <div className='form-group'>
              <video ref={videoRef} className='form-control-l-vid' autoPlay></video> <br />
              <canvas ref={canvasRef} className='form-control-l-vid-canv'></canvas> <br />
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
