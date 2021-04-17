import Link from "next/link";
import Head from "components/head";
import { useEffect } from "react";
// import styles from "../styles/toppage.module.css";
import Menu from "components/menu";
import TalkMain from "components/talkMain";
import styles from "styles/content.module.css";

import { getSessionId } from "reqests/word";

export default function Home() {
  // 初期状態セット
  useEffect(() => {
    getSessionId();
    return () => {};
  }, []);

  return (
    <div>
      <Head title="会話" viewport="width=420" />

      <div className={styles.TalkBg}>
        <TalkMain />
      </div>

      {/* <Head viewport="width=device-width initial-scale=1.0" />

      <div className={styles.clickArea}>
        <Link href="/talk">
          <a>
            <img src="images/top_page.png" />
            <div>クリックしてね。</div>
          </a>
        </Link>
      </div> */}
    </div>
  );
}
