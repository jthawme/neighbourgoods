import React from "react";

import styles from "./Toast.module.scss";
import { X } from "react-feather";

const Toast = ({
  appearance,
  children,
  onDismiss,
  transitionState,
  ...props
}) => {
  return (
    <div
      className={`${styles.toast} ${styles[appearance]} ${styles[transitionState]}`}
      onClick={onDismiss}
      role="button"
    >
      {children} <X />
    </div>
  );
};

export default Toast;
