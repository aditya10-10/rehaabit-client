import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

import { contactEndpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";

const { CONTACT_API, GET_ALL_CONTACTS_API } = contactEndpoints;

const initialState = {
  contacts: [], // Ensure contacts is an array
  isLoading: false,
  error: null,
};

export const contact = createAsyncThunk(
  "contact/contact",
  async ({ formData }, thunkAPI) => {
    try {
      const response = await apiConnector("POST", CONTACT_API, formData);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

export const getAllContacts = createAsyncThunk(
  "contact/getAllContacts",
  async (_, thunkAPI) => {
    try {
      const response = await apiConnector("GET", GET_ALL_CONTACTS_API);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(contact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(contact.fulfilled, (state, action) => {
        state.isLoading = false;
        // toast.success("Message sent successfully!");
      })
      .addCase(contact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // toast.error("Error in sending message");
      })
      .addCase(getAllContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(getAllContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {} = contactSlice.actions;

export default contactSlice.reducer;
