import React from "react";
import { useNavigate } from "react-router-dom";
import "./Interviews.css"

const NextStep = () => {
    const navigate = useNavigate();

    const finishInterview = () => {
        navigate("/dashboard");
    }

    return (
        <div>
            <br />
            <br />
            <div className="container-start-interview">
                <h3 className="center">What Next?</h3>
                <table className="final-table">
                    <tbody>
                        <tr>
                            <td className="center">
                                You have finalized your interview. You will be notified of the results soon.
                            </td>
                        </tr>
                        <tr><td>&nbsp;</td></tr>
                        <tr>
                            <td className="center">
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
                    <button className='form-control-btn applicants center make-big' onClick={finishInterview}>
                        CLOSE
                    </button>
                </center>
            </div>
        </div>
    );
    
};

export default NextStep;
