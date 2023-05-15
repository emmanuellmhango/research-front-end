import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import './JobApplications.css'

const JobApplications = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const applications = useSelector((state) => state.applications.applications);
    
    const fetchJobApplications = async () => {
        await axios.get(`http://localhost:3000/api/v1/users/${user.id}/jobapplications`)
        .then((response) => {
           dispatch({type: 'MY_JOB_APPS_SUCCESS', payload: response.data});
        })
        .catch((error) => {
           dispatch({type: 'MY_JOB_APPS_ERROR', payload: error});
        });
    };

    const AppDate = (dated) => {
        const dateString = dated;
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    useEffect(() => {
        fetchJobApplications();
    }, []);

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
                                    <p className="data-row">{job.job.title} </p>
                                </td>
                                <td>
                                    {AppDate(job.created_at)}
                                </td>
                                <td className="action">
                                    Invited for Interview
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
