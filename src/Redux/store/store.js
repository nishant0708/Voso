import { configureStore } from '@reduxjs/toolkit';
import topUsersSlice from '../slicer/slicer';
import month from "../slicer/Monthlyslicer"

const store = configureStore({
  reducer: {
    topUsers:topUsersSlice,
    MonthCount:month

  },
  // Other store configurations can go here, such as middleware setup
});

export default store;
