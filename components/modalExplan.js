import React from "react";
import Modal from "react-modal";
import styles from "styles/modal.module.css";
import menuStyles from "styles/menu.module.css";

const customStyles = {
  overlay: {
    zIndex: 200,
    backgroundColor: "rgba(0,0,0,0.70)"
  },
  content: {
    top: "20%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const ModalExplan = () => {
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // console.log("aaaa");
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <div className={menuStyles.clickArea} onClick={openModal}>
        説明
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
          <h2>説明</h2>
          <p>
            むーちゃんは人の言葉に興味津々です。
            <br />
            是非むーちゃんに言葉を教えてあげてください。
            <br />
            <br />
            分からない言葉が多くて、たくさん質問されるかもしれませんが、怒らないで優しく対応してあげてください。
            <br />
            <br />
            むーちゃんは新しい言葉を覚えると嬉しくてtwitterで呟いたりします。
            <br />
            <br />
            人を傷つけるような言葉は教えないようお願いします。
          </p>
        </div>
        <div className={styles.btnClose} onClick={closeModal}>
          ×
        </div>
      </Modal>
    </div>
  );
};

export default ModalExplan;
