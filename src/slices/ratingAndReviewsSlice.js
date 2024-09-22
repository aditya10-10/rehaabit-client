import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

import { ratingAndReviewsEndpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";

const {
  CREATE_RATING_API,
  GET_ALL_RATING_API,
  GET_AVERAGE_RATING_API,
  GET_USERS_RATING_AND_REVIEWS_WITH_USERNAME_API,
  GET_USERS_RATING_AND_REVIEWS_API,
  GET_ALL_RATING_AND_AVERAGE_API,
} = ratingAndReviewsEndpoints;

const initialState = {
  ratingAndReviews: [],
  isLoading: false,
  error: null,
};

// CREATE RATING
export const createRating = createAsyncThunk(
  "ratingAndReviews/createRating",
  async ({ rating, review, serviceId }, thunkAPI) => {
    try {
      const response = await apiConnector("POST", CREATE_RATING_API, {
        rating,
        review,
        serviceId,
      });

      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

// GET USERS RATING AND REVIEWS
export const getUsersRatingAndReviews = createAsyncThunk(
  "ratingAndReviews/getAllRatingsAndReviewsWithUserNames",
  async (_, thunkAPI) => {
    try {
      const response = await apiConnector(
        "GET",
        GET_USERS_RATING_AND_REVIEWS_API
      );

      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

// GET ALL RATING AND REVIEWS
export const getAllRatingAndReviews = createAsyncThunk(
  "ratingAndReviews/getAllRatingAndReviews",
  async (_, thunkAPI) => {
    try {
      const response = await apiConnector("GET", GET_ALL_RATING_API);

      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

// GET ALL RATING AND REVIEWS WITH USER NAMES
export const getAllRatingAndReviewsWithUserNames = createAsyncThunk(
  "ratingAndReviews/getAllRatingAndReviewsWithUserNames",
  async (_, thunkAPI) => {
    try {
      const response = await apiConnector(
        "GET",
        GET_USERS_RATING_AND_REVIEWS_WITH_USERNAME_API
      );

      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

// GET AVERAGE RATING
export const getAllRatingsAndAverage = createAsyncThunk(
  "ratingAndReviews/getAllRatingsAndAverage",
  async (_, thunkAPI) => {
    try {
      const response = await apiConnector(
        "GET",
        GET_ALL_RATING_AND_AVERAGE_API
      );

      console.log("rating avg", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

const ratingAndreviewsSlice = createSlice({
  name: "ratingAndReviews",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // CREATE RATING
      .addCase(createRating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRating.fulfilled, (state, action) => {
        state.isLoading = false;

        console.log(action.payload);

        state.ratingAndReviews.push(action.payload);

        // toast.success("OTP Send Successfully!");
      })
      .addCase(createRating.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        toast.error("Error...");
      })

      // GET USERS RATING AND REVIEWS
      .addCase(getUsersRatingAndReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsersRatingAndReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ratingAndReviews = action.payload;

        // toast.success("OTP Send Successfully!");
      })
      .addCase(getUsersRatingAndReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        toast.error("Error...");
      })

      // GET ALL RATING AND REVIEWS
      .addCase(getAllRatingAndReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRatingAndReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ratingAndReviews = action.payload;

        // toast.success("OTP Send Successfully!");
      })
      .addCase(getAllRatingAndReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        toast.error("Error...");
      })
      // GET ALL RATING AND REVIEWS WITH USER NAMES
      .addCase(getAllRatingAndReviewsWithUserNames.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllRatingAndReviewsWithUserNames.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.ratingAndReviews = action.payload;

          //   // toast.success("OTP Send Successfully!");
        }
      )
      .addCase(
        getAllRatingAndReviewsWithUserNames.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action;

          toast.error("Error...");
        }
      )
      .addCase(getAllRatingsAndAverage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRatingsAndAverage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ratingAndReviews = action.payload;
        console.log("rating avg dgdg", action.payload);

        // toast.success("OTP Send Successfully!");
      })
      .addCase(getAllRatingsAndAverage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        toast.error("Error...");
      });
  },
});

export const { clearEmailVerificationStatus } = ratingAndreviewsSlice.actions;

export default ratingAndreviewsSlice.reducer;
