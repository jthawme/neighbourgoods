import React from "react";

import { CATEGORIES } from "../constants";
import CustomSelect from "./customselect";

class CategoriesComponent extends React.Component {
  render() {
    return <CustomSelect {...this.props} options={CATEGORIES} />;
  }
}

export default CategoriesComponent;
