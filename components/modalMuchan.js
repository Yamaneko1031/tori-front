import React from "react";
import ModalMenu from "components/modalMenu";
import styles from "styles/modal.module.css";

const ModalExplan = () => {
  return (
    <ModalMenu title="むーちゃんについて">
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
    </ModalMenu>
  );
};

export default ModalExplan;
