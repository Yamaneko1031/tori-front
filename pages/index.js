import Head from "components/head";
import { useEffect } from "react";
import TalkMain from "components/talkMain";
import styles from "styles/content.module.css";
import Link from "next/link";

import { getSessionId } from "reqests/word";

import AdBanner from "components/ads";

export default function Home() {
  // 初期状態セット
  useEffect(() => {
    getSessionId();
    return () => {};
  }, []);

  return (
    <>
      <Head viewport="width=420" />
      {/* <div>
        <img className="TOP" src="images/mente.png" />
      </div> */}
      {/* <div>
        <h1>学習オウムむーちゃん</h1>
        <img className="TOP" src="images/top_page.png" />
        <Link href="/talk">
          <a>ログイン</a>
        </Link>
      </div> */}
      <div>
        <Head viewport="width=420" />

        <div className={styles.TalkBg}>
          <TalkMain />
        </div>
      </div>
    </>
  );
}
