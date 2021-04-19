import React from "react";
import Modal from "react-modal";
import styles from "styles/modal.module.css";
import menuStyles from "styles/menu.module.css";

const ModalExplan = () => {
  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // subtitle.style.color = "#3ab60b";
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <div className={menuStyles.clickArea} onClick={openModal}>
        むーちゃんについて
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={customStyles}
        className={styles.modal}
        overlayClassName={styles.modalOverlay}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className={styles.drawArea}>
          <p className={styles.name}>名前：むーちゃん</p>
          <img className={styles.image} src="images/muchan_prof.png"></img>
          <p className={styles.profile1}>
            種別：クルマサカオウム
            <br />
            出身：オーストラリア
            <br />
            年齢：５才
          </p>
          <p className={styles.intro}>＜紹介＞</p>
          <p className={styles.profile2}>
            蝶ネクタイがお気に入り。
            <br />
            じゃんけんが好き。
            <br />
            頭を撫でられるとうれしい。
            <br />
            顔をさわられるのは苦手。
          </p>
          <br />
        </div>
        <div className={styles.btnClose} onClick={closeModal}>
          ×
        </div>
      </Modal>
    </div>
  );
};

export default ModalExplan;
