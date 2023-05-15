import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';
import './jobs.css'

const Jobs = ({company, jobs}) => {
    const [applicantsCount, setApplicantsCount] = useState({});
    const [showDialog, setShowDialog] = useState(false);
    const [showApplicants, setShowApplicants] = useState({});
    const [selectedJobId, setSelectedJobId] = useState(null);

    const navigate = useNavigate();
    const addJob = (e) => {
        e.preventDefault();
        navigate('/add-job', {state: { company: company}});
    };

    const fetchJobApplicants = async (jobId) => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/v1/jobs/${jobId}/show_applicant_count`
          );
          setApplicantsCount((prevState) => ({
            ...prevState,
            [jobId]: response.data.applicants,
          }));
        } catch (error) {
          console.log(error);
        }
    };

    const fetchAllpplicants = async (jobId) => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/v1/jobs/${jobId}/show_applicants`
          );
          setShowApplicants((prevState) => ({
            ...prevState,
            [jobId]: response.data.users,
          }));
        } catch (error) {
          console.log(error);
        }
    };

    useEffect(() => {
        jobs.jobs.forEach((job) => {
          fetchJobApplicants(job.id);
          fetchAllpplicants(job.id);
        });
    }, [jobs]);

    const openDialog = (jobId) => {
        setSelectedJobId(jobId);
        setShowDialog(true);
      };
    
      const closeDialog = () => {
        setSelectedJobId(null);
        setShowDialog(false);
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
                                        <button
                                            onClick={() => openDialog(job.id)}
                                            className='form-control-btn applicants'
                                        >
                                            {applicantsCount[job.id] !== undefined ? applicantsCount[job.id] : "...loading"}
                                        </button>
                                        <div>
                                            <Modal show={showDialog} onHide={closeDialog} className="modal-overlay">
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Applicants</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body className="test">
                                                    <table className="table-applicants">
                                                        <tbody>
                                                            {showApplicants[job.id] !== undefined && Array.isArray(showApplicants[job.id])
                                                                ? showApplicants[job.id].map((applicant, i) => (
                                                                        <tr key={i} className="applicant">
                                                                            <td className="applicant-name">{applicant.name}</td>
                                                                            <td className="applicant-email">{applicant.email}</td>
                                                                            <td className="applicant-phone">{applicant.phone}</td>
                                                                            <td className="applicant-skills">{applicant.skills}</td>
                                                                        </tr>
                                                                    ))
                                                                    : <tr><td colSpan="4">"Loading..."</td></tr>
                                                            } 
                                                        </tbody>
                                                    </table>                                                   
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button onClick={closeDialog} className="form-control-btn">Close</Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
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
