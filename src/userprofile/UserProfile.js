import React, { useRef, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router";

const UserProfile = ({profile, skills, user}) => {
    const myDivRef = useRef(null);
    const navigate = useNavigate();
    const name = `${user.first_name} ${user.last_name}`;

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const [formData, setFormData] = useState({
        user_id: user.id,
        skname: ''
    });

    const editProfile = (event) => {
        event.preventDefault();
        navigate('/profile', {state: { user: user}});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:3000/api/v1/users/${user.id}/skills`, formData)
          .then(() => {
            alert('Data saved correctly.');
            const newElement = document.createElement('span');
            newElement.className = 'skill';
            newElement.textContent = formData.skname;
            myDivRef.current.appendChild(newElement);
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
                    src="https://img.freepik.com/free-icon/black-male-user-symbol_318-60703.jpg?w=2000" 
                    alt="Profile Pic"
                    className="profile-image" 
                />
            </picture>
        </div>
        <div className="dashboard-username">
            <span className="user-name">{ name }</span> <br />
            <span className="header-tag">
                {profile && profile.profile_position !== undefined ? profile.profile_position : 'null'}
            </span>
        </div>
        <div className="dashboard-profile-statement">
            <p>
                {profile && profile.profile_text !== undefined ? profile.profile_text : 'null'}
            </p>
            <button type="button" onClick={editProfile} className="form-control-btn">Edit Profile Statement</button>
        </div>
        <div className="dashboard-user-skills" ref={myDivRef}>
            <h3 className="user-skills-header">Skills</h3>
            { skills && skills.length > 0 && (
                skills.map((skill, index) => (
                    <span key={index} className="skill">{skill.skname}</span>
                ))
            )}
        </div>
        <div className="dashboard-add-skill">
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="skname" onChange={handleInputChange} id="add-user-skill"  className="form-control" placeholder="Add Skill" required />
                    <button type="submit" className="btn btn-primary cursor">Add</button>
                </div>
            </form>
        </div>
    </div>
    );
};

export default UserProfile;
