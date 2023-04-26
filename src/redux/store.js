import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../accounts/userSlice';
import biodataSlice from '../accounts/userBiodataSlice';
import experienceSlice from '../experience/experienceSlice';
import educationSlice from '../education/educationSlice';
import skillsSlice from '../userprofile/skillsSlice';

export default configureStore({
  reducer: {
    user: authReducer,
    biodata: biodataSlice,
    education: educationSlice,
    experience: experienceSlice,
    skills: skillsSlice,
  },
});
