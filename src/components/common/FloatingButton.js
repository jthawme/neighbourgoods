import React from "react";
import classNames from "classnames";

import Plus from "../../svg/plus.svg";

import styles from "./FloatingButton.module.scss";

const FloatingButton = ({ icon, text, className, ...props }) => {
  const cls = classNames(styles.container, className);

  return (
    <div className={cls}>
      <button className={styles.button} {...props}>
        <span className={styles.icon}>{icon ? icon : <Plus />}</span>
        <span className={styles.text}>{text}</span>
      </button>
    </div>
  );
};

export default FloatingButton;
