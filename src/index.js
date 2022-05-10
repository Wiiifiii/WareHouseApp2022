import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./Components/NavBar";
import AddItem from "./Components/AddItem";
import Home from "./Components/Home";
import Inventory from "./Components/Inventory";
import InfoItem from "./Components/InfoItem";
import EditItem from "./Components/EditItem";
import SearchII from "./Components/SearchII";
import Footer from "./Components/Footer";

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/AddItem/" element={<AddItem />} />
      <Route path="/Inventory" element={<Inventory />} />
      <Route path="/InfoItem/:productnumber" element={<InfoItem />} />
      <Route path="/EditItem/:id" element={<EditItem />} />
      <Route path="SearchII/" element={<SearchII />} />
    </Routes>
    <Footer/>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
