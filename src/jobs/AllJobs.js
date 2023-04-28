import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

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
            <h1 className="biodata-title">Current Vacancies</h1>
            <table className="table-bio-data">
            <tbody>
                {allJobs && (
                    allJobs.allJobs.map((job, index) => (
                    <>
                        <tr key={index} className="data-first-row">
                            <td>
                                <div>
                                    <h3>{job.title}</h3>
                                    <p>Position: {job.position}</p>
                                    <p>
                                        <h4>Required Skills</h4>
                                        <span>{job.needed_skills}</span>
                                    </p>
                                    <p>Closing: {job.closing_date}</p>
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
    </>
    );
};

export default AllJobs;
