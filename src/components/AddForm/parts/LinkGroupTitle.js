import React from "react";

import styles from "./LinkGroupTitle.module.scss";

const LinkGroupTitle = ({ title }) => {
  return (
    <div className={styles.title}>
      <span>{title}</span>
    </div>
  );
};

export default LinkGroupTitle;
