import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";
import toast from "react-hot-toast";

const { SHOW_ALL_CATEGORIES_API, CREATE_CATEGORY_API } = endpoints;

const initialState = {
  categories: [],
  error: null,
  isLoading: false,
};

export const showAllCategories = createAsyncThunk(
  "categories/showAllCategories",
  async (_, thunkAPI) => {
    try {
      const response = await apiConnector("GET", SHOW_ALL_CATEGORIES_API);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async ({ name, icon }, thunkAPI) => {
    console.log(name);
    console.log(icon);
    try {
      const response = await apiConnector("POST", CREATE_CATEGORY_API, {
        name,
        icon,
      });
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(showAllCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
      })
      .addCase(showAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
      });
  },
});

// export const {} = categorySlice.actions;
export default categorySlice.reducer;
