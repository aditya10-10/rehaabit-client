import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { locationEndpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";

const { GET_LOCATION_SUGGESTIONS_API } = locationEndpoints;

const initialState = {
  locationSuggestions: [],
  error: null,
  isLoading: false,
};

export const getLocationSuggestions = createAsyncThunk(
  "location/getLocationSuggestions",
  async (query, thunkAPI) => {
    try {
      const response = await apiConnector("GET", GET_LOCATION_SUGGESTIONS_API, null, null, { query });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


const locationSlice = createSlice({
  name: "location",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getLocationSuggestions.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getLocationSuggestions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.locationSuggestions = action.payload;
    })
    .addCase(getLocationSuggestions.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      });
  },
}); 

export default locationSlice.reducer;
