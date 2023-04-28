import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchBiodata } from "../accounts/userBiodataSlice";
import { fetchEducation } from "../education/educationSlice";
import { fetchExperience } from "../experience/experienceSlice";
import { fetchSkills } from "../userprofile/skillsSlice";
import { fetchProfile } from "../userprofile/profileSlice";
import Experience from "../experience/Experience";
import BasicData from "../biodata/BasicData";
import UserProfile from "../userprofile/UserProfile";
import Education from "../education/Education";
import './dashboard.css';

const CandidateDashboard = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const biodata = useSelector((state) => state.biodata);
    const experience = useSelector((state) => state.experience);
    const education = useSelector((state) => state.education);
    const skills = useSelector((state) => state.skills);
    const profile = useSelector((state) => state.profile);
    
    useEffect(() => {
        dispatch(fetchBiodata(user.id));
        dispatch(fetchEducation(user.id));
        dispatch(fetchExperience(user.id));
        dispatch(fetchSkills(user.id));
        dispatch(fetchProfile(user.id));
    }, [dispatch]);

    return (
        <div className="container">
            <br />
            <br />
            <br />
            <br />
            <div className="dashboard-container">
                <UserProfile profile={profile[0]} user={user} skills={skills} />
                <div className="dashboard-contents">
                    <BasicData biodata={biodata[0]} user={user} />
                    <br />
                    <Experience experience={experience} user={user} />
                    <br />
                    <Education education={education} user={user} />
                </div>
                
            </div>
            <br />
        </div>
    );
};

export default CandidateDashboard;
