import React from "react";
import { useNavigate } from "react-router";

const Experience = ({experience, user}) => {
    const navigate = useNavigate();

    const addExperience = (e) => {
        e.preventDefault();
        navigate('/experience', {state: { user: user}});
    };
    
    return (
        <div className="dashboard-content-biodata">
        <h3 className="biodata-title">Experience</h3>
        <table className="table-bio-data">
        <tbody>
            {experience && experience.length > 0 && (
                experience.map((experience, index) => (
                   <>
                    <tr key={index + 1} className="data-first-row">
                        <td>
                            <div className="data-width-counter">
                                <div className="data-counter">
                                    {index + 1}
                                </div>
                                <div className="data">
                                    <span className="data-details">{experience.position}</span>
                                    <span className="bio-title">{experience.company}</span>
                                    <span className="bio-title">{experience.date_joined} -- {experience.date_left || '<i>Current</i>'}</span>
                                    <span className="bio-title">{experience.location}</span>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr key={index + 200} ><td>&nbsp;</td></tr>
                   </>
                ))
            )}
            <tr><td colSpan="3">&nbsp;</td></tr>
            <tr className="data-edit">
                <td colSpan="3">
                    <div className='form-group'>
                        <input type='button' value='Add Experience' onClick={addExperience} className='form-control-btn' />
                    </div>
                </td>
            </tr>                      
        </tbody>
        </table>
    </div>
    );
};

export default Experience;
