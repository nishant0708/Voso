import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../slicer/slicer';

const store = configureStore({
  reducer: rootReducer,
  // Other store configurations can go here, such as middleware setup
});

export default store;
