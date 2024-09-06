import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

import { enquireEndpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";

const { ENQUIRE_API, GET_ALL_ENQUIRIES_API, GET_ENQUIRY_BY_ID_API } =
  enquireEndpoints;

const initialState = {
  enquiries: [],
  isLoading: false,
  error: null,
};

export const enquire = createAsyncThunk(
  "enquire/enquire",
  async ({ formData }, thunkAPI) => {
    try {
      const response = await apiConnector("POST", ENQUIRE_API, formData);

      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const getAllEnquiries = createAsyncThunk(
  "enquire/getAllEnquiries",
  async (_, thunkAPI) => {
    try {
      const response = await apiConnector("GET", GET_ALL_ENQUIRIES_API);

      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

const enquireSlice = createSlice({
  name: "enquire",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(enquire.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(enquire.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(enquire.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
      })

      .addCase(getAllEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.enquiries = action.payload;
      })
      .addCase(getAllEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
      });
  },
});

export const {} = enquireSlice.actions;

export default enquireSlice.reducer;
