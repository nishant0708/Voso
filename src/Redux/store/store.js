import { configureStore } from '@reduxjs/toolkit';
import topUsersSlice from '../slicer/slicer';
<<<<<<< HEAD
import month from "../slicer/Monthlyslicer"
import authSlicer from '../slicer/authSlicer';
import login_mobileReducer from '../slicer/login_mobileSlicer';
=======
import month from "../slicer/Monthlyslicer";
import usersSlice from "../slicer/userList";
>>>>>>> origin/shivanshu

const store = configureStore({
  reducer: {
    topUsers:topUsersSlice,
    MonthCount:month,
<<<<<<< HEAD
    auth:authSlicer,
    login_mobile: login_mobileReducer
=======
    usersList: usersSlice,
>>>>>>> origin/shivanshu
  },
  // Other store configurations can go here, such as middleware setup
});

export default store;
