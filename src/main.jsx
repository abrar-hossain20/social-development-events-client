import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./context/AuthProvider";
import EventProvider from "./context/EventProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <EventProvider>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer></ToastContainer>
      </EventProvider>
    </AuthProvider>
  </StrictMode>
);
