import React, { useEffect, useState, useRef, useCallback } from "react";

import classNames from "classnames";

import styles from "./FakeModal.module.scss";

const STATES = {
  IDLE: "idle",
  CLOSED: "closed",
  OPENING: "opening",
  OPENED: "opened",
  CLOSING: "closing"
};

const FakeModal = ({ isOpen, children, onClose, type = "centred" }) => {
  const [modalState, setModalState] = useState(STATES.CLOSED);
  const timerRef = useRef(0);
  const contentRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("modal-open", !!isOpen);

    if (isOpen && modalState === STATES.CLOSED) {
      clearTimeout(timerRef.current);

      document.body.classList.add(styles.locked);
      document.body.scrollTop = 0;

      setModalState(STATES.IDLE);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setModalState(STATES.OPENING);
        });
      });

      timerRef.current = setTimeout(() => {
        setModalState(STATES.OPENED);
      }, 1000);
    } else if (!isOpen && modalState === STATES.OPENED) {
      clearTimeout(timerRef.current);

      document.body.classList.remove(styles.locked);

      setModalState(STATES.CLOSING);

      timerRef.current = setTimeout(() => {
        setModalState(STATES.CLOSED);
      }, 1000);
    }

    if (modalState === STATES.OPENED) {
      contentRef.current.focus();
    }
  }, [isOpen, modalState, contentRef]);

  useEffect(() => {
    if (isOpen) {
      const onCloseCallback = e => {
        if (e.key === "Escape" && onClose) {
          onClose();
        }
      };

      window.addEventListener("keyup", onCloseCallback);

      contentRef.current.focus();

      return () => window.removeEventListener("keyup", onCloseCallback);
    }
  }, [onClose, isOpen]);

  const onOverlayClick = useCallback(
    e => {
      if (e.target.classList.contains(styles.overlay)) {
        onClose();
      }
    },
    [onClose]
  );

  const onOverlayPress = useCallback(
    e => {
      if (e.target.classList.contains(styles.overlay) && e.keyCode === 13) {
        onClose();
      }
    },
    [onClose]
  );

  const cls = classNames(
    styles.overlay,
    {
      [styles.open]: isOpen
    },
    [styles[modalState]],
    [styles[type]]
  );

  return (
    <div
      className={cls}
      onClick={onOverlayClick}
      onKeyUp={onOverlayPress}
      role="button"
      tabIndex={0}
    >
      <div className={styles.modal} ref={contentRef}>
        {children}
      </div>
    </div>
  );
};

export default FakeModal;
