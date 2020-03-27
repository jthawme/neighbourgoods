import React from "react";

import styles from "./FormRow.module.scss";

const FormRow = ({ title, subtitle, children, number = 1 }) => {
  return (
    <div className={styles.row}>
      <div className={styles.content}>
        <span className={styles.number}>{number}</span>
        <h2 className={styles.title}>{title}</h2>
        {subtitle ? <span className={styles.subtitle}>{subtitle}</span> : null}
        {children}
      </div>
    </div>
  );
};

export default FormRow;
