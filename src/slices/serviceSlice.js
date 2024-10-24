import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serviceEndpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";
import Swal from "sweetalert2";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const {
  CREATE_SERVICE_API,
  GET_ALL_SERVICES_API,
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
  GET_SERVICE_RATING_AND_REVIEWS_API,
  GET_TOTAL_SERVICES_COUNT_API,
} = serviceEndpoints;

const initialState = {
  service: [],
  serviceDetails: [],
  serviceRatingAndReviews: [],
  allServices: [],
  faqs: [],
  serviceId: null,
  isLoading: false,
  error: null,
  currentStep: 0,
  isMyServiceEditing: false,
  totalServicesCount: 0, // Add this line
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
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const getAllServices = createAsyncThunk(
  "service/getAllServices",
  async (_, thunkAPI) => {
    try {
      const response = await apiConnector("GET", GET_ALL_SERVICES_API);
      return response.data.data;
    } catch (error) {
      // console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const getFullServiceDetails = createAsyncThunk(
  "service/getFullServiceDetails",
  async ({ serviceId }, thunkAPI) => {
    try {
      const response = await apiConnector(
        "POST",
        GET_FULL_SERVICE_DETAILS_API,
        { serviceId }
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const getServiceRatingAndReviews = createAsyncThunk(
  "service/getServiceRatingAndReviews",
  async ({ serviceId, page }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/getServiceRatingAndReviews?serviceId=${serviceId}&page=${page}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const editService = createAsyncThunk(
  "service/editService",
  async ({ formData }, thunkAPI) => {
    try {
      const response = await apiConnector("PUT", EDIT_SERVICE_API, formData, {
        "Content-Type": "multipart/form-data",
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const deleteService = createAsyncThunk(
  "service/deleteService",
  async ({ serviceId, subCategoryId }, thunkAPI) => {
    try {
      const response = await apiConnector("DELETE", DELETE_SERVICE_API, {
        serviceId,
        subCategoryId,
      });
      // console.log(response.data);
      return response.data.data;
    } catch (error) {
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
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const updateInclude = createAsyncThunk(
  "service/updateInclude",
  async ({ id, serviceId, content }, thunkAPI) => {
    try {
      const response = await apiConnector("PUT", UPDATE_INCLUDE_API, {
        id,
        serviceId,
        content,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const deleteInclude = createAsyncThunk(
  "service/deleteInclude",
  async ({ id, serviceId }, thunkAPI) => {
    try {
      const response = await apiConnector("DELETE", DELETE_INCLUDE_API, {
        id,
        serviceId,
      });
      return response.data.data;
    } catch (error) {
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
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const updateExclude = createAsyncThunk(
  "service/updateExclude",
  async ({ id, serviceId, content }, thunkAPI) => {
    try {
      const response = await apiConnector("PUT", UPDATE_EXCLUDE_API, {
        id,
        serviceId,
        content,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const deleteExclude = createAsyncThunk(
  "service/deleteExclude",
  async ({ id, serviceId }, thunkAPI) => {
    try {
      const response = await apiConnector("DELETE", DELETE_EXCLUDE_API, {
        id,
        serviceId,
      });
      return response.data.data;
    } catch (error) {
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
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const updateFAQ = createAsyncThunk(
  "service/updateFAQ",
  async ({ id, serviceId, question, answer }, thunkAPI) => {
    try {
      const response = await apiConnector("PUT", UPDATE_FAQ_API, {
        id,
        serviceId,
        question,
        answer,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const deleteFAQ = createAsyncThunk(
  "service/deleteFAQ",
  async ({ id, serviceId }, thunkAPI) => {
    try {
      const response = await apiConnector("DELETE", DELETE_FAQ_API, {
        id,
        serviceId,
      });
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const getAllFAQs = createAsyncThunk(
  "service/getAllFAQs",
  async (_, thunkAPI) => {
    try {
      const response = await apiConnector("GET", GET_FAQ_API);
      return response.data;
    } catch (error) {
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
        formData,
        {
          "Content-Type": "multipart/form-data",
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const updateHowDoesItWorks = createAsyncThunk(
  "service/updateHowDoesItWorks",
  async ({ id, serviceId, point, description, icon }, thunkAPI) => {
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_HOW_DOES_IT_WORKS_API,
        {
          id,
          serviceId,
          point,
          description,
          icon,
        },
        { "Content-Type": "multipart/form-data" }
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const deleteHowDoesItWorks = createAsyncThunk(
  "service/deleteHowDoesItWorks",
  async ({ id, serviceId }, thunkAPI) => {
    try {
      const response = await apiConnector(
        "DELETE",
        DELETE_HOW_DOES_IT_WORKS_API,
        { id, serviceId }
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const getTotalServicesCount = createAsyncThunk(
  "service/getTotalServicesCount",
  async (_, thunkAPI) => {
    try {
      const response = await apiConnector("GET", GET_TOTAL_SERVICES_COUNT_API);
      // console.log("total servies api ", response.data);

      return response.data;
    } catch (error) {
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
    clearServiceForm: (state) => {
      state.service = [];
      state.serviceId = null;
      state.currentStep = 0;
    },
    setServiceEditing: (state) => {
      state.isMyServiceEditing = true;
    },
    clearService: (state) => {
      state.service = [];
      state.serviceId = null;
      state.currentStep = 0;
    },
  },

  extraReducers: (builder) => {
    builder

      // CREATE SERVICE
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
        state.serviceId = action.payload.service._id;
      })
      .addCase(createService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        Swal.fire({
          title: "Error in Creating Service!",
          icon: "error",
        });
      })

      // GET ALL SERVICES
      .addCase(getAllServices.pending, (state) => {
        state.isLoading = true;

        // Swal.showLoading()
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        state.allServices = action.payload;
        state.isLoading = false;

        // Swal.fire({
        //   title: "Service Created!",
        //   icon: "success",
        // });
      })
      .addCase(getAllServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        // Swal.fire({
        //   title: "Error in Creating Service!",
        //   icon: "error",
        // });
      })

      // GET FULL SERVICE DETAILS
      .addCase(getFullServiceDetails.pending, (state) => {
        state.isLoading = true;

        // Swal.showLoading()
      })
      .addCase(getFullServiceDetails.fulfilled, (state, action) => {
        state.service = action.payload;
        state.serviceId = action.payload._id;
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

      // GET SERVICE RATING AND REVIEWS
      .addCase(getServiceRatingAndReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getServiceRatingAndReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(action.payload)) {
          state.serviceRatingAndReviews = [
            ...state.serviceRatingAndReviews,
            ...action.payload,
          ];
        } else if (action.payload) {
          state.serviceRatingAndReviews = [
            ...state.serviceRatingAndReviews,
            action.payload,
          ];
        } else {
          console.error('Received unexpected data format:', action.payload);
        }
        console.log(state.serviceRatingAndReviews);
      })
      .addCase(getServiceRatingAndReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Edit Service
      .addCase(editService.pending, (state) => {
        state.isLoading = true;
        Swal.showLoading();
      })
      .addCase(editService.fulfilled, (state, action) => {
        state.allServices = state.allServices.map((service) =>
          service._id === action.payload._id ? action.payload : service
        );

        state.isLoading = false;
        Swal.fire({
          title: "Service Updated!",
          icon: "success",
        });
      })
      .addCase(editService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        Swal.fire({
          title: "Error in Updating Service!",
          icon: "error",
        });
      })

      // Delete Service
      .addCase(deleteService.pending, (state) => {
        state.isLoading = true;
        Swal.showLoading();
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.allServices = state.allServices.filter(
          (service) => service._id !== action.payload._id
        );
        state.isLoading = false;

        // Swal.fire({
        //   title: "Service Deleted!",
        //   icon: "success",
        // });
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        Swal.fire({
          title: "Error in Deleting Service!",
          icon: "error",
        });
      })

      // CREATE INCLUDE
      .addCase(createInclude.pending, (state) => {
        state.isLoading = true;

        // Swal.showLoading();
      })
      .addCase(createInclude.fulfilled, (state, action) => {
        state.service.includes = action.payload.service.includes;
        state.isLoading = false;

        // Swal.fire({
        //   title: "Include Created!",
        //   icon: "success",
        // });
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

      // UPDATE INCLUDE
      .addCase(updateInclude.pending, (state) => {
        state.isLoading = true;

        // Swal.showLoading();
      })
      .addCase(updateInclude.fulfilled, (state, action) => {
        state.service.includes = action.payload.includes;
        state.isLoading = false;

        // Swal.fire({
        //   title: "Include Updated!",
        //   icon: "success",
        // });
        // state.currentStep += 1;
      })
      .addCase(updateInclude.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        Swal.fire({
          title: "Error in Updating Include!",
          icon: "error",
        });
      })

      // DELETE INCLUDE
      .addCase(deleteInclude.pending, (state) => {
        state.isLoading = true;

        // Swal.showLoading();
      })
      .addCase(deleteInclude.fulfilled, (state, action) => {
        state.service.includes = action.payload.includes;
        state.isLoading = false;

        // Swal.fire({
        //   title: "Include Deleted!",
        //   icon: "success",
        // });
        // state.currentStep += 1;
      })
      .addCase(deleteInclude.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        Swal.fire({
          title: "Error in Deleting Include!",
          icon: "error",
        });
      })

      //CREATE EXCLUDE
      .addCase(createExclude.pending, (state) => {
        state.isLoading = true;

        // Swal.showLoading();
      })
      .addCase(createExclude.fulfilled, (state, action) => {
        state.service.excludes = action.payload.service.excludes;
        state.isLoading = false;

        // Swal.fire({
        //   title: "Exclude Created!",
        //   icon: "success",
        // });
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

      // UPDATE EXCLUDE
      .addCase(updateExclude.pending, (state) => {
        state.isLoading = true;

        // Swal.showLoading();
      })
      .addCase(updateExclude.fulfilled, (state, action) => {
        state.service.excludes = action.payload.excludes;
        state.isLoading = false;

        // Swal.fire({
        //   title: "Exclude Updated!",
        //   icon: "success",
        // });
        // state.currentStep += 1;
      })
      .addCase(updateExclude.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        Swal.fire({
          title: "Error in Updating Exclude!",
          icon: "error",
        });
      })

      // DELETE EXCLUDE
      .addCase(deleteExclude.pending, (state) => {
        state.isLoading = true;

        // Swal.showLoading();
      })
      .addCase(deleteExclude.fulfilled, (state, action) => {
        state.service.excludes = action.payload.excludes;
        state.isLoading = false;

        // Swal.fire({
        //   title: "Exclude Deleted!",
        //   icon: "success",
        // });
        // state.currentStep += 1;
      })
      .addCase(deleteExclude.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        Swal.fire({
          title: "Error in Deleting Exclude!",
          icon: "error",
        });
      })

      // CREATE FAQ
      .addCase(createFAQ.pending, (state) => {
        state.isLoading = true;

        // Swal.showLoading();
      })
      .addCase(createFAQ.fulfilled, (state, action) => {
        state.service.faqs = action.payload.service.faqs;
        state.isLoading = false;

        // Swal.fire({
        //   title: "FAQ Created!",
        //   icon: "success",
        // });
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

      // UPDATE FAQ
      .addCase(updateFAQ.pending, (state) => {
        state.isLoading = true;
        // Swal.showLoading();
      })
      .addCase(updateFAQ.fulfilled, (state, action) => {
        state.service.faqs = action.payload.faqs;
        state.isLoading = false;
        // Swal.fire({
        //   title: "FAQ Updated!",
        //   icon: "success",
        // });
      })
      .addCase(updateFAQ.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        Swal.fire({
          title: "Error in Updating FAQ!",
          icon: "error",
        });
      })

      // Delete FAQ
      .addCase(deleteFAQ.pending, (state) => {
        state.isLoading = true;
        // Swal.showLoading();
      })
      .addCase(deleteFAQ.fulfilled, (state, action) => {
        state.service.faqs = action.payload.faqs;
        state.isLoading = false;
        // Swal.fire({
        //   title: "FAQ Deleted!",
        //   icon: "success",
        // });
      })
      .addCase(deleteFAQ.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        Swal.fire({
          title: "Error in Deleting FAQ!",
          icon: "error",
        });
      })

      // Get FAQ
      .addCase(getAllFAQs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFAQs.fulfilled, (state, action) => {
        if (state.service.faqs) state.service.faqs = action.payload.faqs;
        state.faqs = action.payload.faqs;
        state.isLoading = false;
      })
      .addCase(getAllFAQs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
      })

      // CREATE HOW DOES IT WORKS
      .addCase(createHowDoesItWorks.pending, (state) => {
        state.isLoading = true;

        // Swal.showLoading();
      })
      .addCase(createHowDoesItWorks.fulfilled, (state, action) => {
        state.service.howDoesItWorks = action.payload.service.howDoesItWorks;
        state.isLoading = false;

        // Swal.fire({
        //   title: "How Does It Works Created!",
        //   icon: "success",
        // });
        // state.currentStep += 1;
      })
      .addCase(createHowDoesItWorks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        Swal.fire({
          title: "Error in Creating How Does It Works!",
          icon: "error",
        });
      })

      // Update How Does It Works
      .addCase(updateHowDoesItWorks.pending, (state) => {
        state.isLoading = true;
        // Swal.showLoading();
      })
      .addCase(updateHowDoesItWorks.fulfilled, (state, action) => {
        state.service.howDoesItWorks = action.payload.howDoesItWorks;
        state.isLoading = false;
        // Swal.fire({
        //   title: "How Does It Works Updated!",
        //   icon: "success",
        // });
      })
      .addCase(updateHowDoesItWorks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        Swal.fire({
          title: "Error in Updating How Does It Works!",
          icon: "error",
        });
      })

      // Delete How Does It Works
      .addCase(deleteHowDoesItWorks.pending, (state) => {
        state.isLoading = true;
        // Swal.showLoading();
      })
      .addCase(deleteHowDoesItWorks.fulfilled, (state, action) => {
        state.service.howDoesItWorks = action.payload.howDoesItWorks;
        state.isLoading = false;
        // Swal.fire({
        //   title: "How Does It Works Deleted!",
        //   icon: "success",
        // });
      })
      .addCase(deleteHowDoesItWorks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        Swal.fire({
          title: "Error in Deleting How Does It Works!",
          icon: "error",
        });
      })
      .addCase(getTotalServicesCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTotalServicesCount.fulfilled, (state, action) => {
        state.totalServicesCount = action.payload.totalServices;
        state.isLoading = false;
      })
      .addCase(getTotalServicesCount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
      });
  },
});

export const { nextStep, previousStep, clearServiceForm, setServiceEditing, clearService } =
  serviceSlice.actions;

export default serviceSlice.reducer;
