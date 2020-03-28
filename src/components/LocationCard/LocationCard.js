import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Emoji from "a11y-react-emoji";
import { useDispatch } from "react-redux";

import styles from "./LocationCard.module.scss";
import {
  CATEGORIES,
  CATEGORY_TYPES,
  LINK_CATEGORY_ICONS,
  LINK_CATEGORIES
} from "../../cms/constants";
import { isOpen, getCloseTime, getOpenTime } from "../../utils/time";
import { getOrderLinks, getSupportLinks } from "../../utils/links";
import { setCurrentLinks } from "../../store/actions/location";

const LocationCard = ({ name, links, image, type, times = [], className }) => {
  const dispatch = useDispatch();

  const typeLabel = useMemo(() => {
    return CATEGORIES.find(c => c.value === type)?.label;
  }, [type]);

  const isCurrentlyOpen = useMemo(() => {
    return isOpen(times);
  }, [times]);

  const openTime = useMemo(() => {
    return getOpenTime(times);
  }, [times]);

  const closeTime = useMemo(() => {
    return getCloseTime(times);
  }, [times]);

  const orderLinks = useMemo(() => {
    return getOrderLinks(links);
  }, [links]);

  const supportLinks = useMemo(() => {
    return getSupportLinks(links);
  }, [links]);

  const setOrderLinks = useCallback(() => {
    dispatch(setCurrentLinks(name, LINK_CATEGORIES.ORDER, orderLinks));
  }, [dispatch, name, orderLinks]);

  const setSupportLinks = useCallback(() => {
    dispatch(setCurrentLinks(name, LINK_CATEGORIES.SUPPORT, supportLinks));
  }, [dispatch, name, supportLinks]);

  const cls = classNames(styles.card, className);

  return (
    <div className={cls}>
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
          {!isCurrentlyOpen && openTime && <span>Opens {openTime}</span>}
          {isCurrentlyOpen && closeTime && <span>Closes {closeTime}</span>}
        </span>
        {links && (
          <div className={styles.links}>
            {!!orderLinks.length && (
              <button onClick={setOrderLinks} className={styles.linksButton}>
                <Emoji symbol={LINK_CATEGORY_ICONS.order} /> Order Delivery
              </button>
            )}
            {!!supportLinks.length && (
              <button onClick={setSupportLinks} className={styles.linksButton}>
                <Emoji symbol={LINK_CATEGORY_ICONS.support} /> Offer Support
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

LocationCard.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(Object.values(CATEGORY_TYPES)).isRequired,
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
