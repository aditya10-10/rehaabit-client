import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import Swal from "sweetalert2";

import { apiConnector } from "../services/apiConnector";
import { usersEndpoints } from "../services/apis";

const {
  GET_ALL_USERS_API,
  UPDATE_USER_DETAILS_API,
  DELETE_USER_API,
  CREATE_NEW_USER_API,
  GET_USER_API,
} = usersEndpoints;

const initialState = {
  users: [],
  userDetails: [],
  isLoading: false,
  error: null,
};

// GET ALL USERS
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await apiConnector("GET", GET_ALL_USERS_API);

      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

// GET USER
export const getUser = createAsyncThunk(
  "users/getUser",
  async ({ userId }, thunkAPI) => {
    try {
      const response = await apiConnector("POST", GET_USER_API, { userId });

      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

// UPDATE USER DETAILS
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({ userId }, thunkAPI) => {
    // console.log(formData)
    try {
      const response = await apiConnector("DELETE", DELETE_USER_API, {
        userId,
      });

      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

// DELETE USER
export const updateUserDetails = createAsyncThunk(
  "users/updateUserDetails",
  async ({ formData }, thunkAPI) => {
    // console.log(formData)
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_USER_DETAILS_API,
        formData,
        { "Content-Type": "multipart/form-data" }
      );

      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

// CREATE NEW USER
export const createNewUser = createAsyncThunk(
  "users/createNewUser",
  async ({ formData }, thunkAPI) => {
    // console.log(formData)
    try {
      const response = await apiConnector(
        "POST",
        CREATE_NEW_USER_API,
        formData,
        { "Content-Type": "multipart/form-data" }
      );

      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      // GET ALL USERS
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;
      })

      // GET USER
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;

        // Swal.showLoading();
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userDetails = action.payload;

        // Swal.hideLoading();
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        // Swal.hideLoading();
      })

      // UPDATE USER DETAILS
      .addCase(updateUserDetails.pending, (state) => {
        state.isLoading = true;

        Swal.showLoading();
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );

        state.userDetails = action.payload;

        Swal.fire({
          title: "Updated Successfully!",
          icon: "success",
        });
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        Swal.fire({
          title: "Error in Updating!",
          icon: "error",
        });
      })

      // DELETE USER
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;

        Swal.showLoading();
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.users = state.users.filter((user) => user._id !== action.payload);

        state.userDetails = action.payload;

        Swal.fire({
          title: "User Deleted Successfully!",
          icon: "success",
        });
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        Swal.fire({
          title: "Error in Deleting User!",
          icon: "error",
        });
      })

      // CREATE NEW USER
      .addCase(createNewUser.pending, (state) => {
        state.isLoading = true;

        Swal.showLoading();
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.users.push(action.payload);

        Swal.fire({
          title: "New User Created Successfully!",
          icon: "success",
        });
      })
      .addCase(createNewUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action;

        Swal.fire({
          title: "Error in Creating New User!",
          icon: "error",
        });
      });
  },
});

export const { setUserDetails } = usersSlice.actions;

export default usersSlice.reducer;
