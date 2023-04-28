import React, { useState} from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './style.css';

function CompanyLogin({onLogin}) {
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
    await axios.get('http://localhost:3000/api/v1/companies', {
        params: data,
      })
      .then((response) => {
          if(response.data.success === true) {
            dispatch({ type: 'SUCCESS_COMP_LOG', payload: response.data.company });
            onLogin();
            alert('Login successful');
            navigate('/company-dashboard');
          } else {
            alert('Wrong login credentials, please try again')
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
          <h1> Login as Hiring Manager</h1>
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
        <NavLink to='/signup-as'>You dont have an account? <span className="big-up">Create Account Now!</span></NavLink>
      </div>
    </div>
  );
}

export default CompanyLogin;
