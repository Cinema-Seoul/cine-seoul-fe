import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";

import router from "./ui/router";

import "@unocss/reset/tailwind-compat.css";
import "@/ui/styles/global.css";
import "@/ui/styles/theme-colors.css";
import "virtual:uno.css";
import AdminRouter from "./ui/pages/admin.router";
import ClientRouter from "./ui/pages/client.router";
import AdminRoutes from "./ui/pages/admin.router";
import MainWrapper from "./main.wrap";
import { initApiFetcher } from "./services/api";

console.log("APP STARTED");

initApiFetcher();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MainWrapper>
      <RouterProvider router={router} />
    </MainWrapper>
  </React.StrictMode>
);
