import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import myProfileReducer from "../slices/myProfileSlice";
import categoryReducer from "../slices/categorySlice";
import subCategoryReducer from '../slices/subCategorySlice'

const rootReducer = combineReducers({
  auth: authReducer,
  myProfile: myProfileReducer,
  categories: categoryReducer,
  subcategories: subCategoryReducer
});

export default rootReducer;
