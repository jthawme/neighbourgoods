import React, { useCallback } from "react";

import Checkbox from "./Checkbox";
import InputContainer from "./Container";

import styles from "./CheckboxGroup.module.scss";

const CheckboxGroup = ({
  value = [],
  label,
  options,
  onChange = () => {},
  disabled
}) => {
  const onToggleChange = useCallback(
    (checked, checkboxValue) => {
      const idx = value.indexOf(checkboxValue);
      const curr = value.slice();

      if (idx >= 0) {
        curr.splice(idx, 1);
      } else {
        curr.push(checkboxValue);
      }

      onChange(curr);
    },
    [value, onChange]
  );

  return (
    <InputContainer label={label} tag="span" focused disabled={disabled}>
      <ul className={styles.list}>
        {options.map(item => (
          <li key={item.value}>
            <Checkbox
              label={item.label}
              checked={value.includes(item.value)}
              onChange={onToggleChange}
              value={item.value}
            />
          </li>
        ))}
      </ul>
    </InputContainer>
  );
};

export default CheckboxGroup;
