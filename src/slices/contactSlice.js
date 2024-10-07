import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { contactEndpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";

const {
  CONTACT_API,
  GET_ALL_CONTACTS_API,
  GET_CONTACT_BY_ID_API,
  UPDATE_CONTACT_STATUS_API,
  ADMIN_RESPONSE_API,
  DELETE_CONTACT_API,
} = contactEndpoints;

const initialState = {
  contacts: [],
  contact: null,
  isLoading: false,
  error: null,
};

// 1. AsyncThunk to send a contact form
export const contact = createAsyncThunk(
  "contact/contact",
  async ({ formData }, thunkAPI) => {
    try {
      const response = await apiConnector("POST", CONTACT_API, formData);
      toast.success("Message sent successfully!");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to send message";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// 2. AsyncThunk to fetch all contacts
export const getAllContacts = createAsyncThunk(
  "contact/getAllContacts",
  async (_, thunkAPI) => {
    try {
      const response = await apiConnector("GET", GET_ALL_CONTACTS_API);
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch contacts";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// 3. AsyncThunk to fetch a contact by caseId
export const getContactById = createAsyncThunk(
  "contact/getContactById",
  async (id, thunkAPI) => {
    try {
      const response = await apiConnector("POST", GET_CONTACT_BY_ID_API, {
        id,
      });
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch contact";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// 4. AsyncThunk to send an admin response
export const adminResponse = createAsyncThunk(
  "contact/adminResponse",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await apiConnector("PATCH", ADMIN_RESPONSE_API, payload);
      toast.success("Response added successfully!");
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to add response";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// 5. AsyncThunk to update contact status and assignment
export const updateContactStatusAndAssignment = createAsyncThunk(
  "contact/updateContactStatusAndAssignment",
  async ({ caseId, formData }, { rejectWithValue }) => {
    try {
      const response = await apiConnector("PATCH", UPDATE_CONTACT_STATUS_API, {
        caseId,
        ...formData,
      });
      toast.success("Contact updated successfully!");
      return response.data.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update contact";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// 6. AsyncThunk to delete a contact by caseId (admin only)
export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (caseId, thunkAPI) => {
    try {
      const response = await apiConnector(
        "DELETE",
        `${DELETE_CONTACT_API}/${caseId}`
      );
      toast.success("Contact deleted successfully!");
      return caseId;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete contact";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    resetContact: (state) => {
      state.contact = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Sending a contact form
      .addCase(contact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(contact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts.push(action.payload);
      })
      .addCase(contact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetching all contacts
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
      })

      // Fetching contact by ID
      .addCase(getContactById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContactById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contact = action.payload;
      })
      .addCase(getContactById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Admin response
      .addCase(adminResponse.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminResponse.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedContact = action.payload;
        const index = state.contacts.findIndex(
          (contact) => contact._id === updatedContact._id
        );
        if (index !== -1) {
          state.contacts[index] = updatedContact;
        }
        state.contact = updatedContact;
      })
      .addCase(adminResponse.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Update Contact Status
      .addCase(updateContactStatusAndAssignment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateContactStatusAndAssignment.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedContact = action.payload;
        const index = state.contacts.findIndex(
          (contact) => contact._id === updatedContact._id
        );
        if (index !== -1) {
          state.contacts[index] = updatedContact;
        }
        state.contact = updatedContact;
      })
      .addCase(updateContactStatusAndAssignment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Deleting a contact
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          (contact) => contact.caseId !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetContact } = contactSlice.actions;

export default contactSlice.reducer;
