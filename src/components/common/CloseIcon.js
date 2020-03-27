import React from "react";
import { X } from "react-feather";

import styles from "./CloseIcon.module.scss";

const CloseIcon = ({ className, ...props }) => {
  return (
    <button className={`${styles.close} ${className || ""}`} {...props}>
      <X />
    </button>
  );
};

export default CloseIcon;
