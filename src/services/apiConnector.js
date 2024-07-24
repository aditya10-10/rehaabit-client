import axios from "axios";

export const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("token")
    )}`;
  }

  return req;
});

export const apiConnector = async (method, url, bodyData, headers, params, onUploadProgress) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
    onUploadProgress: onUploadProgress ? onUploadProgress : null,
  });
};
