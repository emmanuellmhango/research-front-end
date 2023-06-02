import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Modal, Button } from 'react-bootstrap';
import './jobs.css'

const Jobs = ({company, jobs}) => {
    const [applicantsCount, setApplicantsCount] = useState({});
    const [showApplicants, setShowApplicants] = useState({});
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [interviewedCandidates, setInterviewedCandidates] = useState({});

    const navigate = useNavigate();
    const addJob = (e) => {
        e.preventDefault();
        navigate('/add-job', {state: { company: company}});
    };

    const groupResultsByUserId = (results) => {
        const resultsArray = [];
        results.forEach((result) => {
          const { user_id } = result;
          resultsArray.push(user_id);
        });
        const counter = Array.from(new Set(resultsArray));
        return counter.length;
    };   

    const addQuestions = (e, id, position) => {
        e.preventDefault();
        navigate('/add-questions', {state: { id: id, position: position}});
    };

    //// start from here -- rejecting candidates
    const rejectCandidate = async (e, candidateID, jobID, name, email, position, company) => {
        e.preventDefault();
        const data = {result: 'rejected', user_id: candidateID, job_id: jobID};
        await axios.post('http://localhost:3000/api/v1/jobscreenings', data)
        .then(() => {
            sendRejectionEmail(name, email, position, company);
            alert('Candidate rejected');
        })
        .catch(() => {
            alert('Error rejecting candidate, please try again later');
        });
    };
    /////////////////////////////
    
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

    const fetchInterviewedCandidates = async (jobId) => {
        const data = {job_id: jobId};
        try {
            const response = await axios.get('http://localhost:3000/api/v1/save_expressions', {params: data});
            if (response.data.success === true) {
                setInterviewedCandidates((prevState) => ({
                    ...prevState,
                    [jobId]: response.data.job_results,
                }));
            } else {
                setInterviewedCandidates((prevState) => ({
                    ...prevState,
                    [jobId]: [],
                }));
            }
        } catch (error) {
            setInterviewedCandidates((prevState) => ({
                ...prevState,
                [jobId]: [],
            }));
        }
    };

    const shortlistedCandidatesPerJob = [];
    const fetchApplicantsPerJob = async (id) => {
        await axios
          .get(`http://localhost:3000/api/v1/jobscreenings/${id}/show_applicants_per_job`)
          .then((response) => {
            // shortlistedCandidatesPerJob.push({ jobId: response.data });
            // console.log({ jobId: response.data });
          })
          .catch((error) => {
            console.log(`Error fetching shortlisted candidates: ${error}`);
        });
    };

    useEffect(() => {
        jobs.jobs.forEach((job) => {
          fetchJobApplicants(job.id);
          fetchAllpplicants(job.id);
          fetchApplicantsPerJob(job.id);
          fetchInterviewedCandidates(job.id);
        });
    }, [jobs]);


    const openDialog = (jobId) => {
        setSelectedJobId(jobId);
    };
    
    const closeDialog = () => {
        setSelectedJobId(null);
    };

    const candidateMatch = (applicantSkills, neededJobSkills) => {
        // prepare the skills and put them in the arrays
        // the candidate skills and the job required skills
        const neededJobSkillsArray = neededJobSkills.split(",").map((skill) => skill.trim());
        const applicantSkillsArray = applicantSkills.split(",").map((skill) => skill.trim());

        // check how many candidate skills match the job required skills
        const commonSkills = neededJobSkillsArray.filter((skill) => applicantSkillsArray.includes(skill));

        // calculate matching percentage
        const matchPercentage = (commonSkills.length / neededJobSkillsArray.length) * 100;
        // return the percentage of the match
        return matchPercentage.toFixed(2);
    };

    const shortlistCandidate = async (e, candidateID, jobID, name, email, position, company) => {
        e.preventDefault();
        const data = {result: 'shortlisted', user_id: candidateID, job_id: jobID};
        await axios.post('http://localhost:3000/api/v1/jobscreenings', data)
        .then(() => {
            sendWelcomeEmail(name, email, position, company, jobID, candidateID);
        })
        .catch(() => {
            alert('Error shortlisting candidate, please try again later');
        });
    }

    const sendWelcomeEmail = async (name, email, position, company, jobID, candidateID) => {
        try {
          const dataSave = {name: name, email: email, position: position, interview_conducted: 0, job_id: jobID, user_id: candidateID};
          const data = {name, email, position, company};
          const response = await axios.post('http://localhost:3000/api/v1/send_interview_invitation', data);
          if(response.status === 200) {
            const saveInviteData = await axios.post('http://localhost:3000/api/v1/save_email_invitations', dataSave);
            if(saveInviteData.statusText === 'Created') {
                alert('Candidate shortlisted. an email has been sent to the candidate');
                navigate('/company-dashboard');
            } else {
                alert('Error shortlisting candidate, please try again later');
                navigate('/company-dashboard');
            }
          }
        } catch (error) {
           alert('Error shortlisting candidate, please try again later');
        }
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
                                </div>
                                    <div className="data-applicants">
                                        <h3 className="user-skills-header">Interviewed</h3>
                                        <span>{interviewedCandidates[job.id] !== undefined ? groupResultsByUserId(interviewedCandidates[job.id]) : "...loading"}</span>
                                    </div>
                                    <div className="data-applicants">
                                        <h3 className="user-skills-header">Rankings</h3>
                                        <button
                                            onClick={() => openDialog(job.id)}
                                            className='form-control-btn applicants-2'
                                        >
                                            View
                                        </button>
                                    </div>
                                    <div className="data-applicants">
                                        <h3 className="user-skills-header">Rejected</h3>
                                        <span>100</span>
                                    </div>
                                    <div className="data-applicants bottom">
                                        <h3 className="user-skills-header">Questions</h3>
                                        <button 
                                            className='form-control-btn applicants center make-big'
                                            onClick={ (event) => addQuestions(event, job.id, job.position) } 
                                        >
                                            Add Questions
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr key={index + 200} ><td>&nbsp;</td></tr>
                   </>
                ))
            )} 
          <Modal show={selectedJobId !== null} onHide={closeDialog} className="modal-overlay">
            <Modal.Header >
                <Modal.Title>
                    {selectedJobId !== null && selectedJobId !== undefined ? (
                        <>
                        <h2>{jobs.jobs[selectedJobId - 1].position} Position</h2>
                        <h3>Applicants</h3>
                        </>
                    ) : ''}                
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="test">
            {selectedJobId !== null && showApplicants[selectedJobId] !== undefined && (
                <table className="table-applicants">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Skills</th>
                        <th>Matching</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(showApplicants[selectedJobId]) ? (
                    showApplicants[selectedJobId].map((applicant, i) => (
                        <tr key={i} className="applicant">
                            <td className="applicant-number">{i +1}</td>
                            <td className="applicant-name">{applicant.name}</td>
                            <td className="applicant-name">{applicant.email}</td>
                            <td className="applicant-phone">{applicant.phone}</td>
                            <td className="applicant-skills">{applicant.skills}</td>
                            <td className="applicant-phone">
                                {candidateMatch(applicant.skills, jobs.jobs[selectedJobId - 1].needed_skills)}%
                            </td>
                            <td className="applicant-actions">
                                {shortlistedCandidatesPerJob.includes(applicant.id) ? (
                                    <button className="form-control-btn applicants" disabled>Shortlisted</button>
                                ) : (
                                    <button
                                    className="form-control-btn applicants"
                                    onClick={
                                        (event) => shortlistCandidate(
                                            event, 
                                            applicant.id,
                                            selectedJobId,
                                            applicant.name,
                                            applicant.email,
                                            jobs.jobs[selectedJobId - 1].position,
                                            company.name
                                    )}
                                    >
                                        Shortlist
                                    </button>
                                )}
                                <button 
                                    className="form-control-btn reject"
                                    onClick={
                                        (event) => rejectCandidate(
                                            event,
                                            applicant.id,
                                            selectedJobId,
                                            applicant.name,
                                            applicant.email,
                                            jobs.jobs[selectedJobId - 1].position,
                                            company.name
                                    )}
                                >
                                        Reject
                                </button>
                            </td>
                        </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan="4">"Loading..."</td>
                        </tr>
                        )}
                </tbody>
                </table>
            )}
            </Modal.Body>
            <Modal.Footer>
                <br />
                <Button onClick={closeDialog} className="form-control-btn reject">X</Button>
            </Modal.Footer>
        </Modal>                     
        </tbody>
        </table>
    </div>
    );
};

export default Jobs;
