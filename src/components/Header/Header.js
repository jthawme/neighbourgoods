import React from "react";

import { HelpCircle } from "react-feather";
import Logo from "./Logo";

import styles from "./Header.module.scss";

const Header = ({ onOpenAbout }) => {
  return (
    <header className={styles.header}>
      <Logo className={styles.logo} />
      <button className={styles.aboutButton} onClick={onOpenAbout}>
        <HelpCircle />
      </button>
    </header>
  );
};

export default Header;
