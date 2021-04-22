import React from "react";
import Modal from "react-modal";
import { useEffect } from "react";
import * as gtag from "util/gtag";

import styles from "styles/modal.module.css";
import menuStyles from "styles/menu.module.css";

function ModalMenu(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  
  useEffect(() => {
    gtag.event({
      action: 'ModalOpen',
      category: 'Open',
      label: props.title,
    })
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <div className={menuStyles.clickArea} onClick={openModal}>
        {props.title}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className={styles.modal}
        overlayClassName={styles.modalOverlay}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className={styles.drawArea}>
          {props.children}
        </div>
        <div className={styles.btnClose} onClick={closeModal}>
          ×
        </div>
      </Modal>
    </div>
  );
};

export default ModalMenu;
