import Link from "next/link";
import React from "react";
import ModalMenu from "components/modalMenu";
import styles from "styles/modal.module.css";

const ModalOther = () => {
  return (
    <ModalMenu title="その他">
      <h1>その他</h1>
      <div>
        <p>
          ＜プライバシーポリシー＞
          <br />
          <Link href="/privacy">
            <a>こちらをお読みください</a>
          </Link>
        </p>
        <p>
          ＜お問い合わせ先＞
          <br />
          <img className={styles.neko} src="images/neko.png"></img>
          <br />
          ねこやま
          muchan.app@gmail.com
        </p>
        <p>
          <a href="https://twitter.com/Nekoyama1031" target="_blank">
            <img className={styles.twitterIcon} src="images/twitter.png"></img>
          </a>
          <br />
          Twitterもやっております。
          <br />
          興味を持っていただけた方はTwitterの方で絡んで頂けますと幸いです。
        </p>
      </div>
    </ModalMenu>
  );
};

export default ModalOther;
