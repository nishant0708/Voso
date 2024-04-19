import { configureStore } from '@reduxjs/toolkit';
import topUsersSlice from '../slicer/slicer';
import month from "../slicer/Monthlyslicer";
import usersSlice from "../slicer/userList";

const store = configureStore({
  reducer: {
    topUsers:topUsersSlice,
    MonthCount:month,
    usersList: usersSlice,
  },
  // Other store configurations can go here, such as middleware setup
});

export default store;
