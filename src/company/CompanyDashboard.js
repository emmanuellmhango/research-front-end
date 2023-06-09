import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import CompanyProfile from "./CompanyProfile";
import Jobs from "./Jobs";
import '../dashboard/dashboard.css';

const CompanyDashboard = () => {
    const dispatch = useDispatch();
    const company = useSelector((state) => state.company.company);
    const jobs = useSelector((state) => state.jobs);

    const fetchJobs = async (id) => {
       await axios.get(`http://localhost:3000/api/v1/companies/${id}/jobs`)
       .then((response) => {
        if(response.data.success === true) {
            dispatch({ type: "GET_JOBS_SUCCESS", payload: response.data.jobs });
        }
       })
    };

    useEffect(() => {
        fetchJobs(company.id);  
    }, [company.id]);

    return (
        <div className="container">
            <br />
            <br />
            <br />
            <br />
            <div className="dashboard-container">
                <CompanyProfile company={company} />
                <div className="dashboard-contents">
                    <Jobs company={company} jobs={jobs} />
                </div>
            </div>
            <br />
        </div>
    );
};

export default CompanyDashboard;
