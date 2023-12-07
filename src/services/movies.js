import * as httpRequest from "../util/httpRequest";

export const getAllMovie = async () => {
  const res = await httpRequest.Get("/movies", {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
  return res.data;
};

export const createMovie = async (movie) => {
  const res = await httpRequest.Post("/movies/create", movie, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
  return res.data;
};

export const updateMovie = async (list, id) => {
  const res = await httpRequest.Patch(`/lists/update/${id}`, list, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
  return res.data;
};

export const deleteMovie = async (id) => {
  const res = await httpRequest.Delete(`/movies/${id}`, {
    headers: {
      token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    },
  });
  return res.data;
};
