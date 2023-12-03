import axios from "axios";

const httpRequest = axios.create({
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
  credentials: "include",
  baseURL: import.meta.env.VITE_API_URL,
});

export const Get = async (url, options = {}) => {
  const res = await httpRequest.get(url, options);
  return res;
};

export const Post = async (url, object, options = {}) => {
  const res = await httpRequest.post(url, object, options);
  return res;
};

export const Put = async (url, object, options = {}) => {
  const res = await httpRequest.put(url, object, options);
  return res;
};

export const Patch = async (url, object, options = {}) => {
  const res = await httpRequest.patch(url, object, options);
  return res;
};

export const Delete = async (url, options = {}) => {
  const res = await httpRequest.delete(url, options);
  return res;
};
