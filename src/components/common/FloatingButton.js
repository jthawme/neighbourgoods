import React from "react";
import { Plus } from "react-feather";
import classNames from "classnames";

import styles from "./FloatingButton.module.scss";

const FloatingButton = ({ icon, text, className, ...props }) => {
  const cls = classNames(styles.container, className);

  return (
    <div className={cls}>
      <button className={styles.button} {...props}>
        <span className={styles.icon}>
          {icon ? icon : <Plus size="12px" />}
        </span>
        <span className={styles.text}>{text}</span>
      </button>
    </div>
  );
};

export default FloatingButton;
