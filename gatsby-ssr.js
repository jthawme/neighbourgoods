import React from "react";

import Logo from "./src/svg/logo.svg";
import LogoText from "./src/svg/logo-text.svg";

import wrapWithProvider from "./reduxProvider";
export const wrapRootElement = wrapWithProvider;

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(
    <div id="main-logo">
      <Logo /> <LogoText />
    </div>
  );
};
