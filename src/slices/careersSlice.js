import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { careersEndpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";
import toast from "react-hot-toast";

const {
  ADD_CANDIDATE_INFORMATION_API,
  GET_ALL_CAREERS_API,
  GET_CAREER_BY_ID_API,
  DELETE_CAREER_API,
} = careersEndpoints;

const initialState = {
  isLoading: false,
  careers: [],
  career: null,
  error: null,
};

// Thunks
// Add candidate information
export const addCandidateInformation = createAsyncThunk(
  "careers/addCandidateInformation",
  async ({ formData }, thunkAPI) => {
    try {
      console.log(formData);
      const response = await apiConnector(
        "POST",
        ADD_CANDIDATE_INFORMATION_API,
        formData,
        { "Content-Type": "multipart/form-data" }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get all careers (only for admins)
export const getAllCareers = createAsyncThunk(
  "careers/getAllCareers",
  async (_, thunkAPI) => {
    try {
      const response = await apiConnector("GET", GET_ALL_CAREERS_API);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get career by ID
export const getCareerById = createAsyncThunk(
  "careers/getCareerById",
  async (id, thunkAPI) => {
    try {
      const response = await apiConnector(
        "GET",
        `${GET_CAREER_BY_ID_API}/${id}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete career by ID (only admins)
export const deleteCareer = createAsyncThunk(
  "careers/deleteCareer",
  async (id, thunkAPI) => {
    try {
      const response = await apiConnector(
        "DELETE",
        `${DELETE_CAREER_API}/${id}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice
const careersSlice = createSlice({
  name: "careers",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Add candidate information
      .addCase(addCandidateInformation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCandidateInformation.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Your application has been submitted successfully");
      })
      .addCase(addCandidateInformation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Failed to submit your application");
      })

      // Get all careers
      .addCase(getAllCareers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCareers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.careers = action.payload;
      })
      .addCase(getAllCareers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Error fetching career submissions");
      })

      // Get career by ID
      .addCase(getCareerById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCareerById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.career = action.payload;
      })
      .addCase(getCareerById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Error fetching career submission");
      })

      // Delete career
      .addCase(deleteCareer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCareer.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remove the deleted career from the careers list
        state.careers = state.careers.filter(
          (career) => career._id !== action.meta.arg
        );
        toast.success("Career submission deleted successfully");
      })
      .addCase(deleteCareer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error("Error deleting career submission");
      });
  },
});

// Export the actions and reducer
export const {} = careersSlice.actions;
export default careersSlice.reducer;
