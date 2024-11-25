import { toast } from "sonner";

import { paymentEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
const { SERVICE_PAYMENT_API, VERIFY_PAYMENT_API } = paymentEndpoints;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function placeOrder(
  token,
  singleOrder,
  isSingleOrder,
  user,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...");
  try {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("RazorPay SDK failed to load");
      return;
    }

    // console.log("Services being sent:", services);

    const orderResponse = await apiConnector(
      "POST",
      SERVICE_PAYMENT_API,
      { singleOrder, isSingleOrder },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    // console.log("Order Response:", orderResponse);

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      currency: orderResponse.data.paymentDetails.currency,
      amount: `${orderResponse.data.paymentDetails.amount}`,
      order_id: orderResponse.data.paymentDetails.id,
      name: "Rehaabit",
      description: "Thank You for Purchasing the Service",
      image:
        "https://res.cloudinary.com/duizbchmz/image/upload/v1732435966/LOGO_df3ek6.svg",
      prefill: {
        name: `${user.additionalDetails.firstName} ${user.additionalDetails.lastName}`,
        contact: user.contactNumber, // Replace with dynamic user details
      },
      handler: function (response) {
        // verifyPayment({ ...response, services }, token, navigate, dispatch);
        verifyPayment(
          { ...response, singleOrder, isSingleOrder },
          token,
          navigate,
          dispatch
        );
      },
    };

    // console.log(options);

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    // console.log(paymentObject);

    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops, payment failed");
      // console.log("Payment Failed Details:", response.error);
    });
  } catch (error) {
    // console.error("PAYMENT API ERROR:", error);
    toast.error("Could not make Payment");
  } finally {
    toast.dismiss(toastId);
  }
}

// Verify Payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...");
  try {
    const response = await apiConnector("POST", VERIFY_PAYMENT_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Payment Successful! You are added to the service.");
    navigate("/"); // Navigate to a success page or dashboard
  } catch (error) {
    // console.error("PAYMENT VERIFY ERROR:", error);
    toast.error("Could not verify Payment");
  } finally {
    toast.dismiss(toastId);
  }
}
