import React, { useState } from "react";

import inputStyles from "./Input.module.scss";
import styles from "./Select.module.scss";
import InputContainer from "./Container";

const Select = ({
  label,
  value,
  rightSlot,
  disabled,
  labelProps = {},
  onValueChange = () => {},
  options,
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <InputContainer
      label={label}
      focused={focused || (value && value.trim() !== "")}
      disabled={disabled}
      {...labelProps}
    >
      <select
        className={inputStyles.input}
        type="text"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        disabled={disabled}
        value={value}
        onChange={e => onValueChange(e.target.value)}
        {...props}
      >
        <option value=""> </option>
        {options.map(item => (
          <option key={item.value} value={item.value} className={styles.option}>
            {item.label}
          </option>
        ))}
      </select>
      {rightSlot || null}
    </InputContainer>
  );
};

export default Select;
