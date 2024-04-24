import { configureStore } from '@reduxjs/toolkit';
import topUsersSlice from '../slicer/topUsersSlice';
import month from "../slicer/monthlySlice"
import authSlicer from '../slicer/authSlice';
import login_mobileReducer from '../slicer/login_mobileSlice';
import productSlice from '../slicer/productSlice';
import usersSlice from "../slicer/userList";
import userDetailsSlice from '../slicer/userDetails';
import gallerySlicer from '../slicer/gallerySlice';
import galleryeditSlice from '../slicer/galleryeditSlice';
import GalleryEdit from '../../components/Gallery_table/Gallery_edit';
import updateGalleryReducer from '../slicer/updateGallerySlice';


const store = configureStore({
  reducer: {
    topUsers:topUsersSlice,
    MonthCount:month,
    auth:authSlicer,
    login_mobile: login_mobileReducer,
    usersList: usersSlice,
    userDetails: userDetailsSlice,
    Product:productSlice,
    Gallery:gallerySlicer,
    Editgallery:galleryeditSlice,
    updateGallery: updateGalleryReducer,
  },
  // Other store configurations can go here, such as middleware setup
});

export default store;
