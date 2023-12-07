import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useContext } from "react";

import { AuthContext } from "./context/auth/AuthContext";
import Loading from "./components/Loading";
import { LoadingContext } from "./context/loading/LoadingContext";
import { protectedRoutes, publicRoutes } from "./routes";
import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const { user } = useContext(AuthContext);
  const { loading } = useContext(LoadingContext);

  return (
    <Router>
      {loading && <Loading />}
      <Routes>
        {publicRoutes.map((routeConfig, index) => {
          let Layout = routeConfig.layout ? routeConfig.layout : React.Fragment;
          const Component = routeConfig.component;
          return (
            <Route
              path={routeConfig.path}
              key={index}
              element={
                <PublicRoute>
                  <Layout>
                    <Component />
                  </Layout>
                </PublicRoute>
              }
            />
          );
        })}
        {protectedRoutes.map((routeConfig, index) => {
          const Layout = routeConfig.layout
            ? routeConfig.layout
            : React.Fragment;
          const Component = routeConfig.component;
          return (
            <Route
              path={routeConfig.path}
              key={index}
              element={
                <ProtectedRoute>
                  <Layout>
                    <Component />
                  </Layout>
                </ProtectedRoute>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
