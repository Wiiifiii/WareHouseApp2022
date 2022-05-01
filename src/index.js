import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
// import Search from "./Components/Search";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavBar } from "./Components/NavBar";

 import Home from "./Components/Home";
// import ItemInfo from "./Components/ItemInfo";
// import ItemAdd from "./Components/ItemAdd";
// import ItemEdit from "./Components/ItemEdit";
// import AddModal from "./Components/AddModal";
// import GetAllData from "./Components/GetAllData";


const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <NavBar/>
   <Routes>
  <Route path="/Home" element={<Home />} />
   </Routes>
    <App />
    
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
