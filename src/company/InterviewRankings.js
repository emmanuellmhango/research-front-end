import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";

const InterviewRankings = () => {
    const location = useLocation();
    const [interviewedCandidates, setInterviewedCandidates] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const jobId = location.state.jobId;
    const position = location.state.position;

    const fetchInterviewedCandidates = async () => {
        const data = {job_id: jobId};
        try {
            const response = await axios.get('http://localhost:3000/api/v1/save_expressions', {params: data});
            console.log(response.data);
            if (response.data.success === true) {
                setInterviewedCandidates(response.data.job_results);
            } else {
                setInterviewedCandidates((prevState) => ({
                    ...prevState,
                    [jobId]: [],
                }));
            }
        } catch (error) {
            setInterviewedCandidates([]);
        }
    };

    const groupResultsByUser = (results) => {
        const resultsArray = [];
        results.forEach((result) => {
          const { user_id } = result;
          resultsArray.push(user_id);
        });
        const counter = Array.from(new Set(resultsArray));
        setApplicants(counter);
    };

    useEffect(() => {
        fetchInterviewedCandidates();
        groupResultsByUser(interviewedCandidates);
    }, []);

    return (
        <div>
            <br /><br /><br />
            <h2>Interview Rankings</h2>
            <h4>Position: {position} </h4>
            {applicants && applicants.length > 0 ? (
                <table className="table-applicants">
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
                                    <td>{i + 1}</td>
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
