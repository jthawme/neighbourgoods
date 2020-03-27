import React, { useCallback } from "react";
import classNames from "classnames";

import styles from "./Checkbox.module.scss";

const Checkbox = ({
  checked,
  className,
  outerTag: El = "label",
  label,
  onChange,
  value
}) => {
  const cls = classNames(styles.container, className, {
    [styles.checked]: checked
  });

  const onCheckboxChange = useCallback(
    e => {
      onChange(e.target.checked, value);
    },
    [onChange, value]
  );

  return (
    <El className={cls}>
      <span className={styles.checkbox}>
        <input
          type="checkbox"
          checked={checked}
          value={value}
          onChange={onCheckboxChange}
        />
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </El>
  );
};

export default Checkbox;
