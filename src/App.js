import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './accounts/Login'
import Jobs from './jobs/Jobs';
import Signup from './accounts/Signup';
import Dashboard from './dashboard/Dashboard';
import BiodataForm from './biodata/BiodataForm';
import EducationForm from './education/EducationForm';
import ExperienceForm from './experience/ExperienceForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className='App'>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path='/' element={<Jobs /> } />
          <Route path='/login' element={<Login onLogin={handleLogin}/>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/editbiodata' element={<BiodataForm />} />
          <Route path='/education' element={<EducationForm />} />
          <Route path='/experience' element={<ExperienceForm />} />
        </Routes>
    </div>
  );
}

export default App;
