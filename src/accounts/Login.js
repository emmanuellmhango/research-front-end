import React, { useState} from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './style.css';

function Login({onLogin}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    try {
      const response = await axios.get('http://localhost:3000/api/v1/users', {
        params: data 
      });
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });
      onLogin();
      alert('You have successfully logged in')
      navigate('/dashboard');
    } catch (error) {
      alert(`There was an error logging in, please try again!${error}`);
    }
  };

  return (
    <div className='account'>
      <br />
      {' '}
      <br />
      <br />
      {' '}
      <br />
      <br />

      <div className='signup-container'>
        <div className='signup-form'>
          <h1> Login </h1>
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
        <NavLink to='/signup'>You dont have an account? Create Account Now!</NavLink>
      </div>
    </div>
  );
}

export default Login;
