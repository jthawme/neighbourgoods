import React from "react";

import styles from "./Header.module.scss";
import { HelpCircle } from "react-feather";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Neighbourgoods</h1>
      <button className={styles.aboutButton}>
        <HelpCircle />
      </button>
    </header>
  );
};

export default Header;
