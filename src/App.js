import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Header from './components/Header';
import CandidateLogin from './accounts/CandidateLogin'
import AllJobs from './jobs/AllJobs';
import Signup from './accounts/Signup';
import CandidateDashboard from './dashboard/CandidateDashboard';
import BiodataForm from './biodata/BiodataForm';
import EducationForm from './education/EducationForm';
import ExperienceForm from './experience/ExperienceForm';
import ProfileForm from './userprofile/ProfileForm';
import Choice from './accounts/Choice';
import CompanySignup from './accounts/CompanySignup';
import CompanyLogin from './accounts/CompanyLogin';
import LoginChoice from './accounts/LoginChoice';
import CompanyDashboard from './company/CompanyDashboard';
import JobForm from './company/JobForm';
import SingleJob from './jobs/SingleJob';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // user.id !== null ? 
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className='App'>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path='/' element={<AllJobs /> } />
          <Route path='/login' element={<LoginChoice />} />
          <Route path='/candidate-login' element={<CandidateLogin onLogin={handleLogin} />} />
          <Route path='/company-login' element={<CompanyLogin onLogin={handleLogin} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<CandidateDashboard />} />
          <Route path='/editbiodata' element={<BiodataForm />} />
          <Route path='/education' element={<EducationForm />} />
          <Route path='/experience' element={<ExperienceForm />} />
          <Route path='/profile' element={<ProfileForm />} />
          <Route path='/signup-as' element={<Choice />} />
          <Route path='/company-signup' element={<CompanySignup />} />
          <Route path='/company-dashboard' element={<CompanyDashboard />} />
          <Route path='/add-job' element={<JobForm />} />
          <Route path='/view-job' element={<SingleJob onLogin={handleLogin} />} />
        </Routes>
    </div>
  );
}

export default App;
