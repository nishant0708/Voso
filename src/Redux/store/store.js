import { configureStore } from '@reduxjs/toolkit';
import topUsersSlice from '../slicer/topUsersSlice';
import month from '../slicer/monthlySlice';
import authSlicer from '../slicer/authSlice';
import login_mobileReducer from '../slicer/login_mobileSlice';
import productSlice from '../slicer/productSlice';
import usersSlice from '../slicer/userList';
import userDetailsSlice from '../slicer/userDetails';
import gallerySlicer from '../slicer/gallerySlice';
import galleryeditSlice from '../slicer/galleryeditSlice';
import updateGalleryReducer from '../slicer/updateGallerySlice';
import updateDetailsSlice from '../slicer/updateDetailsSlice';
import blogSlice from '../slicer/blogSlice';
import productEditSlice from '../slicer/productEditSlice';
import ProductDetailsUpdatedSlicer from '../slicer/ProductDetailsUpdatedSlicer';
import productFeatureSlice from '../slicer/productFeatureSlice';
import galleryfeatureSlice from '../slicer/galleryfeatureSlice';
import newsSlice from '../slicer/newsSlice';

const store = configureStore({
  reducer: {
    topUsers: topUsersSlice,
    MonthCount: month,
    auth: authSlicer,
    login_mobile: login_mobileReducer,
    usersList: usersSlice,
    userDetails: userDetailsSlice,
    Product: productSlice,
    Gallery: gallerySlicer,
    blogs: blogSlice,
    updateDetails: updateDetailsSlice,
    Editgallery: galleryeditSlice,
    updateGallery: updateGalleryReducer,
    Editproduct: productEditSlice,
    updateProdct: ProductDetailsUpdatedSlicer,
    productFeature: productFeatureSlice,
    galleryFeature: galleryfeatureSlice,
    news: newsSlice,
  },
  // Other store configurations can go here, such as middleware setup
});

export default store;
