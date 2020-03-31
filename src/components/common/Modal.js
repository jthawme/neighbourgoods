import React from "react";

import ReactModal from "react-modal";
import classNames from "classnames";

import styles from "./Modal.module.scss";

ReactModal.setAppElement("#___gatsby");
const Modal = ({ isOpen, children, onClose, type = "centred" }) => {
  const cls = classNames(styles.overlay, styles[type]);

  const modalCls = classNames(styles.modal, styles[type]);

  return (
    <ReactModal
      isOpen={isOpen}
      overlayClassName={{
        base: cls,
        beforeClose: styles.overlayBeforeClose,
        afterOpen: styles.overlayAfterOpen
      }}
      className={{
        base: modalCls,
        beforeClose: styles.modalBeforeClose,
        afterOpen: styles.modalAfterOpen
      }}
      closeTimeoutMS={750}
      onRequestClose={onClose}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
