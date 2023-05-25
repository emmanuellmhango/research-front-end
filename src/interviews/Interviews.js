import React, { useState} from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Interviews() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.get('http://localhost:3000/api/v1/users_interview', email)
      .then((response) => {
          if(response.status === 200) {
            alert('User Verified');
            navigate('/interview-start');
          } else {
            alert('Email could not be verified, please try again')
          }
        })
      .catch((error) => {
        alert('Seems there is a network error, please try again');
      });
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
          <h1> Enter your Email to proceed</h1>
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
            <br />
            <div className='form-group'>
              <input type='submit' value='Proceed >>' className='form-control-btn' />
            </div>
          </form>
        </div>
        <br />

      </div>
    </div>
  );
}

export default Interviews;
