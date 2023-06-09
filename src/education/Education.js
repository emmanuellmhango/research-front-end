import React from "react";
import { useNavigate } from "react-router";

const Education = ({education, user}) => {
    const navigate = useNavigate();

    const addEducation = (e) => {
        e.preventDefault();
        navigate('/education', {state: { user: user}});
    };
    
    return (
        <div className="dashboard-content-biodata">
        <h3 className="biodata-title">Education</h3>
        <table className="table-bio-data">
        <tbody>
            {education && (
                education.map((education, index) => (
                   <>
                    <tr key={index} className="data-first-row">
                        <td>
                            <div className="data-width-counter">
                                <div className="data-counter">
                                    {index + 1}
                                </div>
                                <div className="data">
                                    <span className="data-details">{education.qualification}</span>
                                    <span className="bio-title">{education.university}</span>
                                    <span className="bio-title">{education.date_completed} | {education.location}</span>
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
                        <input type='button' value='Add Education' onClick={addEducation} className='form-control-btn' />
                    </div>
                </td>
            </tr>                      
        </tbody>
        </table>
    </div>
    );
};

export default Education;
