import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import "./InterviewRankings.css";

const InterviewRankings = () => {
    const location = useLocation();
    const [interviewedCandidates, setInterviewedCandidates] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    const jobId = location.state.jobId;
    const position = location.state.position;

    const fetchInterviewedCandidates = async () => {
        if (!jobId || dataFetched) return;

        const data = { job_id: jobId };
        try {
            const response = await axios.get('http://localhost:3000/api/v1/save_expressions', { params: data });
            console.log(response.data);
            if (response.data.success === true) {
                setInterviewedCandidates(response.data.job_results);
                setDataFetched(true);
            } else {
                setInterviewedCandidates([]);
                setDataFetched(true);
            }
        } catch (error) {
            setInterviewedCandidates([]);
            setDataFetched(true);
        }
    };

    const groupResultsByUser = (results) => {
        const userMap = new Map();
        results.forEach((result) => {
          const { expressions, candidate } = result;
          const { user_id } = expressions;
      
          if (!userMap.has(user_id)) {
            userMap.set(user_id, {
              first_name: candidate.first_name,
              last_name: candidate.last_name,
              email: candidate.email,
              phone: candidate.phone,
            });
          }
        });
      
        const applicantsArray = Array.from(userMap.values());
        setApplicants(applicantsArray);
    };      
    console.log(applicants);
    useEffect(() => {
        const fetchData = async () => {
            await fetchInterviewedCandidates();
        };

        fetchData();
    }, []);

    useEffect(() => {
        groupResultsByUser(interviewedCandidates);
    }, [interviewedCandidates]);

    return (
        <div className="rankings">
            <br /><br /><br />
            <h2>Interview Rankings</h2>
            <h4>Position: {position} </h4>
            {applicants && applicants.length > 0 ? (
                <table className="table-rankings">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Bio Details</th>
                            <th>Statistics</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applicants.map((applicant, i) =>
                                <tr key={i} className="applicant">
                                    <td valign="top" width="5%">{i + 1}</td>
                                    <td width="30%">
                                        {applicant.first_name} {applicant.last_name} <br />
                                        {applicant.email} <br />
                                        {applicant.phone}
                                    </td>
                                    <td width="50%">
                                        <div className="stats">
                                            <div className="stat">
                                                <div className="stat-label">Average</div>
                                                <div className="stat-value">0.00</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td width="15%">
                                        <button className="btn btn-primary">View</button>
                                    </td>
                                </tr>
                            )
                        }                       
                    </tbody>
                    </table>
                ) : (
                    <div className="no-applicants">
                        <h3>No applicants yet</h3>
                    </div>
                )
            }

        </div>
    );
};

export default InterviewRankings;
