import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import CreateEvent from "../pages/CreateEvent";
import UpcomingEvents from "../pages/UpcomingEvents";
import PrivateRoute from "../privateRoutes/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/upcoming-events",
        element: <UpcomingEvents></UpcomingEvents>,
      },
      {
        path: "/create-event",
        element: (
          <PrivateRoute>
            <CreateEvent></CreateEvent>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Signin></Signin>,
  },
  {
    path: "/signin",
    element: <Signin></Signin>,
  },
  {
    path: "/register",
    element: <Signup></Signup>,
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
]);
