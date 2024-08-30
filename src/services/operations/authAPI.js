import { toast } from "sonner";

import { setError, setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { setUserData } from "../../slices/authSlice";
import { getUserDetails } from "./profileAPI";
import { setUser } from "../../slices/profileSlice";
import { clearCart } from "../../slices/cartSlice";
import { clearAddresses } from "../../slices/addressSlice";

const { SENDOTP_API, SIGNUP_API, LOGIN_API } = endpoints;

export function sendOtp(contactNumber, isSignup) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        contactNumber,
        isSignup,
      });
      console.log("SENDOTP API RESPONSE............", response);

      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
      dispatch(setError(error.response.data));
      throw error;
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function signUp(firstName, lastName, contactNumber, otp, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        contactNumber,
        otp,
      });

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Could Not Verify OTP");
      dispatch(setError(error.response.data));
      navigate("/");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function login(contactNumber, otp, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        contactNumber,
        otp,
      });

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successful");
      dispatch(setToken(response.data.token));

      const userImage = response.data?.user?.image;
      dispatch(setUserData({ ...response.data.user, image: userImage }));
      dispatch(setUserData(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...response.data.user, image: userImage })
      );

      localStorage.setItem("token", JSON.stringify(response.data.token));
      // navigate("/");
      if (response.data.token) dispatch(getUserDetails(response.data.token));
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Could Not Verify OTP");
      dispatch(setError(error.response.data));
      throw error;
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function logout(navigate, pathname) {
  return (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUserData(null));
    dispatch(setUser(null));
    dispatch(clearAddresses());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    if (pathname !== "/checkout") {
      navigate("/");
      dispatch(clearCart());
    }
  };
}
