import React from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import '../dashboard/dashboard.css';

const LoginChoice = () => {
    const navigate = useNavigate();
    const handleCandidate = (event) => {
        event.preventDefault();
        navigate('/candidate-login');
    };

    const handleCompany = (event) => {
        event.preventDefault();
        navigate('/company-login');
    };

    return (
        <div className="container-b">
        <br />
        <br />
        <br />
        <br />
        <div className="bio-form-container">         
          <div className="bio-form-details">
            <center>
                <h1 className="bio-form-title">Choose your role to Login</h1>
                <input type="button" onClick={handleCandidate} value="Candidate" className="form-control-btn custom" />
                <input type="button" onClick={handleCompany} value="Hiring Manager" className="form-control-btn custom-1" />
            </center>
          </div>
          <br />
          <center>
            <NavLink to='/signup-as'>You dont have an account? <span className="big-up">Create Account Now!</span></NavLink>            
          </center>
        </div>   
    </div>
    );
};

export default LoginChoice;
