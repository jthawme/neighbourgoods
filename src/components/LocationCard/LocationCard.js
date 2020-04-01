import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Emoji from "a11y-react-emoji";

import styles from "./LocationCard.module.scss";
import FadeBackgroundImage from "../common/FadeBackgroundImage";
import {
  CATEGORIES,
  CATEGORY_TYPES,
  LINK_CATEGORY_ICONS,
  LINK_CATEGORIES
} from "../../cms/constants";
import { isOpen, getCloseTime, getOpenTime } from "../../utils/time";
import { getOrderLinks, getSupportLinks } from "../../utils/links";

const LocationCard = ({
  name,
  links,
  image,
  type,
  times,
  className,
  highlight,
  onClick,
  onRequest,
  slim,
  doGooder,
  id
}) => {
  const imageObject = useMemo(() => {
    if (typeof image === "string") {
      return {
        image
      };
    }

    return {
      image: image.small,
      largeImage: image.src,
      backgroundColor: image.color
    };
  }, [image]);

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
    onRequest(name, LINK_CATEGORIES.ORDER, orderLinks);
  }, [name, onRequest, orderLinks]);

  const setSupportLinks = useCallback(() => {
    onRequest(name, LINK_CATEGORIES.SUPPORT, supportLinks);
  }, [name, onRequest, supportLinks]);

  const onInternalClick = useCallback(
    e => {
      const isInteractive =
        e.target.tagName === "BUTTON" ||
        e.target.parentElement.tagName === "BUTTON" ||
        e.target.tagName === "A" ||
        e.target.parentElement.tagName === "A";

      if (!isInteractive && onClick) {
        onClick();
      }
    },
    [onClick]
  );

  const cls = classNames(
    styles.card,
    className,
    {
      [styles.highlight]: highlight
    },
    {
      [styles.slim]: slim
    }
  );

  return (
    <div id={id} className={cls} onClick={onInternalClick}>
      <FadeBackgroundImage {...imageObject} className={styles.image}>
        {doGooder && (
          <a
            className={styles.good}
            href={doGooder}
            target="_blank"
            rel="noreferrer noopener"
          >
            <Emoji symbol="😇" />
            Neighbourgreat
          </a>
        )}
      </FadeBackgroundImage>
      <div className={styles.content}>
        <span className={styles.title}>{name}</span>
        <span className={styles.info}>
          <span>{typeLabel}</span>
        </span>
        <span className={styles.info}>
          {times && isCurrentlyOpen && <span>Open</span>}
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
  times: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.arrayOf(
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
  ])
};

export default LocationCard;
