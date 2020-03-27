import React from "react";

import classNames from "classnames";
import styles from "./Container.module.scss";

const InputContainer = ({
  label,
  focused,
  disabled,
  children,
  hide,
  tag: El = "label"
}) => {
  const cls = classNames(
    styles.label,
    {
      [styles.inactive]: !focused
    },
    {
      [styles.disabled]: disabled
    }
  );

  return (
    <El className={cls}>
      {!hide && <span className={styles.title}>{label}</span>}

      {children}
    </El>
  );
};

export default InputContainer;
