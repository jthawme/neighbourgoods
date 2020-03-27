import React from "react";

import ReactModal from "react-modal";
import styles from "./Modal.module.scss";

ReactModal.setAppElement("#___gatsby");
const Modal = ({ isOpen, children, onClose }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      overlayClassName={{
        base: styles.overlay,
        beforeClose: styles.overlayBeforeClose,
        afterOpen: styles.overlayAfterOpen
      }}
      className={{
        base: styles.modal,
        beforeClose: styles.modalBeforeClose,
        afterOpen: styles.modalAfterOpen
      }}
      closeTimeoutMS={1000}
      onRequestClose={onClose}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
