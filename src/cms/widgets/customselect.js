import React, { useCallback } from "react";
import styled from "styled-components";

const SelectWrapper = styled.select`
  display: block;
  width: 100%;
`;

const CustomSelect = ({ value = "", onChange, options, multiple }) => {
  const onInternalChange = useCallback(
    e => {
      if (!multiple) {
        onChange(e.target.value);
      } else {
        const safeValue = value ? value.split(",") : [];
        const idx = safeValue.indexOf(e.target.value);
        if (idx >= 0) {
          safeValue.splice(idx, 1);
          onChange(safeValue.join(","));
        } else {
          onChange([...safeValue, e.target.value].join(","));
        }
      }
    },
    [multiple]
  );
  return (
    <SelectWrapper
      value={multiple ? value.split(",") : value}
      onChange={onInternalChange}
      multiple={multiple}
    >
      {options.map(item => (
        <option value={item.value}>{item.label}</option>
      ))}
    </SelectWrapper>
  );
};

export default CustomSelect;
