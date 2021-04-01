import Link from "next/link";
import Head from "components/head";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";

import { parseCookies, setCookie, destroyCookie } from "nookies";

import { getSessionId } from "reqests/word";

const isBrowser = () => typeof window !== "undefined"; // 今の環境がSSRかクライアントサイドレンダリングか調べてるらしいです

export default function Home() {
  // 初期状態セット
  useEffect(() => {
    // destroyCookie(null, 'session_id')
    getSessionId();
    // console.log(document.cookie);
    return () => {};
  }, []);

  return (
    <div>
      <Head />

      <main className={styles.main}>
        <Link href="/talk">
          <a>
            <img src="images/top_page.png" />
            <div>click to here</div>
          </a>
          {/* <a>click to here</a> */}
        </Link>
        <Link href="/summary">
          <a>概要</a>
        </Link>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
