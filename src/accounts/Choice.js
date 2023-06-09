import React from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import '../dashboard/dashboard.css';

const Choice = () => {
    const navigate = useNavigate();
    const handleCandidate = (event) => {
        event.preventDefault();
        navigate('/signup');
    };

    const handleCompany = (event) => {
        event.preventDefault();
        navigate('/company-signup');
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
                        <h1 className="bio-form-title">Choose your role to Signup</h1>
                        <input type="button" onClick={handleCandidate} value="Candidate" className="form-control-btn custom" />
                        <input type="button" onClick={handleCompany} value="Hiring Manager" className="form-control-btn custom-1" />
                    </center>
                </div>
                <br />
                  <center>
                    <NavLink to="/login">Already have an account? <span className="big-up">Log in</span></NavLink>
                  </center>

            </div>   
        </div>
    );
};

export default Choice;
