import React from "react";
import ReactDom from "react-dom";
import SayHi from "./SayHi.jsx";
import "./style.scss";
import Pooh from "./pooh.gif";

const App = () => {
  return (
    <div>
      <p>Hello World!</p>
      <img src={Pooh} />
      <SayHi />
    </div>
  );
};

ReactDom.render(App(), document.getElementById("root"));

// const ImageEl = document.createElement("img");
// ImageEl.src = Pooh;

// document.getElementById("pooh").appendChild(ImageEl);

// sayHi();

if (module.hot) {
  module.hot.accept("./SayHi.jsx", () => {
    sayHi();
  });
}
