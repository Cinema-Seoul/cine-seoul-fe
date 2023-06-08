import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "@/router";

/** Global Styles */
import "@/styles/global.css";
import "@/styles/theme-colors.css";
import "@unocss/reset/tailwind-compat.css";
import "virtual:uno.css";

import MainWrapper from "./main.wrap";
import { initApiFetcher, setDefaultHeader } from "./services/api";

console.log("APP STARTED");

initApiFetcher();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MainWrapper>
      <RouterProvider router={router} />
    </MainWrapper>
  </React.StrictMode>
);
