import React, {useState} from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import '../dashboard/dashboard.css';

const JobForm = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const company = location.state.company;

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const goHome = (event) => {
        event.preventDefault();
        navigate('/company-dashboard');
    }
    const [formData, setFormData] = useState({
        company_id: company.id,
        title: '',
        position: '',
        description: '',
        required_education: '',
        needed_skills: '',
        closing_date: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:3000/api/v1/companies/${company.id}/jobs`, formData)
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
                    <label htmlFor="edit-biodata-name">Vacancy Title</label> <br />
                    <input type="text" onChange={handleInputChange} id="edit-education-name" name="title" className="form-control-l" required />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-biodata-email">Vacancy Position</label><br />
                    <input type="text" onChange={handleInputChange} id="edit-education-email" name="position" className="form-control-l" required />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-biodata-email">Description</label><br />
                    <textarea onChange={handleInputChange} id="edit-education-email" name="description" className="form-control-ltx" required rows="20" />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-biodata-email">Required Education</label><br />
                    <input type="text" onChange={handleInputChange} id="edit-education-email" name="required_education" className="form-control-l" required />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-biodata-email">Required Skills</label><br />
                    <input type="text" onChange={handleInputChange} id="edit-education-email" name="needed_skills" className="form-control-l" required />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-biodata-address">Closing Date</label><br />
                    <input type="date" onChange={handleInputChange} id="edit-date-completed"  name="closing_date" className="form-control-l" required />
                </div>
                <div className="form-group-push">
                    <input type="submit" value="Add Vacancy" className="form-control-btn" />
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

export default JobForm;
