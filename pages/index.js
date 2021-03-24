import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  let title = "学習オウム むーちゃん"
  let description = "人の言葉に興味津々なオウムのむーちゃん。言葉を教えてあげると喜びます。"
  let keyword = "keyword"
  let url = "url"
  let image = "https://torichan.app/images/top_page.png"

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta property="og:site_name" content={title} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@tcr_jp" />
        <meta name="twitter:url" content={image} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Head>

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
