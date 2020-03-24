import React from "react";

import { CATEGORIES } from "../constants";
import CustomSelect from "./customselect";

const CategoriesComponent = props => {
  return <CustomSelect {...props} multiple options={CATEGORIES} />;
};

export default CategoriesComponent;
