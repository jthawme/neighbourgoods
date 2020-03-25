import React, { useMemo } from "react";
import PropTypes from "prop-types";

import styles from "./LocationCard.module.scss";
import {
  LINK_TYPES,
  LINK_ICONS,
  CATEGORIES,
  CATEGORY_TYPES
} from "../../cms/constants";
import Emoji from "a11y-react-emoji";
import { isOpen, getCloseTime } from "../../utils/time";

const LocationCard = ({ name, links, image, type, times = [] }) => {
  const typeLabel = useMemo(() => {
    return CATEGORIES.find(c => c.value === type)?.label;
  }, [type]);

  const isCurrentlyOpen = useMemo(() => {
    return isOpen(times);
  }, [times]);

  const closeTime = useMemo(() => {
    return getCloseTime(times);
  }, [times]);

  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        style={image ? { backgroundImage: `url(${image})` } : {}}
      />
      <div className={styles.content}>
        <span className={styles.title}>{name}</span>
        <span className={styles.info}>
          <span>{typeLabel}</span>
        </span>
        <span className={styles.info}>
          <span>{isCurrentlyOpen ? "Open" : "Closed"}</span>
          {closeTime && <span>Closes {closeTime}</span>}
        </span>
        {links && (
          <ul className={styles.links}>
            {links.map(item => (
              <li key={item.link}>
                <a target="_blank" rel="noreferrer noopener" href={item.link}>
                  <Emoji symbol={LINK_ICONS[item.type]} /> {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

LocationCard.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.keys(CATEGORY_TYPES)).isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      label: PropTypes.string,
      link: PropTypes.string
    })
  ),
  times: PropTypes.arrayOf(
    PropTypes.shape({
      close: PropTypes.shape({
        day: PropTypes.number,
        time: PropTypes.string
      }),
      open: PropTypes.shape({
        day: PropTypes.number,
        time: PropTypes.string
      })
    })
  )
};

export default LocationCard;
