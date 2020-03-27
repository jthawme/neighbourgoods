import React from "react";
import { Loader } from "react-feather";

import styles from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <span className={styles.loader}>
      <Loader />
    </span>
  );
};

export default Spinner;
