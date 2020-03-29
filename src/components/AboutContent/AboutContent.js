import React, { useRef, useEffect } from "react";

import CloseIcon from "../common/CloseIcon";
import styles from "./AboutContent.module.scss";

const tweetLink = () => {
  const tweet = {
    url: "https://neighbourgoods.london",
    text: "Support your local independents, find them on this map",
    hashtags: "neighbourgoods"
  };

  return [
    "https://twitter.com/intent/tweet?",
    `url=${tweet.url}`,
    "&",
    `text=${tweet.text}`,
    "&",
    `hashtags=${tweet.hashtags}`
  ].join("");
};

const AboutContent = ({ onClose, open }) => {
  const elRef = useRef(null);

  useEffect(() => {
    if (open && elRef.current) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          elRef.current.scrollTop = 0;
        });
      });
    }
  }, [open, elRef]);

  return (
    <aside ref={elRef} className={styles.wrapper}>
      <CloseIcon onClick={onClose} />
      <div className={styles.text}>
        <p>
          COVID-19 has already caused a lot of disruption to London,
          particularly to the small bars and eateries that make our city so
          great. Unfortunately, these are also the ones that are most at risk
          having lost their steady income. We couldn’t imagine London without
          them so wanted to help them with the rapid efforts they’ve already
          made in these unprecedented circumstances.
        </p>
        <p>
          Neighbourgoods is a community built network of small bars and eateries
          across London. We have gathered them here so people can find and
          support their local restaurants, bars, brewers, winers and grocers
          through these difficult times.
        </p>
        <p>
          But we can’t do it all ourselves. If you have any independent local
          favourites you can’t imagine London without, please add them to the
          map.
        </p>
      </div>

      <footer>
        <a href="mailto:hello@neighbourgoods.com">hello@neighbourgoods.com</a>
        <a target="_blank" rel="noreferrer noopener" href={tweetLink()}>
          #neighbourgoods
        </a>
      </footer>
    </aside>
  );
};

export default AboutContent;
