import React from "react";
import { useRoutes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Layout from "../layout/Layout";
import Login from "../pages/Authentication/Login";
import Signup from "../pages/Authentication/Signup";
import ForgetPassword from "../pages/Authentication/ForgetPassword";
import Users from "../pages/Users";
import Leads from "../pages/Leads";
import PrivateRoute from "./PrivateRoute";
import CreateLead from "../pages/CreateLead";
import Profile from "../pages/Profile";
import Page404 from "../pages/Page404";
import { Password } from "@mui/icons-material";

const Routes = () => {
  const route = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: "true",
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
        },
        {
          path: "/add_leads",
          element: (
            <PrivateRoute>
              <CreateLead />
            </PrivateRoute>
          ),
        },
        {
          path: "/leads",
          element: (
            <PrivateRoute>
              <Leads />
            </PrivateRoute>
          ),
        },
        {
          path: "/lead/:id",
          element: (
            <PrivateRoute>
              <CreateLead editMode={true} />
            </PrivateRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
        },
        {
          path: "/user",
          element: (
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          ),
        },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/resetpassword/:token", element: <Password /> },
    { path: "/forget-password", element: <ForgetPassword /> },
    {path:"*", element: <Page404/>}
  ]);
  return route;
};

export default Routes;
