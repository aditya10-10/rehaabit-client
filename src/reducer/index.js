import { combineReducers } from "@reduxjs/toolkit";

<<<<<<< HEAD
import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
})
=======
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
>>>>>>> origin/master

export default rootReducer;
