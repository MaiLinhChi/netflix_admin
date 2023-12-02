import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import GlobalStyle from "./components/GlobalStyle";
import { AuthContextProvider } from "./context/auth/AuthContext.jsx";
import LoadingContextProvider from "./context/loading/LoadingContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyle>
      <AuthContextProvider>
        <LoadingContextProvider>
          <App />
        </LoadingContextProvider>
      </AuthContextProvider>
    </GlobalStyle>
    ,
  </React.StrictMode>
);
