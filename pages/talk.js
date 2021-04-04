// import Head from "next/head";
import Head from "components/head";
import Menu from "components/menu";
import TalkMain from "components/talkMain";
import { useEffect } from "react";
import styles from "styles/content.module.css";
import { getSessionId } from "reqests/word";

export default function Talk() {
  useEffect(() => {
    getSessionId();
    return () => {
    };
  });

  return (
    <>
      <Head title = "会話" viewport = "width=device-width initial-scale=1.0" />

      <div className={styles.TalkBg}>
        <Menu />
        <TalkMain />
      </div>
    </>
  );
}
