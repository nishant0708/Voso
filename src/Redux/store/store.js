import { configureStore } from '@reduxjs/toolkit';
import topUsersSlice from '../slicer/slicer';
import month from "../slicer/Monthlyslicer";
import usersSlice from "../slicer/userList";
import userDetailsSlice from '../slicer/userDetails';
import enquiriesListSlice from '../slicer/enquiriesList';

const store = configureStore({
  reducer: {
    topUsers:topUsersSlice,
    MonthCount:month,
    usersList: usersSlice,
    userDetails: userDetailsSlice,
    enquiriesList: enquiriesListSlice,
  },
  // Other store configurations can go here, such as middleware setup
});

export default store;
