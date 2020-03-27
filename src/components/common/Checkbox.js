import React from "react";
import classNames from "classnames";

import styles from "./Checkbox.module.scss";

const Checkbox = ({ checked, className, outerTag: El = "label" }) => {
  const cls = classNames(styles.checkbox, className, {
    [styles.checked]: checked
  });

  return (
    <El className={cls}>
      <input type="checkbox" checked={checked} />
    </El>
  );
};

export default Checkbox;
