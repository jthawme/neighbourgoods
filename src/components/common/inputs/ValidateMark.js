import React from "react";

import { Check, X } from "react-feather";

import styles from "./ValidateMark.module.scss";

const ValidateMark = ({ validated }) => {
  console.log(validated);
  return (
    <span
      className={`${styles.circle} ${styles[validated ? "success" : "fail"]}`}
    >
      {validated ? <Check /> : <X />}
    </span>
  );
};

export default ValidateMark;
