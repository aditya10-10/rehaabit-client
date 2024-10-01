import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";
import Swal from "sweetalert2";

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
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const addSubCategory = createAsyncThunk(
  "subcategories/addSubCategory",
  async ({ categoryId, subCategoryName, icon, setProgress }, thunkAPI) => {
    try {
      const response = await apiConnector(
        "POST",
        ADD_SUB_CATEGORY_API,
        { categoryId, subCategoryName, icon },
        { "Content-Type": "multipart/form-data" },
        null,
        (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        }
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
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
      // console.log(response.data);
      return response.data;
    } catch (error) {
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
      // console.log(response.data);
      return response.data;
    } catch (error) {
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
        }
      );
      return response.data.data;
    } catch (error) {
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
      })
      .addCase(addSubCategory.fulfilled, (state, action) => {
        state.subcategories.push(action.payload.newSubCategory);
        state.isLoading = false;
        Swal.fire({
          title: "Sub Category Added",
          icon: "success",
        });
      })
      .addCase(addSubCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        Swal.fire({
          title: "Error in Adding Sub Category",
          icon: "error",
        });
      })
      .addCase(deleteSubCategory.pending, (state) => {
        state.isLoading = true;
        Swal.showLoading();
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        // console.log(action);
        state.subcategories = state.subcategories.filter(
          (category) => category._id !== action.payload.deletedSubCategory._id
        );
        state.isLoading = false;
        // Swal.fire({
        //   title: "Category Deleted",
        //   icon: "success",
        // });
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        Swal.fire({
          title: "Error in Deleting Category",
          icon: "error",
        });
      })
      .addCase(updateSubCategoryName.pending, (state) => {
        state.isLoading = true;
        Swal.showLoading();
      })
      .addCase(updateSubCategoryName.fulfilled, (state, action) => {
        state.subcategories = state.subcategories.map((category) =>
          category._id === action.payload.updatedSubCategory._id
            ? action.payload.updatedSubCategory
            : category
        );

        state.isLoading = false;
        Swal.fire({
          title: "Category Name Updated",
          icon: "success",
        });
      })
      .addCase(updateSubCategoryName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        Swal.fire({
          title: "Error in Updating Sub Category Name",
          icon: "error",
        });
      })
      .addCase(updateSubCategoryIcon.pending, (state) => {
        state.isLoading = true;
        Swal.showLoading();
      })
      .addCase(updateSubCategoryIcon.fulfilled, (state, action) => {
        state.subcategories = state.subcategories.map((category) =>
          category._id === action.payload.updatedSubCategory._id
            ? action.payload.updatedSubCategory
            : category
        );

        state.isLoading = false;
        Swal.fire({
          title: "Category Icon Updated",
          icon: "success",
        });
      })
      .addCase(updateSubCategoryIcon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        Swal.fire({
          title: "Error in Updating Category Icon",
          icon: "error",
        });
      })
      .addCase(getSubCategoriesByCategory.pending, (state) => {
        state.isLoading = true;
        // Swal.showLoading();
      })
      .addCase(getSubCategoriesByCategory.fulfilled, (state, action) => {
        // console.log(action);

        state.subCategoriesByCategory = action.payload;

        state.isLoading = false;
        // if(Swal.isLoading()) Swal.hideLoading();
      })
      .addCase(getSubCategoriesByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        // Swal.fire({
        //   title: "Error in Fetching Sub Categories",
        //   icon: "error",
        // });
      });
  },
});

// export const {} = categorySlice.actions;
export default subCategorySlice.reducer;
