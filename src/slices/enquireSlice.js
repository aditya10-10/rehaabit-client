import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

import { enquireEndpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";

const { 
  ENQUIRE_API,
  GET_ALL_ENQUIRIES_API, 
  GET_ENQUIRY_BY_ID_API ,
  UPDATE_ENQUIRY_AND_STATUS_ASSIGNMENT_API,
  ADMIN_RESPONSE_API,
  DELETE_ENQUIRY_API,
} =enquireEndpoints;

const initialState = {
  enquiries: [],
  enquiry: null,
  selectedEnquiry: null,
  isLoading: false,
  error: null,
};

export const enquire = createAsyncThunk(
  "enquire/enquire",
  async ({ formData }, thunkAPI) => {
    try {
      const response = await apiConnector("POST", ENQUIRE_API, formData);
      toast.success("Enquiry submitted successfully");
      return response.data.data;
    } catch (error) {
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
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const getEnquiryById = createAsyncThunk(
  "enquire/getEnquiryById",
  async (id, thunkAPI) => {
    try{
      const response = await apiConnector("POST", GET_ENQUIRY_BY_ID_API, {id});
      return response.data.data;
    }catch(error){
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const updateEnquiryAndStatusAssignment = createAsyncThunk(
  "enquire/updateEnquiryAndStatusAssignment",
  async ({enquiryId, formData}, thunkAPI) => {
    try{
      const response = await apiConnector("PATCH", UPDATE_ENQUIRY_AND_STATUS_ASSIGNMENT_API, {enquiryId, ...formData});
      console.log(response);  
      toast.success("Enquiry updated successfully!");
      return response.data.data;
    }catch(error){
      const errorMessage =
        error.response?.data?.message || "Failed to update enquiry";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const adminResponse = createAsyncThunk(
  "enquire/adminResponseEnquiry",  
  async ({payload}, thunkAPI) => {
    try{
      const res = await apiConnector("PATCH", ADMIN_RESPONSE_API, payload);
      toast.success("Response added successfully!");
      return res.data.data;
    }catch(error){
      const errorMessage =
        error.response?.data?.message || "Failed to add response";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const deleteEnquiry = createAsyncThunk(
  "enquire/deleteEnquiry",
  async (id, thunkAPI) => {
    try{
      const res = await apiConnector("DELETE", DELETE_ENQUIRY_API, {
        params: {id}
      });
      return res.data.data;
    }catch(error){
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

const enquireSlice = createSlice({
  name: "enquire",
  initialState,
  reducers: {
    setSelectedEnquiry(state, action){
      state.selectedEnquiry = action.payload;
    },
  },

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
        state.error = action.error.message || 'An error occurred';
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
      })

      .addCase(getEnquiryById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiryById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.enquiry = action.payload;
      })
      .addCase(getEnquiryById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
      })

      .addCase(updateEnquiryAndStatusAssignment.pending, (state) => {
        state.isLoading = true;
      })  
      .addCase(updateEnquiryAndStatusAssignment.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedEnquiry = action.payload;
        const index = state.enquiries.findIndex(
          (enquiry) => enquiry._id === updatedEnquiry._id
        );
        if (index !== -1) state.enquiries[index] = updatedEnquiry;
        state.enquiry = updatedEnquiry;
      })
      .addCase(updateEnquiryAndStatusAssignment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
      })

      .addCase(adminResponse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminResponse.fulfilled, (state, action) => {
        state.isLoading = false;
        state.enquiry = action.payload;
        const updatedEnquiry = action.payload;
        const index = state.enquiries.findIndex(
          (enquiry) => enquiry._id === updatedEnquiry._id
        );
        if (index !== -1) state.enquiries[index] = updatedEnquiry;
        state.enquiry = updatedEnquiry;
      })
      .addCase(adminResponse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
      })

      .addCase(deleteEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.enquiries = state.enquiries.filter(
          (enquiry) => enquiry._id !== action.payload
        );
      })
      .addCase(deleteEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
      })
  },
});

export const { setSelectedEnquiry } = enquireSlice.actions;

export default enquireSlice.reducer;
