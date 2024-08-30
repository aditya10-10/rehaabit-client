import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

import { contactEndpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";

const { CONTACT_API } = contactEndpoints;

const initialState = {
  isLoading: false,
  error: null,
};

export const contact = createAsyncThunk(
  "contact/contact",
  async ({ formData }, thunkAPI) => {
    try {
      const response = await apiConnector("POST", CONTACT_API, formData);

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(contact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(contact.fulfilled, (state, action) => {
        state.isLoading = false;

        // toast.success("Y Successfully!");
      })
      .addCase(contact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        // toast.error("Error in Sending OTP");
      });
  },
});

export const { clearEmailVerificationStatus } = contactSlice.actions;

export default contactSlice.reducer;
