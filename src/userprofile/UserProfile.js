import React, { useState } from "react";
import axios from 'axios';

const UserProfile = ({skills, user}) => {
    const name = `${user.first_name} ${user.last_name}`;

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const [formData, setFormData] = useState({
        user_id: user.id,
        skill: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:3000/api/v1/users/${user.id}/skills`, formData)
          .then(() => {
            alert('Data saved correctly.');
          })
          .catch(() => {
            alert(`Error saving data, Please try again!!`);
          });
    };

    return (
        <div className="dashboard-user-details">
        <div className="dashboard-image">
            <picture>
                <img 
                    src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" 
                    alt="Profile Pic"
                    className="profile-image" 
                />
            </picture>
        </div>
        <div className="dashboard-username">
            <span className="user-name">{ name }</span> <br />
            <span className="header-tag">
                Developer
            </span>
        </div>
        <div className="dashboard-profile-statement">
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
            </p>
        </div>
        <div className="dashboard-user-skills">
            <h3 className="user-skills-header">Skills</h3>
            { skills && skills.length > 0 && (
                skills.map((skill, index) => (
                    <span key={index} className="skill">{skill}</span>
                ))
            )}
        </div>
        <div className="dashboard-add-skill">
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="skill" onChange={handleInputChange} id="add-user-skill"  className="form-control" placeholder="Add Skill" required />
                    <button type="submit" className="btn btn-primary cursor">Add</button>
                </div>
            </form>
        </div>
    </div>
    );
};

export default UserProfile;
