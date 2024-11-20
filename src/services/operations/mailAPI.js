import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { toast } from "sonner";

const { SENDMAIL_API } = endpoints;

export function sendMail(email, navigate) {
  return async () => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", SENDMAIL_API, {
        email,
      });
      // console.log("SENDOTP API RESPONSE............", response);

      // console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Email Sent Successfully");

      navigate("/thank-you");
    } catch (error) {
      // console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
    }
    toast.dismiss(toastId);
  };
}
