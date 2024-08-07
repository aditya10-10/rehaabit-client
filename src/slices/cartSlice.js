import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import { cartEndpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";

const {
  GET_ALL_CART_SERVICES_API,
  UPDATE_CART_API,
  REMOVE_FROM_CART_API,
  ADD_TO_CART_API,
} = cartEndpoints;

const initialState = {
  cartServices: [],
  totalQty: 0,
  totalCost: 0,
  isLoading: false,
  error: null,
};

// ADD TO CART
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ serviceData }, thunkAPI) => {
    try {
      const response = await apiConnector("POST", ADD_TO_CART_API,  serviceData );

      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

// GET ALL CART SERVICES
export const getAllCartServices = createAsyncThunk(
  "cart/getAllCartServices",
  async (_, thunkAPI) => {
    try {
      const response = await apiConnector("GET", GET_ALL_CART_SERVICES_API);

      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

// UPDATE CART
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({cartServiceId, action}, thunkAPI) => {
    try {
      const response = await apiConnector("PUT", UPDATE_CART_API, {cartServiceId, action});

      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

// REMOVE FROM CART
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({cartServiceId}, thunkAPI) => {
    try {
      const response = await apiConnector("DELETE", REMOVE_FROM_CART_API, {cartServiceId});

      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ADD TO CART
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartServices = action.payload.services;
        state.totalQty = action.payload.totalQty;
        state.totalCost = action.payload.totalCost;

        toast.success("Service Added to Cart Successfully!")
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        toast.error("Error in Adding Service to Cart")
      })

      // GET ALL CART SERVICES
      .addCase(getAllCartServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCartServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartServices = action.payload.services;
        state.totalQty = action.payload.totalQty;
        state.totalCost = action.payload.totalCost;
      })
      .addCase(getAllCartServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
      })

      // UPDATE CART
      .addCase(updateCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartServices = action.payload.services;
        state.totalQty = action.payload.totalQty;
        state.totalCost = action.payload.totalCost;

        toast.success("Cart Service Updated Successfully!")
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        toast.error("Error in Updating Cart Service to Cart")
      })

      // REMOVE FROM CART
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartServices = action.payload.services;
        state.totalQty = action.payload.totalQty;
        state.totalCost = action.payload.totalCost;

        toast.success("Service Deleted from Cart Successfully!")
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        toast.error("Error in Deleting Service from Cart")
      });
  },
});

export const {} = cartSlice.actions;

export default cartSlice.reducer;
