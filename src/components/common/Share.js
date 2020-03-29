import React from "react";

import { Twitter } from "react-feather";
import { tweetLink } from "../../utils/share";

import styles from "./Share.module.scss";

const Share = () => {
  return (
    <ul className={styles.list}>
      <li>
        <a href={tweetLink()} target="_blank" rel="noreferrer noopener">
          <Twitter />
        </a>
      </li>
    </ul>
  );
};

export default Share;
