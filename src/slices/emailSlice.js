import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import { emailEndpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";

const { SEND_EMAIL_OTP_API, VERIFY_EMAIL_OTP_API } = emailEndpoints;

const initialState = {
  emailVerified: false,
  isLoading: false,
  error: null,
};

// SEND EMAIL OTP
export const sendEmailOTP = createAsyncThunk(
  "email/sendEmailOTP",
  async ({ email }, thunkAPI) => {
    try {
      const response = await apiConnector("POST", SEND_EMAIL_OTP_API, {
        email,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

// VERIFY EMAIL OTP
export const verifyEmailOTP = createAsyncThunk(
  "email/verifyEmailOTP",
  async ({ otp, email }, thunkAPI) => {
    try {
      const response = await apiConnector("POST", VERIFY_EMAIL_OTP_API, {
        otp,
        email,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    clearEmailVerificationStatus: (state, action) => {
      state.emailVerified = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // SEND EMAIL OTP
      .addCase(sendEmailOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendEmailOTP.fulfilled, (state, action) => {
        state.isLoading = false;

        toast.success("OTP Send Successfully!");
      })
      .addCase(sendEmailOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        toast.error("Error in Sending OTP");
      })

      // VERIFY EMAIL OTP
      .addCase(verifyEmailOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyEmailOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.emailVerified = true;

        toast.success("OTP Verified Successfully!");
      })
      .addCase(verifyEmailOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        toast.error("OTP Couldn't Verify");
      });
  },
});

export const { clearEmailVerificationStatus } = emailSlice.actions;

export default emailSlice.reducer;
