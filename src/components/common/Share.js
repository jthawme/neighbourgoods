import React from "react";

import { tweetLink, instagramLink } from "../../utils/share";
import Twitter from "../../svg/twitter.svg";
import Instagram from "../../svg/instagram.svg";

import styles from "./Share.module.scss";

const Share = () => {
  return (
    <ul className={styles.list}>
      <li>
        <a href={tweetLink()} target="_blank" rel="noreferrer noopener">
          <Twitter />
        </a>
      </li>
      <li>
        <a href={instagramLink()} target="_blank" rel="noreferrer noopener">
          <Instagram />
        </a>
      </li>
    </ul>
  );
};

export default Share;
