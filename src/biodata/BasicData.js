import React from "react";
import { useNavigate } from "react-router";


const BasicData = ({biodata, user}) => {
    const navigate = useNavigate();

    const editBioData = (e) => {
        e.preventDefault();
        navigate('/editbiodata', {state: {biodata: biodata, user: user}});
    };

    return (
        <div className="dashboard-content-biodata">
            <h3 className="biodata-title">Basic Information</h3>
            <table className="table-bio-data">
            <tbody>
                <tr className="data-first-row">
                    <td className="data-width">
                        <div className="data">
                            <span className="bio-title"> DATE OF BIRTH </span>
                            <span className="data-details"> { biodata.date_of_birth || 'null' }</span>
                        </div>
                    </td>
                    <td className="data-width">
                        <div className="data">
                            <span className="bio-title"> YEARS OF EXPERIENCE </span>
                            <span className="data-details">10 years</span>
                        </div>
                    </td>    
                    <td className="data-width">
                        <div className="data">
                            <span className="bio-title"> PHONE </span>
                            <span className="data-details">{ user.phone || 'null' }</span>
                        </div>
                    </td>  
                </tr>
                <tr><td colSpan="3">&nbsp;</td></tr>
                <tr>
                    <td className="data-width">
                        <div className="data">
                            <span className="bio-title"> ADDRESS </span>
                            <span className="data-details"> { biodata.address || 'null' }</span>
                        </div>
                    </td>
                    <td className="data-width">
                        <div className="data">
                            <span className="bio-title"> LOCATION </span>
                            <span className="data-details">{ biodata.location || 'null' }</span>
                        </div>
                    </td>    
                    <td className="data-width">
                        <div className="data">
                            <span className="bio-title"> EMAIL </span>
                            <span className="data-details">{ user.email }</span>
                        </div>
                    </td>  
                </tr>  
                <tr><td colSpan="3">&nbsp;</td></tr>
                <tr className="data-edit">
                    <td colSpan="3">
                        <div className='form-group'>
                            <input type='button' value='Edit Biodata' onClick={editBioData} className='form-control-btn' />
                        </div>
                    </td>
                </tr>                      
            </tbody>
            </table>
        </div>
    );
};

export default BasicData;
