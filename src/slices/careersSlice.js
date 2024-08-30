import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { careersEndpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";
import toast from "react-hot-toast";

const { ADD_CANDIDATE_INFORMATION_API } = careersEndpoints;

const initialState = {
  isLoading: false,
  error: null,
};

export const addCandidateInformation = createAsyncThunk(
  "careers/addCandidateInformation",
  async ({ formData }, thunkAPI) => {
    try {
      const response = await apiConnector(
        "POST",
        ADD_CANDIDATE_INFORMATION_API,
        formData,
        { "Content-Type": "multipart/form-data" }
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

// export const getAllPartners = createAsyncThunk(
//   "partner/getAllPartners",
//   async (_, thunkAPI) => {
//     try {
//       const response = await apiConnector("GET", GET_ALL_PARTNERS_API);

//       return response.data.data;
//     } catch (error) {
//       console.log(error);
//       return thunkAPI.rejectWithValue(error.message.data);
//     }
//   }
// );

const careersSlice = createSlice({
  name: "careers",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addCandidateInformation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCandidateInformation.fulfilled, (state, action) => {
        state.isLoading = false;

        toast.success("Your Application sent successfully");
      })
      .addCase(addCandidateInformation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        toast.error("Error in sending your Application");
      });

    //   .addCase(getAllPartners.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(getAllPartners.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.partners = action.payload;

    //     // toast.success("Partner information added successfully");
    //   })
    //   .addCase(getAllPartners.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action;

    //     // toast.error("Error adding partner information");
    //   });
  },
});

export const {} = careersSlice.actions;
export default careersSlice.reducer;
