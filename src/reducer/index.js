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
});

export default rootReducer;
