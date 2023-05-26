import React, {useState} from "react";
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { fetchBiodata } from "../accounts/userBiodataSlice";
import '../dashboard/dashboard.css';

const BiodataForm = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state.user;
    const biodata = location.state.biodata;
    const name = `${user.first_name} ${user.last_name}`;

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const [formData, setFormData] = useState({
        user_id: user.id,
        date_of_birth: '',
        address: '',
        location: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:3000/api/v1/users/${user.id}/biodata`, formData)
          .then(() => {
            alert('Data saved correctly.');
            dispatch(fetchBiodata(user.id));
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
                    <label htmlFor="edit-biodata-name">Name</label> <br />
                    <input type="text" onChange={handleInputChange} id="edit-biodata-name" className="form-control-l" readOnly  value={name} />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-biodata-email">Email</label><br />
                    <input type="email" onChange={handleInputChange} id="edit-biodata-email" name="email" className="form-control-l" value={user.email} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-biodata-phone">Phone</label><br />
                    <input type="text" onChange={handleInputChange} id="edit-biodata-phone" className="form-control-l" placeholder={user.phone} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-biodata-address">Date of Birth</label><br />
                    <input type="date" onChange={handleInputChange} id="edit-biodata-address"  name="date_of_birth" className="form-control-l" placeholder="Date of birth" />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-biodata-address">Address</label><br />
                    <input type="text" onChange={handleInputChange} id="edit-biodata-address"  name="address" className="form-control-l" placeholder={biodata ? biodata.address : ''} />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-biodata-city">Location</label><br />
                    <input type="text" onChange={handleInputChange} id="edit-biodata-city" name="location" className="form-control-l" placeholder={biodata ? biodata.location : '' } />
                </div>
                <div className="form-group">
                    <input type="submit" value="Save Details" className="form-control-btn" />
                </div>
            </form>
          </div>
        </div>   
    </div>
    );
};

export default BiodataForm;
