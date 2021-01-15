import React from "react";
import ReactDom from "react-dom";
import "./assets/css/reset.css";
import "./assets/css/index.css";
import HeaderIndex from "./pages/headerIndex";

const element = (
  <>
    <HeaderIndex />
  </>
);

ReactDom.render(element, document.getElementById("root"));
