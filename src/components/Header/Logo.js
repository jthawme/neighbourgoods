import React from "react";
import ReactDOM from "react-dom";

const Logo = ({ className }) => {
  return ReactDOM.createPortal(
    <h1 className={className}>Neighbourgoods</h1>,
    document.body
  );
};

export default Logo;
