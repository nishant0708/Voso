import { configureStore } from '@reduxjs/toolkit';
import topUsersSlice from '../slicer/slicer';
import month from "../slicer/Monthlyslicer"
import authSlicer from '../slicer/authSlicer';
import login_mobileReducer from '../slicer/login_mobileSlicer';

const store = configureStore({
  reducer: {
    topUsers:topUsersSlice,
    MonthCount:month,
    auth:authSlicer,
    login_mobile: login_mobileReducer
  },
  // Other store configurations can go here, such as middleware setup
});

export default store;
