import React from "react";
import { ReactNode } from "react";

import Login from "./dashboard/login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "./dashboard/dashboard";
import UserConfig from "./dashboard/user-config";

class App extends React.Component {
  render(): ReactNode {
    return (
      <>
        <RouterProvider
          router={createBrowserRouter([
            {
              path: "/login",
              element: <Login></Login>,
            },
            { 
              path: "/user-config", 
              element: <UserConfig></UserConfig>,
            },
            {
              path: "/dashboard/:section?",

              element: <Dashboard></Dashboard>,
            },
          ])}
        ></RouterProvider>
      </>
    );
  }
}

export default App;
