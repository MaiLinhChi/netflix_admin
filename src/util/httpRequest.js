import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_URL,
});

export const Get = async (url, options = {}) => {
  const res = await instance.get(url, options);
  return res;
};

export const Post = async (url, object, options = {}) => {
  const res = await instance.post(url, object, options);
  return res;
};

export const Put = async (url, object, options = {}) => {
  const res = await instance.put(url, object, options);
  return res;
};

export const Patch = async (url, object, options = {}) => {
  const res = await instance.patch(url, object, options);
  return res;
};

export const Delete = async (url, options = {}) => {
  const res = await instance.delete(url, options);
  return res;
};
