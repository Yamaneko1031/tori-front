import Head from "components/head";
import { useEffect } from "react";
import TalkMain from "components/talkMain";
import styles from "styles/content.module.css";

import { getSessionId } from "reqests/word";

import AdBanner from "components/ads";

export default function Home() {
  // 初期状態セット
  useEffect(() => {
    getSessionId();
    return () => {};
  }, []);

  return (
    <div>
      <Head viewport="width=420" />

      <div className={styles.TalkBg}>
        <TalkMain />
      </div>
    </div>
  );
}
