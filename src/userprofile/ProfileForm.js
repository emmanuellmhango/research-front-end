import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import '../dashboard/dashboard.css';

const ProfileForm = (props) => {
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
        profile_position: '',
        profile_text: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:3000/api/v1/users/${user.id}/profiles`, formData)
          .then(() => {
            alert('Data saved correctly.');
            navigate('/dashboard');
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
                    <label htmlFor="edit-biodata-name">Header Title</label> <br />
                    <input type="text" onChange={handleInputChange} id="edit-education-name" name="profile_position" className="form-control-l" required  placeholder="E.g. Software Engineer" />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-biodata-email">Profile Statement</label><br />
                    <input type="text" onChange={handleInputChange} id="edit-education-email" name="profile_text" className="form-control-l" required placeholder="E.g. Experienced software engineer..." />
                </div>
                <div className="form-group-push">
                    <input type="submit" value="Save Profile" className="form-control-btn" />
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

export default ProfileForm;
