import React from "react";
import { useNavigate } from "react-router";

const Jobs = ({company, jobs}) => {
    const navigate = useNavigate();
    const addJob = (e) => {
        e.preventDefault();
        navigate('/add-job', {state: { company: company}});
    };

    return (
        <div className="dashboard-content-biodata">
        <h1 className="biodata-title">Jobs Posted</h1>
        <table className="table-bio-data">
        <tbody>
            <tr className="data-edit">
                <td colSpan="3">
                    <div className='form-group'>
                        <input type='button' value='Add Job' onClick={addJob} className='form-control-btn' />
                    </div>
                </td>
            </tr> 
            <tr><td>&nbsp;</td></tr>
            {jobs && (
                jobs.jobs.map((job, index) => (
                   <>
                    <tr key={index} className="data-first-row">
                        <td>
                            <div className="data-width-counter">
                                <div className="data-counter">
                                    {index + 1}
                                </div>
                                <div className="data">
                                    <span className="data-details">{job.title}</span>
                                    <span className="bio-title">Position: {job.position}</span>
                                    <span className="bio-title">Closing: {job.closing_date}</span>
                                    <h3 className="user-skills-header">Skills Needed</h3>
                                    {job.needed_skills.split(",").map((skill, i) => (
                                        <div key={i} className="skill">{skill.trim()}</div>
                                    ))}
                                </div>
                                <div className="data-stats">
                                    <div className="data-applicants">
                                        <h3 className="user-skills-header">Applicants</h3>
                                        <span>201</span>
                                    </div>
                                    <div className="data-applicants">
                                        <h3 className="user-skills-header">Interviewed</h3>
                                        <span>120</span>
                                    </div>
                                    <div className="data-applicants">
                                        <h3 className="user-skills-header">Successful</h3>
                                        <span>20</span>
                                    </div>
                                    <div className="data-applicants">
                                        <h3 className="user-skills-header">Rejected</h3>
                                        <span>100</span>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr key={index + 200} ><td>&nbsp;</td></tr>
                   </>
                ))
            )}                    
        </tbody>
        </table>
    </div>
    );
};

export default Jobs;
