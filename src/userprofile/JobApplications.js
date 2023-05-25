import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
import './JobApplications.css'

const JobApplications = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const applications = useSelector((state) => state.applications.applications);
    const [jobStatuses, setJobStatuses] = useState({});
    
    const fetchJobApplications = async () => {
        await axios.get(`http://localhost:3000/api/v1/users/${user.id}/jobapplications`)
        .then((response) => {
           dispatch({type: 'MY_JOB_APPS_SUCCESS', payload: response.data});
        })
        .catch((error) => {
           dispatch({type: 'MY_JOB_APPS_ERROR', payload: error});
        });
    };

    const fetchJobStatus = async (id) => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/save_email_invitations');
            if (response.data.success === true) {
                setJobStatuses(prevState => ({ ...prevState, [id]: 'Shortlisted' }));
            } else {
                setJobStatuses(prevState => ({ ...prevState, [id]: 'Pending Review' }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const jobStatus = (id) => {
        return jobStatuses[id] || '';
    };

    const AppDate = (dated) => {
        const dateString = dated;
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    useEffect(() => {
        fetchJobApplications();
    }, []);

    useEffect(() => {
        applications.forEach((job) => {
            fetchJobStatus(job.id);
        });
    }, [applications]);

    return (
        <>
            <br />
            <br />
            <div className="dashboard-content-biodata">
                <div className="job-table">
                    <h1 className="cur-title">My Applications</h1>
                </div>
                <table className="apps-table">
                    <thead>
                        <tr>
                            <th className="span-2">Position</th>
                            <th className="span-1">Date Applied</th>
                            <th className="span-1">Status</th>
                            <th className="span-1">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="4">
                                <hr className="tr-low" /> 
                            </td>
                        </tr>
                        {applications && applications.map((job) => (
                            <tr key={job.id} className="data-row">
                                <td>
                                    <NavLink to={{ pathname: '/view-job', search: `?jobId=${job.job_id}` }} className="job-link">
                                        <p className="data-row">{job.job.title} </p>
                                    </NavLink>
                                </td>
                                <td>
                                    {AppDate(job.created_at)}
                                </td>
                                <td className="action">
                                    {jobStatus(job.id)}
                                </td>
                                <td className="action">
                                    <button className="form-control-btn">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default JobApplications;
