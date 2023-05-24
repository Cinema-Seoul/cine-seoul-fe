import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "./ui/router";

import "@unocss/reset/tailwind-compat.css";
import "@/ui/styles/global.css";
import "@/ui/styles/theme-colors.css";
import "virtual:uno.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
