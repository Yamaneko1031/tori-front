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
        説明
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <h2>説明</h2>
        <div>
            むーちゃんは人の言葉に興味津々です。
        </div>
        <div>
            是非むーちゃんに言葉を教えてあげてください。
        </div>
        <div>
            分からない言葉多くて、たくさん質問されるかもしれませんが、
        </div>
        <div>
            怒らないで優しく対応してあげてください。
        </div>
        <br />
        <div>
            人を傷つけるような言葉は教えないようにしてください。
        </div>
        <div onClick={closeModal}>
          閉じる
        </div>
      </Modal>
    </div>
  );
};

export default ModalExplan;
