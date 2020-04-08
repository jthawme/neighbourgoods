import React, { useRef, useEffect } from "react";

import CloseIcon from "../common/CloseIcon";
import styles from "./AboutContent.module.scss";

import { instagramLink } from "../../utils/share";
import Instagram from "../../svg/instagram.svg";

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
      <CloseIcon onClick={onClose} alt />
      <div className={styles.text}>
        <p>
          We love London — particularly the small businesses that make our
          streets and neighbourhoods so special. Since COVID-19 began,
          restaurants, cafés and independent merchants have been forced to adapt
          their businesses to support themselves and their staff. We wanted to
          do something to help, so we created Neighbourgoods — a community-built
          map that lists the small businesses in your local area and how you can
          support them.
        </p>
        <p>
          But we need your help to do it. If you know of any small businesses
          nearby that you can’t imagine your streets without, please take a
          moment to add them to the map. Thank you.
        </p>
      </div>

      <footer>
        <a href="mailto:hello@neighbourgoods.london">
          hello@neighbourgoods.london
        </a>
        <a
          className={styles.social}
          target="_blank"
          rel="noreferrer noopener"
          href={instagramLink()}
        >
          <Instagram />
        </a>
      </footer>
    </aside>
  );
};

export default AboutContent;
