import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../component/Home";
import Contact from "../component/Contact";
// import PayNow from "../component/Tickets";
import Tickets from "../component/Tickets"; // updated import

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "tickets",
        element: <Tickets />,
      },
    ],
  },
]);

export default router;
