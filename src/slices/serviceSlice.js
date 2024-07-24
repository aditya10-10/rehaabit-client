import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serviceEndpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";
import Swal from "sweetalert2";

const {
  CREATE_SERVICE_API,
  GET_FULL_SERVICE_DETAILS_API,
  EDIT_SERVICE_API,
  DELETE_SERVICE_API,
  CREATE_INCLUDE_API,
  DELETE_INCLUDE_API,
  UPDATE_INCLUDE_API,
  CREATE_EXCLUDE_API,
  DELETE_EXCLUDE_API,
  UPDATE_EXCLUDE_API,
  CREATE_FAQ_API,
  UPDATE_FAQ_API,
  GET_FAQ_API,
  DELETE_FAQ_API,
  CREATE_HOW_DOES_IT_WORKS_API,
  DELETE_HOW_DOES_IT_WORKS_API,
  UPDATE_HOW_DOES_IT_WORKS_API,
} = serviceEndpoints;

const initialState = {
  service: [],
  serviceDetails: [],
  serviceId: null,
  isLoading: false,
  error: null,
  currentStep: 0,
};

// SERVICE
export const createService = createAsyncThunk(
  "service/createService",
  async ({ formData }, thunkAPI) => {
    try {
      const response = await apiConnector(
        "POST",
        CREATE_SERVICE_API,
        formData,
        { "Content-Type": "multipart/form-data" }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const getFullServiceDetails = createAsyncThunk(
  "service/getFullServiceDetails",
  async ({ formData }, thunkAPI) => {
    try {
      const response = await apiConnector(
        "GET",
        GET_FULL_SERVICE_DETAILS_API,
        formData,
        { "Content-Type": "multipart/form-data" }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

// INCLUDE
export const createInclude = createAsyncThunk(
  "service/createInclude",
  async ({ formData }, thunkAPI) => {
    try {
      const response = await apiConnector("POST", CREATE_INCLUDE_API, formData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

// EXCLUDE
export const createExclude = createAsyncThunk(
  "service/createExclude",
  async ({ formData }, thunkAPI) => {
    try {
      const response = await apiConnector("POST", CREATE_EXCLUDE_API, formData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

// FAQ
export const createFAQ = createAsyncThunk(
  "service/createFAQ",
  async ({ formData }, thunkAPI) => {
    try {
      const response = await apiConnector("POST", CREATE_FAQ_API, formData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

// HOW DOES IT WORKS
export const createHowDoesItWorks = createAsyncThunk(
  "service/createHowDoesItWorks",
  async ({ formData }, thunkAPI) => {
    try {
      const response = await apiConnector(
        "POST",
        CREATE_HOW_DOES_IT_WORKS_API,
        formData
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
    },
    previousStep: (state) => {
      state.currentStep -= 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createService.pending, (state) => {
        state.isLoading = true;

        Swal.showLoading();
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.service = action.payload.service;
        state.isLoading = false;

        Swal.fire({
          title: "Service Created!",
          icon: "success",
        });
        // state.currentStep += 1;
        state.serviceId = action.payload.service._id
      })
      .addCase(createService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        Swal.fire({
          title: "Error in Creating Service!",
          icon: "error",
        });
      })
      .addCase(getFullServiceDetails.pending, (state) => {
        state.isLoading = true;

        // Swal.showLoading()
      })
      .addCase(getFullServiceDetails.fulfilled, (state, action) => {
        state.service = action.payload;
        state.isLoading = false;

        // Swal.fire({
        //   title: "Service Created!",
        //   icon: "success",
        // });
      })
      .addCase(getFullServiceDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        // Swal.fire({
        //   title: "Error in Creating Service!",
        //   icon: "error",
        // });
      })
      .addCase(createInclude.pending, (state) => {
        state.isLoading = true;

        Swal.showLoading();
      })
      .addCase(createInclude.fulfilled, (state, action) => {
        state.service.includes = action.payload.service.includes;
        state.isLoading = false;

        Swal.fire({
          title: "Include Created!",
          icon: "success",
        });
        // state.currentStep += 1;
      })
      .addCase(createInclude.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        Swal.fire({
          title: "Error in Creating Include!",
          icon: "error",
        });
      })
      .addCase(createExclude.pending, (state) => {
        state.isLoading = true;

        Swal.showLoading();
      })
      .addCase(createExclude.fulfilled, (state, action) => {
        state.service.excludes = action.payload.service.excludes;
        state.isLoading = false;

        Swal.fire({
          title: "Exclude Created!",
          icon: "success",
        });
        // state.currentStep += 1;
      })
      .addCase(createExclude.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        Swal.fire({
          title: "Error in Creating Exclude!",
          icon: "error",
        });
      })
      .addCase(createFAQ.pending, (state) => {
        state.isLoading = true;

        Swal.showLoading();
      })
      .addCase(createFAQ.fulfilled, (state, action) => {
        state.service.faqs = action.payload.service.faqs;
        state.isLoading = false;

        Swal.fire({
          title: "FAQ Created!",
          icon: "success",
        });
        // state.currentStep += 1;
      })
      .addCase(createFAQ.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        Swal.fire({
          title: "Error in Creating FAQ!",
          icon: "error",
        });
      })
      .addCase(createHowDoesItWorks.pending, (state) => {
        state.isLoading = true;

        Swal.showLoading();
      })
      .addCase(createHowDoesItWorks.fulfilled, (state, action) => {
        state.service.howDoesItWorks = action.payload.service.howDoesItWorks;
        state.isLoading = false;

        Swal.fire({
          title: "How Does It Works Created!",
          icon: "success",
        });
        // state.currentStep += 1;
      })
      .addCase(createHowDoesItWorks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        Swal.fire({
          title: "Error in Creating How Does It Works!",
          icon: "error",
        });
      });
  },
});

export const {nextStep, previousStep} = serviceSlice.actions;

export default serviceSlice.reducer;
