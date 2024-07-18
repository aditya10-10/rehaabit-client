import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";
import toast from "react-hot-toast";

const {
  SHOW_ALL_CATEGORIES_API,
  CREATE_CATEGORY_API,
  DELETE_CATEGORY_API,
  UPDATE_CATEGORY_NAME_API,
  UPDATE_CATEGORY_ICON_API,
} = endpoints;

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
    try {
      const response = await apiConnector(
        "POST",
        CREATE_CATEGORY_API,
        { name, icon },
        { "Content-Type": "multipart/form-data" }
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId, thunkAPI) => {
    try {
      const response = await apiConnector("DELETE", DELETE_CATEGORY_API, {
        categoryId,
      });
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const updateCategoryName = createAsyncThunk(
  "categories/updateCategoryName",
  async ({ categoryId, name }, thunkAPI) => {
    try {
      const response = await apiConnector("PUT", UPDATE_CATEGORY_NAME_API, {
        categoryId,
        name,
      });
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const updateCategoryIcon = createAsyncThunk(
  "categories/updateCategoryIcon",
  async ({ categoryId, icon }, thunkAPI) => {
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_CATEGORY_ICON_API,
        {
          categoryId,
          icon,
        },
        { "Content-Type": "multipart/form-data" }
      );
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
        // toast.loading("Loading...");
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
        state.isLoading = false;
        toast.success("New Category Created");
        // toast.dismiss();
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        toast.error("Error in Creating New Category");
        // toast.dismiss();
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        // toast.loading("Loading...");
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        console.log(action.meta.arg);
        state.categories = state.categories.filter(
          (category) => category._id !== action.meta.arg
        );
        state.isLoading = false;
        toast.error("Category Deleted");
        // toast.dismiss();
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        toast.error("Error in Deleting Category");
        // toast.dismiss();
      })
      .addCase(updateCategoryName.pending, (state) => {
        state.isLoading = true;
        // toast.loading("Loading...");
      })
      .addCase(updateCategoryName.fulfilled, (state, action) => {
        state.categories = state.categories.map((category) =>
          category._id === action.payload._id ? action.payload : category
        );

        state.isLoading = false;
        toast.success("Category Name Updated");
        // toast.dismiss();
      })
      .addCase(updateCategoryName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        toast.error("Error in Updating Category Name");
        // toast.dismiss();
      })
      .addCase(updateCategoryIcon.pending, (state) => {
        state.isLoading = true;
        // toast.loading("Loading...");
      })
      .addCase(updateCategoryIcon.fulfilled, (state, action) => {
        state.categories = state.categories.map((category) =>
          category._id === action.payload._id ? action.payload : category
        );

        state.isLoading = false;
        toast.success("Category Icon Updated");
        // toast.dismiss();
      })
      .addCase(updateCategoryIcon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        toast.error("Error in Updating Category Icon");
        // toast.dismiss();
      });
  },
});

// export const {} = categorySlice.actions;
export default categorySlice.reducer;
