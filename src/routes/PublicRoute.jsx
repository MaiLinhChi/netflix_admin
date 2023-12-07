import { routes } from "@/config";
import { getLocalStorage } from "@/util/functions";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const accessToken = getLocalStorage("access_token");
  if (accessToken) return <Navigate to={routes.home} />;
  return children;
};

export default PublicRoute;
