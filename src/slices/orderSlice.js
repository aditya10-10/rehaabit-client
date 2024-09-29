import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

import { orderEndpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";

const {
  PLACE_ORDER_API,
  PURCHASE_SERVICE_API,
  GET_USER_ORDERS_API,
  GET_ALL_ORDERS_API,
  GET_REVENUE_API,
  GET_PENDING_ORDERS_API_COUNT,
  UPDATE_ORDER_STATUS_API
} = orderEndpoints;

const initialState = {
  orders: [],
  singleOrder: [],
  isSingleOrder: false,
  isOrderLoading: false,
  error: null,
  totalRevenue: 0,
  pendingOrdersCount: 0,
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

// UPDATE ORDER STATUS
export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, status }, thunkAPI) => {
    try {
      const response = await apiConnector("POST", UPDATE_ORDER_STATUS_API, {
        orderId,
        status,
      });
      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);
// GET USER ORDERS
export const getUserOrders = createAsyncThunk(
  "order/getUserOrders",
  async (_, thunkAPI) => {
    try {
      const response = await apiConnector("GET", GET_USER_ORDERS_API);
      console.log("User Orders:", response.data.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

// GET ALL ORDERS
export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (_, thunkAPI) => {
    try {
      const response = await apiConnector("GET", GET_ALL_ORDERS_API);
      console.log("All Orders:", response.data.data);
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

// GET REVENUE
export const getRevenue = createAsyncThunk(
  "order/getRevenue",
  async (_, thunkAPI) => {
    try {
      const response = await apiConnector("GET", GET_REVENUE_API);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message.data);
    }
  }
);

// GET PENDING ORDERS COUNT

export const getPendingOrdersCount = createAsyncThunk(
  "order/getPendingOrdersCount",
  async (_, thunkAPI) => {
    try {
      const response = await apiConnector("GET", GET_PENDING_ORDERS_API_COUNT);
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

        // toast.success("Order Placed Successfully!");
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action;

        toast.error("Error in Placing Order");
      })
      
      // UPDATE ORDER STATUS
      .addCase(updateOrderStatus.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        toast.success("Order Status Updated Successfully!");
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action;
        toast.error("Error in Updating Order Status");
      })

      // GET USER ORDERS
      .addCase(getUserOrders.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action;
      })

      // GET ALL ORDERS
      .addCase(getAllOrders.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.orders = action.payload;
        console.log("All Orders:", action.payload);
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action;
      })

      // PURCHASE SERVICE
      .addCase(purchaseService.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(purchaseService.fulfilled, (state, action) => {
        state.isOrderLoading = false;

        // toast.success("Service Purchased Successfully!");
      })
      .addCase(purchaseService.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action;

        toast.error("Error in Purchasing Service to Cart");
      })

      // GET REVENUE
      .addCase(getRevenue.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(getRevenue.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        console.log("Revenue:", action.payload);
        state.totalRevenue = action.payload.totalRevenue; // Uncomment this line to update revenue state in the Redux store.
      })
      .addCase(getRevenue.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action;

        toast.error("Error in Getting Revenue");
      })

      // GET PENDING ORDERS COUNT
      .addCase(getPendingOrdersCount.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(getPendingOrdersCount.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        console.log("Pending Orders Count:", action.payload);
        state.pendingOrdersCount = action.payload; 
      })
      .addCase(getPendingOrdersCount.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action;

        toast.error("Error in Getting Pending Orders Count");
      });
  },
});

export const { setSingleOrder, clearSingleOrder, updateSingleOrder } =
  orderSlice.actions;

export default orderSlice.reducer;
