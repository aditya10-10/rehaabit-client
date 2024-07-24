import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import categoryReducer from "../slices/categorySlice";
import subCategoryReducer from '../slices/subCategorySlice'
import profileReducer from '../slices/profileSlice'
import serviceReducer from '../slices/serviceSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  categories: categoryReducer,
  subcategories: subCategoryReducer,
  profile: profileReducer,
  service: serviceReducer,
});


export default rootReducer;
