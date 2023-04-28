import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../accounts/userSlice';
import biodataSlice from '../accounts/userBiodataSlice';
import experienceSlice from '../experience/experienceSlice';
import educationSlice from '../education/educationSlice';
import skillsSlice from '../userprofile/skillsSlice';
import profileSlice from '../userprofile/profileSlice';
import companySlice from '../company/companySlice';
import jobSlice from '../company/jobSlice';
import allJobsSlice from '../jobs/allJobsSlice';

export default configureStore({
  reducer: {
    user: authReducer,
    biodata: biodataSlice,
    education: educationSlice,
    experience: experienceSlice,
    skills: skillsSlice,
    profile: profileSlice,
    company: companySlice,
    jobs: jobSlice,
    allJobs: allJobsSlice,
  },
});
