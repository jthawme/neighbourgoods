import React from "react";

import { HelpCircle } from "react-feather";

import styles from "./Header.module.scss";

const Header = ({ onOpenAbout }) => {
  return (
    <header className={styles.header}>
      <button className={styles.aboutButton} onClick={onOpenAbout}>
        <HelpCircle />
      </button>
    </header>
  );
};

export default Header;
