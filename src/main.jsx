import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EventProvider } from "./Context/EventContext.jsx";
import { LoadScript } from "@react-google-maps/api"; // ✅ import this

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // ✅ get from .env

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={["places"]}>
      <EventProvider>
        <AuthProvider>
          <App />
          <ToastContainer position="top-center" autoClose={3000} theme="colored" />
        </AuthProvider>
      </EventProvider>
    </LoadScript>
  </StrictMode>
);
