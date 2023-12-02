import * as httpRequest from "../util/httpRequest";

export const getStats = async () => {
  const res = await httpRequest.Get("/users/stats");
  return res.data;
};

export const getUsers = async () => {
  const res = await httpRequest.Get("/users");
  return res.data;
};

export const createUser = async (user) => {
  const res = await httpRequest.Post("/users/create", user);
  return res.data;
};

export const updateUser = async (user, id) => {
  const res = await httpRequest.Patch(`/users/${id}`, user);
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await httpRequest.Delete(`/users/${id}`);
  return res.data;
};
