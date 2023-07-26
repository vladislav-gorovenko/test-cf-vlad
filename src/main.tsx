import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import TickerLayout from "./components/Ticker/TickerLayout";
import Tabs from "./components/Ticker/Tabs";
import About from "./components/About";
import Table from "./components/Ticker/Table";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<About />} />
      <Route path="ticker" element={<TickerLayout />}>
        <Route index element={<Tabs />} />
        <Route path=":tab" element={<Table />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
