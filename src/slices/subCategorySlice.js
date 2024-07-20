import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";
import toast from "react-hot-toast";

const {
  SHOW_ALL_SUB_CATEGORIES_API,
  UPDATE_SUB_CATEGORY_NAME_API,
  ADD_SUB_CATEGORY_API,
  UPDATE_SUB_CATEGORY_ICON_API,
  DELETE_SUB_CATEGORY_API,
  GET_SUB_CATEGORIES_BY_CATEGORY_API,
} = endpoints;

const initialState = {
  subcategories: [],
  subCategoriesByCategory: [],
  error: null,
  isLoading: false,
};

export const showAllSubCategories = createAsyncThunk(
  "subcategories/showAllSubCategories",
  async (_, thunkAPI) => {
    try {
      const response = await apiConnector("GET", SHOW_ALL_SUB_CATEGORIES_API);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const addSubCategory = createAsyncThunk(
  "subcategories/addSubCategory",
  async ({ categoryId, subCategoryName, icon }, thunkAPI) => {
    try {
      const response = await apiConnector(
        "POST",
        ADD_SUB_CATEGORY_API,
        { categoryId, subCategoryName, icon },
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

export const deleteSubCategory = createAsyncThunk(
  "subcategories/deleteSubCategory",
  async ({ categoryId, subCategoryId }, thunkAPI) => {
    try {
      const response = await apiConnector("DELETE", DELETE_SUB_CATEGORY_API, {
        categoryId,
        subCategoryId,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const updateSubCategoryName = createAsyncThunk(
  "subcategories/updateSubCategoryName",
  async ({ categoryId, subCategoryId, subCategoryName }, thunkAPI) => {
    try {
      const response = await apiConnector("PUT", UPDATE_SUB_CATEGORY_NAME_API, {
        subCategoryName,
        categoryId,
        subCategoryId,
      });
      //   console.log(response.data.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const updateSubCategoryIcon = createAsyncThunk(
  "subcategories/updateSubCategoryIcon",
  async ({ subCategoryId, categoryId, icon }, thunkAPI) => {
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_SUB_CATEGORY_ICON_API,
        {
          subCategoryId,
          categoryId,
          icon,
        },
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

export const getSubCategoriesByCategory = createAsyncThunk(
  "subcategories/getSubCategoriesByCategory",
  async ({ categoryId }, thunkAPI) => {
    // console.log(categoryId)
    try {
      const response = await apiConnector(
        "POST",
        GET_SUB_CATEGORIES_BY_CATEGORY_API,
        {
          categoryId,
        },
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

const subCategorySlice = createSlice({
  name: "subcategories",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(showAllSubCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showAllSubCategories.fulfilled, (state, action) => {
        state.subcategories = action.payload;
        state.isLoading = false;
      })
      .addCase(showAllSubCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
      })
      .addCase(addSubCategory.pending, (state) => {
        state.isLoading = true;
        // toast.loading("Loading...");
      })
      .addCase(addSubCategory.fulfilled, (state, action) => {
        // console.log(action)
        state.subcategories.push(action.payload.newSubCategory);
        state.isLoading = false;
        toast.success("Sub Category Added");
        // toast.dismiss();
      })
      .addCase(addSubCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        toast.error("Error in Adding Sub Category");
        // toast.dismiss();
      })
      .addCase(deleteSubCategory.pending, (state) => {
        state.isLoading = true;
        // toast.loading("Loading...");
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        console.log(action);
        state.subcategories = state.subcategories.filter(
          (category) => category._id !== action.payload.deletedSubCategory._id
        );
        state.isLoading = false;
        toast.error("Category Deleted");
        // toast.dismiss();
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        toast.error("Error in Deleting Category");
        // toast.dismiss();
      })
      .addCase(updateSubCategoryName.pending, (state) => {
        state.isLoading = true;
        // toast.loading("Loading...");
      })
      .addCase(updateSubCategoryName.fulfilled, (state, action) => {
        state.subcategories = state.subcategories.map((category) =>
          category._id === action.payload.updatedSubCategory._id
            ? action.payload.updatedSubCategory
            : category
        );

        state.isLoading = false;
        toast.success("Category Name Updated");
        // toast.dismiss();
      })
      .addCase(updateSubCategoryName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        toast.error("Error in Updating Sub Category Name");
        // toast.dismiss();
      })
      .addCase(updateSubCategoryIcon.pending, (state) => {
        state.isLoading = true;
        // toast.loading("Loading...");
      })
      .addCase(updateSubCategoryIcon.fulfilled, (state, action) => {
        state.subcategories = state.subcategories.map((category) =>
          category._id === action.payload.updatedSubCategory._id
            ? action.payload.updatedSubCategory
            : category
        );

        state.isLoading = false;
        toast.success("Category Icon Updated");
        // toast.dismiss();
      })
      .addCase(updateSubCategoryIcon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        toast.error("Error in Updating Category Icon");
        // toast.dismiss();
      }).addCase(getSubCategoriesByCategory.pending, (state) => {
        state.isLoading = true;
        // toast.loading("Loading...");
      })
      .addCase(getSubCategoriesByCategory.fulfilled, (state, action) => {
        console.log(action);

        state.subCategoriesByCategory = action.payload

        state.isLoading = false;
        // toast.success("Category Icon Updated");
        // toast.dismiss();
      })
      .addCase(getSubCategoriesByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        // toast.error("Error in Updating Category Icon");
        // toast.dismiss();
      });
  },
});

// export const {} = categorySlice.actions;
export default subCategorySlice.reducer;
