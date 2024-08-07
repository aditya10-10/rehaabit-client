import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import { addressEndpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";

const {
  GET_USER_ADDRESSES_API,
  DELETE_ADDRESS_API,
  UPDATE_ADDRESS_API,
  ADD_ADDRESS_API,
} = addressEndpoints;

const initialState = {
  addresses: [],
  isLoading: false,
  error: null,
};

// ADD ADDRESS
export const addAddress = createAsyncThunk(
  "address/addAddress",
  async ({ addressData }, thunkAPI) => {
    try {
      const response = await apiConnector("POST", ADD_ADDRESS_API, addressData);

      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

// GET USER ADDRESSES
export const getUserAddresses = createAsyncThunk(
  "address/getUserAddresses",
  async (_, thunkAPI) => {
    try {
      const response = await apiConnector("GET", GET_USER_ADDRESSES_API);

      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

// UPDATE ADDRESS
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ addressData }, thunkAPI) => {
    try {
      const response = await apiConnector("PUT", UPDATE_ADDRESS_API, addressData);

      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

// DELETE ADDRESS
export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async ({ addressId }, thunkAPI) => {
    try {
      const response = await apiConnector("DELETE", DELETE_ADDRESS_API, {
        addressId,
      });

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

      // ADD ADDRESS
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses.push(action.payload);

        toast.success("Address Added Successfully!")
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        toast.error("Error in Adding Address!")
      })

      // GET USER ADDRESS
      .addCase(getUserAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = action.payload;
      })
      .addCase(getUserAddresses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
      })

      // UPDATE ADDRESS
      .addCase(updateAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartServices = action.payload;

        toast.success("Address Updated Successfully!")
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        toast.error("Error in Updating Address!")
      })

      // DELETE ADDRESS
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartServices = action.payload;

        toast.success("Address Deleted Successfully!")
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        toast.error("Error in Deleting Address!")
      });
  },
});

export const {} = cartSlice.actions;

export default cartSlice.reducer;
