import React from "react";
import ReactDOM from "react-dom";

const Logo = ({ className }) => {
  if (typeof document === "undefined") {
    return null;
  }

  return ReactDOM.createPortal(
    <h1 className={className}>Neighbourgoods</h1>,
    document.body
  );
};

export default Logo;
