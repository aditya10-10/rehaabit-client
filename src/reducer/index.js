import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import categoryReducer from "../slices/categorySlice";
import subCategoryReducer from "../slices/subCategorySlice";
import profileReducer from "../slices/profileSlice";
import serviceReducer from "../slices/serviceSlice";
import cartReducer from "../slices/cartSlice";
import addressReducer from "../slices/addressSlice";
import orderReducer from "../slices/orderSlice";
import modalReducer from "../slices/modalSlice";
import emailReducer from "../slices/emailSlice";
import contactReducer from "../slices/contactSlice";
import careersReducer from "../slices/careersSlice";
import partnerReducer from "../slices/partnerSlice";
import usersReducer from "../slices/usersSlice";
import ratingAndreviewsReducer from "../slices/ratingAndReviewsSlice";
import enquireReducer from "../slices/enquireSlice";
import sidebarReducer from "../slices/sidebarSlice";
import locationReducer from "../slices/locationSlice";
import blogReducer from "../slices/blogSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  categories: categoryReducer,
  subcategories: subCategoryReducer,
  profile: profileReducer,
  service: serviceReducer,
  cart: cartReducer,
  address: addressReducer,
  order: orderReducer,
  modal: modalReducer,
  email: emailReducer,
  partner: partnerReducer,
  contact: contactReducer,
  careers: careersReducer,
  users: usersReducer,
  ratingAndReviews: ratingAndreviewsReducer,
  enquire: enquireReducer,
  sidebar: sidebarReducer,
  location: locationReducer,
  blog: blogReducer,
});

export default rootReducer;
