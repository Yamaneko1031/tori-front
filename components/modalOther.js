import React from "react";
import ModalMenu from "components/modalMenu";
import styles from "styles/modal.module.css";

const ModalOther = () => {
  return (
    <ModalMenu title="その他">
      <h1>その他</h1>
      <div>
        <p>
          ＜管理人＞
          <br />
          ねこやま
          <br />
          <img className={styles.neko} src="images/neko.png"></img>
        </p>
        <p>
          ＜お問い合わせ先＞
          <br />
          candoanything1031@gmail.com
        </p>
        <p>
          ＜Twitter＞
          <br />
          <a href="https://twitter.com/Nekoyama1031" target="_blank">
            <img className={styles.twitterIcon} src="images/twitter.png"></img>
          </a>
          <br />
          Twitterもやっております。
          <br />
          宜しければフォローしてみてください。
        </p>
      </div>
    </ModalMenu>
  );
};

export default ModalOther;
