import React, { useState, useEffect, useCallback, useMemo } from "react";

import Modal from "../common/Modal";
import { useSelector, useDispatch } from "react-redux";
import Emoji from "a11y-react-emoji";

import styles from "./LinksPickup.module.scss";
import CloseIcon from "../common/CloseIcon";
import { removeCurrentLinks } from "../../store/actions/location";
import { LINK_CATEGORIES, LINK_TYPES } from "../../cms/constants";
import DeliverooImage from "../../img/types/deliveroo.png";
import UberEatsImage from "../../img/types/ubereats.png";
import JustEatImage from "../../img/types/justeat.png";

const getIcon = type => {
  switch (type) {
    case LINK_TYPES.DELIVEROO:
      return <img src={DeliverooImage} alt="" />;
    case LINK_TYPES.JUST_EAT:
      return <img src={JustEatImage} alt="" />;
    case LINK_TYPES.UBER_EATS:
      return <img src={UberEatsImage} alt="" />;
    case LINK_TYPES.EMAIL:
      return <Emoji symbol="✉️" />;
    case LINK_TYPES.PHONE:
      return <Emoji symbol="📞" />;
    case LINK_TYPES.VOUCHER:
      return <Emoji symbol="🎉" />;
    case LINK_TYPES.DONATION:
      return <Emoji symbol="❤️" />;
    default:
      return <Emoji symbol="🌐" />;
  }
};

const LinkItem = ({ link, label, type }) => {
  const fullLink = useMemo(() => {
    if (type === LINK_TYPES.EMAIL) {
      return `mailto:${link}`;
    }

    if (type === LINK_TYPES.PHONE) {
      return `tel:${link}`;
    }

    return link.indexOf("?") >= 0
      ? `${link}&ref=neighbourgoods`
      : `${link}?ref=neighbourgoods`;
  }, [type, link]);

  return (
    <a
      href={fullLink}
      className={styles.link}
      target="_blank"
      rel="noreferrer noopener"
    >
      <span className={styles.icon}>{getIcon(type)}</span> {label}
    </a>
  );
};

const LinksPickup = () => {
  const dispatch = useDispatch();
  const currentLinks = useSelector(state => state.location.currentLinks);
  const [internalInfo, setInternalInfo] = useState(false);

  useEffect(() => {
    if (currentLinks) {
      setInternalInfo(currentLinks);
    }
  }, [currentLinks]);

  const onRemove = useCallback(() => {
    dispatch(removeCurrentLinks());
  }, [dispatch]);

  return (
    <Modal isOpen={!!currentLinks} onClose={onRemove}>
      {!!internalInfo && (
        <div className={styles.container}>
          <CloseIcon onClick={onRemove} />

          <div className={styles.info}>
            <span className={styles.subtitle}>
              {internalInfo.category === LINK_CATEGORIES.ORDER
                ? "Order Delivery"
                : "Offer Support"}
            </span>
            <h1>{internalInfo.name}</h1>
          </div>

          <ul className={styles.links}>
            {internalInfo.links.map(item => {
              return (
                <li key={item.link}>
                  <LinkItem {...item} />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </Modal>
  );
};

export default LinksPickup;
