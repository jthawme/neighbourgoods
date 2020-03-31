import React from "react";

import Cross from "../../svg/cross.svg";

import styles from "./CloseIcon.module.scss";

const CloseIcon = ({ className, alt, ...props }) => {
  return (
    <button
      type="button"
      className={`${styles.close} ${alt && styles.alt} ${className || ""}`}
      {...props}
    >
      <Cross />
    </button>
  );
};

export default CloseIcon;
