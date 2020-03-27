import React, { useState, useCallback } from "react";

import InputContainer from "./Container";
import ValidateMark from "./ValidateMark";
import styles from "./Input.module.scss";

const Input = ({
  label,
  value,
  leftSlot,
  rightSlot,
  disabled,
  labelProps = {},
  onTextChange = () => {},
  hide,
  validate,
  validateFunc,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [validated, setValidate] = useState(null);

  const onFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const onBlur = useCallback(() => {
    setFocused(false);
    setValidate(validateFunc ? validateFunc(value) : !!value);
  }, [value, validateFunc]);

  return (
    <InputContainer
      label={label}
      focused={focused || value}
      disabled={disabled}
      hide={hide}
      {...labelProps}
    >
      {leftSlot || null}
      <input
        className={`${styles.input} ${hide && styles.hide}`}
        type="text"
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        value={value}
        onChange={e => onTextChange(e.target.value)}
        {...props}
      />
      {rightSlot || null}
      {validate && validated !== null ? (
        <ValidateMark validated={validated} />
      ) : null}
    </InputContainer>
  );
};

export default Input;
