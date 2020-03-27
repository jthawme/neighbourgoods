import React from "react";

import styles from "./FilterItem.module.scss";
import Checkbox from "../common/inputs/Checkbox";

const FilterItem = ({ selected, label, number = 0 }) => {
  return (
    <label className={styles.item}>
      <Checkbox
        checked={selected}
        outerTag="span"
        label={`${label} (${number})`}
      />
    </label>
  );
};

export { FilterItem };
