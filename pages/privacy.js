import Head from "next/head";
import Link from "next/link";

export default function FirstPost() {
  let title = "学習オウム むーちゃん プライバシーポリシー"
  let description = "人の言葉に興味津々なオウムのむーちゃん。プライバシーポリシー"
  let keyword = "keyword2"
  let url = "url2"
  let image = "images/twitter_card.png"

  return (
    <>
      <Head>
        <title>{title}</title>

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
      <h1>プライバシーポリシー</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
      <img src="/images/neko2.png" />
    </>
  );
}
