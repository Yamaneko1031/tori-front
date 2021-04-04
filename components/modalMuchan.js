import React from "react";
import Modal from "react-modal";

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
    // subtitle.style.color = "#3ab60b";
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <div className="testclass" onClick={openModal}>
        むーちゃんについて
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <h2>むーちゃんについて</h2>
        <div>
          クルマサカオウムのむーちゃん。
        </div>
        <div>
          トサカに赤いハートマークがあるのが特徴。
        </div>
        <div>
          蝶ネクタイがお気に入り。
        </div>
        <div>
          ５歳
        </div>
        <div>
          オーストラリア生まれ。
        </div>
        <div>
          じゃんけんが好き。
        </div>
        <br />
        <div onClick={closeModal}>
          閉じる
        </div>
      </Modal>
    </div>
  );
};

export default ModalExplan;
