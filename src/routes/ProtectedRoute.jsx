import { routes } from "@/config";
import { getLocalStorage } from "@/util/functions";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const accessToken = getLocalStorage("access_token");
  if (!accessToken) return <Navigate to={routes.login} />;
  return children;
};

export default ProtectedRoute;
