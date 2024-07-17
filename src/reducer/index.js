import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import myProfileReducer from "../slices/myProfileSlice";
import categoryReducer from "../slices/categorySlice";

const rootReducer = combineReducers({
  auth: authReducer,
  myProfile: myProfileReducer,
  categories: categoryReducer,
});

export default rootReducer;
