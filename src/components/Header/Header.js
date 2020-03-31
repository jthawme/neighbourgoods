import React from "react";

import Question from "../../svg/question.svg";

import styles from "./Header.module.scss";

const Header = ({ onOpenAbout }) => {
  return (
    <header className={styles.header}>
      <button className={styles.aboutButton} onClick={onOpenAbout}>
        <Question />
      </button>
    </header>
  );
};

export default Header;
