import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

function SingleJob() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const job = useSelector((state) => state.singleJob.singleJob);
    const user = useSelector((state) => state.user.user);
    const searchParams = new URLSearchParams(location.search);
    const jobID = searchParams.get('jobId');

    const fetchJob = async () => {
        await axios.get(`http://localhost:3000/api/v1/jobs/${jobID}`)
        .then((response) => {
            dispatch({ type: "SINGLE_JOB_SUCCESS", payload: response.data });
        });
    }

    useEffect(() => {
        fetchJob();  
    }, []);

    const handleApply = (e) => {
        e.preventDefault();
        if(user.id !== undefined || user.id !== null){
            alert('You have successfully applied to this post');
            navigate('/');
        } else {
            alert('Login first to proceed...');
            navigate('/candidate-login');
        }
    };

    return (
        <>
            <br />
            <br />
            <div className="dashboard-content-biodata">
            <div className="job-table">
                <h1 className="cur-title">{job.title}</h1>
                <button onClick={handleApply} className="form-control-btn">Apply</button>
            </div>
            <table className="job-table">
            <tbody>
                <tr>
                    <td>
                        <div>
                            <h4>Position:</h4> 
                            <p className="top-up">{job.position}</p>
                            <h4>Required Skills:</h4>
                            <p className="top-up">
                                <span> 
                                {job.needed_skills.split(',').map((skill, index) => {
                                            return (<span key={index} className="skill">{skill}</span>);
                                        }
                                    )}
                                </span>
                            </p>
                            <h4>Description</h4> 
                            <p>
                                <span>{job.description}</span>
                            </p>
                            <p className="top-up"><b>Closing:</b> {job.closing_date}</p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button onClick={handleApply} className="form-control-btn">Apply</button>
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
        </>
    ); 
}

export default SingleJob;
