import React from "react";

import { CATEGORIES } from "../constants";
import CustomSelect from "./customselect";

const cats = [{ label: "-", value: false }, ...CATEGORIES];

class CategoriesComponent extends React.Component {
  render() {
    return <CustomSelect {...this.props} options={cats} />;
  }
}

export default CategoriesComponent;
