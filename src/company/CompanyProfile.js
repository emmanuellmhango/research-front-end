import React from "react";

const CompanyProfile = ({company}) => {
    // const company = company;
    // console.log(company);
    return (
        <div className="dashboard-user-details">
        <div className="dashboard-image">
            <picture>
                <img 
                    src="https://static.vecteezy.com/system/resources/previews/008/214/517/original/abstract-geometric-logo-or-infinity-line-logo-for-your-company-free-vector.jpg" 
                    alt="Profile Pic"
                    className="profile-image" 
                />
            </picture>
        </div>
        <div className="dashboard-username">
            <h3>Company Name</h3>
            <span>{ company.name }</span>
        </div>

        <div className="dashboard-username">
            <h3>Phone Number</h3>
            <span>{ company.phone }</span>
        </div>

        <div className="dashboard-username">
            <h3>Email</h3>
            <span>{ company.email }</span>
        </div>

        <div className="dashboard-username">
            <h3>Address</h3>
            <span>{ company.address || 'null'}</span>
        </div>

        <div className="dashboard-username">
            <h3>Website</h3>
            <span>{ company.website || 'null' }</span>
        </div>
        <br />
    </div>
    );
};

export default CompanyProfile;
