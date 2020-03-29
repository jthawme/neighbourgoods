import React from "react";

import wrapWithProvider from "./reduxProvider";
export const wrapRootElement = wrapWithProvider;

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<h1 id="main-logo">Neighbourgoods</h1>);
};
