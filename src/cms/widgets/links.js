import React from "react";

import { LINK_OPTIONS } from "../constants";
import CustomSelect from "./customselect";

const LinksComponent = props => {
  return <CustomSelect {...props} options={LINK_OPTIONS} />;
};

export default LinksComponent;
