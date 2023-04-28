import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import '../dashboard/dashboard.css';

const ExperienceForm = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state.user;

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const goHome = (event) => {
        event.preventDefault();
        navigate('/dashboard');
    }
    const [formData, setFormData] = useState({
        user_id: user.id,
        company: '',
        position: '',
        date_joined: '',
        date_left: '',
        location: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:3000/api/v1/users/${user.id}/experiences`, formData)
          .then(() => {
            alert('Data saved correctly.');
          })
          .catch(() => {
            alert(`Error saving data, Please try again!!`);
          });
    };

    return (
        <div className="container-b">
        <br />
        <br />
        <br />
        <br />
        <div className="bio-form-container">         
          <div className="bio-form-details">
            <h2>Edit User Details</h2>
            <form id="form-edt" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="edit-biodata-name">Position</label> <br />
                    <input type="text" onChange={handleInputChange} id="edit-position" name="position" className="form-control-l" required  placeholder="Position" />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-biodata-email">Company Name</label><br />
                    <input type="text" onChange={handleInputChange} id="edit-education-email" name="company" className="form-control-l" required placeholder="Company Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-biodata-address">Date Joined</label><br />
                    <input type="date" onChange={handleInputChange} id="edit-date-completed"  name="date_joined" className="form-control-l" placeholder="Date Joined" />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-biodata-address">Date Left</label><br />
                    <input type="date" onChange={handleInputChange} id="edit-date-completed"  name="date_left" className="form-control-l" placeholder="Date Left" />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-biodata-city">Location</label><br />
                    <input type="text" onChange={handleInputChange} id="edit-biodata-city" name="location" className="form-control-l" placeholder="Location" />
                </div>
                <div className="form-group-push">
                    <input type="submit" value="Add Experience" className="form-control-btn" />
                    <button type="reset" className="form-control-btn">Clear</button>
                </div>
            </form>
          </div>
        </div>  
        <div className="back-btn-home">
            <button type="button" onClick={goHome} className="form-control-btn"> <span className="arrow">&#8592;</span> <span className="text-back">Home</span> </button>
        </div> 
    </div>
    );
};

export default ExperienceForm;
