import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Interviews.css";

const InterviewStart = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const job_id = location.state.job_id;
    const startInterview = () => {
        navigate("/interview-questions", { state: { job_id: job_id } });
    }
    return (
        <div>
            <br />
            <br />
            <div className="container-start-interview">
                <h3 className="center">Before you begin</h3>
                <table>
                    <tbody>
                        <tr>
                            <td className="center">
                                You are about to start the interview. Please make sure you are in a quiet environment and have a good internet connection. Once you begin the interview, you will not be able to pause or stop it.
                            </td>
                        </tr>
                        <tr><td>&nbsp;</td></tr>
                        <tr>
                            <td className="center">
                                Click the button below to start the interview. &nbsp;&nbsp;
                                <span className="good-luck">
                                    Good luck!
                                </span>
                            </td>
                        </tr>
                        <tr><td>&nbsp;</td></tr>
                    </tbody>
                </table>
                <br />
                <center>
                    <button className='form-control-btn applicants center make-big' onClick={startInterview}>
                        START
                    </button>
                </center>
            </div>
        </div>
    );
};

export default InterviewStart;
