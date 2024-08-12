import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import { orderEndpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";

const { PLACE_ORDER_API, PURCHASE_SERVICE_API } = orderEndpoints;

const initialState = {
  orders: [],
  singleOrder: [],
  isSingleOrder: false,
  isOrderLoading: false,
  error: null,
};

// PLACE ORDER
export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async ({ addressId, paymentId }, thunkAPI) => {
    try {
      const response = await apiConnector("POST", PLACE_ORDER_API, {
        addressId,
        paymentId,
      });

      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

// PURCHASE SERVICE
export const purchaseService = createAsyncThunk(
  "order/purchaseService",
  async ({ serviceData }, thunkAPI) => {
    try {
      const response = await apiConnector(
        "POST",
        PURCHASE_SERVICE_API,
        serviceData
      );

      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSingleOrder: (state, action) => {
      state.singleOrder.push(action.payload);
      state.isSingleOrder = true;
    },
    updateSingleOrder: (state, action) => {
      if (action.payload === "increment") {
        state.singleOrder[0].qty += 1;
        state.singleOrder[0].totalCost += state.singleOrder[0].price;
      } else {
        state.singleOrder[0].qty -= 1;
        state.singleOrder[0].totalCost -= state.singleOrder[0].price;
      }
    },
    clearSingleOrder: (state, action) => {
      state.singleOrder = [];
      state.isSingleOrder = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // PLACE ORDER
      .addCase(placeOrder.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.isOrderLoading = false;

        toast.success("Order Placed Successfully!");
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action;

        toast.error("Error in Placing Order");
      })

      // PURCHASE SERVICE
      .addCase(purchaseService.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(purchaseService.fulfilled, (state, action) => {
        state.isOrderLoading = false;

        toast.success("Service Purchased Successfully!");
      })
      .addCase(purchaseService.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action;

        toast.error("Error in Purchasing Service to Cart");
      });
  },
});

export const { setSingleOrder, clearSingleOrder, updateSingleOrder } = orderSlice.actions;

export default orderSlice.reducer;
