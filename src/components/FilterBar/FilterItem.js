import React from "react";

import styles from "./FilterItem.module.scss";
import Checkbox from "../common/Checkbox";

const FilterItem = ({ selected, label, number = 0 }) => {
  return (
    <label className={styles.item}>
      <Checkbox checked={selected} outerTag="span" />
      <span className={styles.text}>
        {label} ({number})
      </span>
    </label>
  );
};

export { FilterItem };
