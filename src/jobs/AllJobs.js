import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
import './alljobs.css';

const AllJobs = () => {
    const dispatch = useDispatch();
    const allJobs = useSelector((state) => state.allJobs);
    
    const fetchAllJobs = async () => {
        await axios.get(`http://localhost:3000/`)
        .then((response) => {
         if(response.data.success === true) {
            dispatch({ type: "GET_ALL_JOBS_SUCCESS", payload: response.data.jobs });
         }
        });
    }

    useEffect(() => {
        fetchAllJobs();  
    }, []);
 
    return (
        <>
            <br />  
            <br />  
            <br />
            <div className="dashboard-content-biodata">
            <h1 className="cur-title">Current Vacancies</h1>
            <table className="job-table">
            <tbody>
                {allJobs && (
                    allJobs.allJobs.map((job, index) => (
                        <>
                            <tr key={index} className="data-first-row-all">
                                <td>
                                    <NavLink to={{ pathname: '/view-job', search: `?jobId=${job.id}` }} className="job-link">
                                        <div>
                                            <h3>{job.title}</h3>
                                            <p className="top-up"><b>Position:</b> {job.position}</p>
                                            <p className="top-up"><b>Required Skills:</b>
                                                <span> {job.needed_skills}</span>
                                            </p>
                                            <p className="top-up"><b>Closing:</b> {job.closing_date}</p>
                                        </div>
                                    </NavLink>
                                </td>
                            </tr>
                            <tr key={index + 3000}><td>&nbsp;</td></tr>
                        </>
                    ))
                )}                    
            </tbody>
            </table>
        </div>
    </>
    );
};

export default AllJobs;
