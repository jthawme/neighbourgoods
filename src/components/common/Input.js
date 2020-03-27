import React, { useState } from "react";

import classNames from "classnames";

import styles from "./Input.module.scss";

const Input = ({
  label,
  value,
  rightSlot,
  disabled,
  onTextChange = () => {},
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  const cls = classNames(
    styles.label,
    {
      [styles.inactive]: !focused && value === ""
    },
    {
      [styles.disabled]: disabled
    }
  );

  return (
    <label className={cls}>
      <span className={styles.title}>{label}</span>
      <input
        type="text"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        value={value}
        onChange={e => onTextChange(e.target.value)}
        {...props}
      />
      {rightSlot || null}
    </label>
  );
};

export default Input;