import React from "react";
import ReactDom from "react-dom";
import Timer from "./Timer.jsx";
import "./style.scss";

const App = () => {
  return (
    <>
      <Timer />
    </>
  );
};

ReactDom.render(App(), document.getElementById("root"));
