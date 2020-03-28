import React, { useEffect, useState, useRef } from "react";

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
    if (isOpen && modalState === STATES.CLOSED) {
      clearTimeout(timerRef.current);

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
    const onCloseCallback = e => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };

    window.addEventListener("keyup", onCloseCallback);

    return () => window.removeEventListener("keyup", onCloseCallback);
  }, [onClose]);

  const cls = classNames(
    styles.overlay,
    {
      [styles.open]: isOpen
    },
    [styles[modalState]],
    [styles[type]]
  );

  return (
    <div className={cls}>
      <div className={styles.modal} ref={contentRef}>
        {children}
      </div>
    </div>
  );
};

export default FakeModal;
