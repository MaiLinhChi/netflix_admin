const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const deleteLocalStorage = (key) => {
  localStorage.removeItem(key);
};

const clearAuthData = () => {
  deleteLocalStorage("access_token");
  deleteLocalStorage("refresh_token");
  deleteLocalStorage("user");
};

const goToPage = (url) => {
  window.location.href = url;
};

export { getLocalStorage, setLocalStorage, clearAuthData, goToPage };
