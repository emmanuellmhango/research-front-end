import React, { useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Interviews() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const candidateEmail = location.state.applicantEmail;
  const id = location.state.job_id;
  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(email !== candidateEmail) {
      alert('Email does not match the candidate email, please try again');
    } else {
      alert('Email Confirmed, you can now proceed to the interview');
      navigate('/interview-start', {state: { job_id: id}});
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
          <h2> Verify your Email to proceed</h2>
          <h4>Your registered Email: {candidateEmail}</h4>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                value={email}
                onChange={handleUsernameChange}
                type='email'
                id='email'
                name='email'
                placeholder='Confirm Email Address'
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
