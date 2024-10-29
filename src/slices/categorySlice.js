import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";
import Swal from "sweetalert2";
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
  isCategoryPage: true,
};

export const showAllCategories = createAsyncThunk(
  "categories/showAllCategories",
  async (_, thunkAPI) => {
    try {
      const response = await apiConnector("GET", SHOW_ALL_CATEGORIES_API);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async ({ name, icon, setProgress, metaTitle, metaDescription, metaKeywords }, thunkAPI) => {
    try {
      const response = await apiConnector(
        "POST",
        CREATE_CATEGORY_API,
        { name, icon, metaTitle, metaDescription, metaKeywords },
        { "Content-Type": "multipart/form-data" },
        null,
        (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        }
      );
      
      return response.data.data;
    } catch (error) {
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
      return response.data;
    } catch (error) {
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
      return response.data.data;
    } catch (error) {
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
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState,

  reducers: {
    setIsCategoryPage: (state, action) => {
      state.isCategoryPage = !state.isCategoryPage;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(showAllCategories.pending, (state) => {
        state.isLoading = true;
        // Swal.showLoading()
      })
      .addCase(showAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
        // Swal.hideLoading()
      })
      .addCase(showAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        // Swal.hideLoading()

        // Swal.fire({
        //   title: "Error in Loading Categories!",
        //   icon: "error",
        // });
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        Swal.showLoading(); 
        // Swal.showLoading()
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
        state.isLoading = false;
        // toast.success("New Category Created");
        // toast.dismiss();

        // Swal.hideLoading()

        Swal.fire({
          title: "New Category Created!",
          icon: "success",
        });
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        // toast.error("Error in Creating New Category");
        // toast.dismiss();

        // Swal.hideLoading()

        Swal.fire({
          title: "Error in Creating New Category!",
          icon: "error",
        });
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        // toast.loading("Loading...");
        Swal.showLoading();
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        // console.log(action);
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload.categoryId
        );
        state.isLoading = false;
        // toast.error("Category Deleted");
        // toast.dismiss();
        // Swal.fire({
        //   title: "Category Deleted!",
        //   icon: "success",
        // });
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        // toast.error("Error in Deleting Category");
        // toast.dismiss();
        Swal.fire({
          title: "Error in Deleting Category!",
          icon: "error",
        });
      })
      .addCase(updateCategoryName.pending, (state) => {
        state.isLoading = true;
        // toast.loading("Loading...");
        Swal.showLoading();
      })
      .addCase(updateCategoryName.fulfilled, (state, action) => {
        state.categories = state.categories.map((category) =>
          category._id === action.payload._id ? action.payload : category
        );

        state.isLoading = false;
        // toast.success("Category Name Updated");
        // toast.dismiss();
        Swal.fire({
          title: "Category Name Updated!",
          icon: "success",
        });
      })
      .addCase(updateCategoryName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        // toast.error("Error in Updating Category Name");
        // toast.dismiss();
        Swal.fire({
          title: "Error in Updating Category Name!",
          icon: "error",
        });
      })
      .addCase(updateCategoryIcon.pending, (state) => {
        state.isLoading = true;
        // toast.loading("Loading...");
        Swal.showLoading();
      })
      .addCase(updateCategoryIcon.fulfilled, (state, action) => {
        state.categories = state.categories.map((category) =>
          category._id === action.payload._id ? action.payload : category
        );

        state.isLoading = false;
        // toast.success("Category Icon Updated");
        // toast.dismiss();
        Swal.fire({
          title: "Category Icon Updated!",
          icon: "success",
        });
      })
      .addCase(updateCategoryIcon.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
        // toast.error("Error in Updating Category Icon");
        // toast.dismiss();
        Swal.fire({
          title: "Error in Updating Category Icon!",
          icon: "error",
        });
      });
  },
});

// export const {} = categorySlice.actions;
export default categorySlice.reducer;
