import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

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
  filteredDefaultAddress: null,
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
      return thunkAPI.rejectWithValue(error.response.data);
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
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// UPDATE ADDRESS
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ addressData }, thunkAPI) => {
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_ADDRESS_API,
        addressData
      );

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
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
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    clearAddresses: (state, action) => {
      state.addresses = [];
      state.filteredDefaultAddress = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ADD ADDRESS
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses.push(action.payload);

        state.filteredDefaultAddress = state.addresses.filter(
          (address) => address.status === "Default"
        );

        toast.success("Address Added Successfully!");
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        toast.error((action.payload)?.message||"Error in Adding Address!");
      })

      // GET USER ADDRESS
      .addCase(getUserAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = action.payload;
        state.filteredDefaultAddress = state.addresses.filter(
          (address) => address.status === "Default"
        );
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
        state.addresses = state.addresses.map((address) =>
          address._id === action.payload._id ? action.payload : address
        );

        state.filteredDefaultAddress = state.addresses.filter(
          (address) => address.status === "Default"
        );

        toast.success("Address Updated Successfully!");
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        toast.error((action.payload)?.message||"Error in Updating Address!");
      })

      // DELETE ADDRESS
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addresses = state.addresses.filter(
          (address) => address._id !== action.payload._id
        );

        state.filteredDefaultAddress = state.addresses.filter(
          (address) => address.status === "Default"
        );

        toast.success("Address Deleted Successfully!");
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        toast.error((action.payload)?.message||"Error in Deleting Address!");
      });
  },
});

export const { clearAddresses } = addressSlice.actions;

export default addressSlice.reducer;
