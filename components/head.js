// import * as React from 'react';
import Head from "next/head";

// Head.defaultProps = {
//   title: "学習オウム むーちゃん",
//   description:
//     "人の言葉に興味津々なオウムのむーちゃん。みんなで言葉を教えてあげましょう。",
//   keyword: "オウム,むーちゃん,学習,言葉,覚える",
//   url: "https://torichan.app",
//   image: "https://torichan.app/images/top_page.png"
// };

export default function ({
  title = "学習オウム むーちゃん",
  description = "人の言葉に興味津々なオウムのむーちゃん。みんなで言葉を教えてあげましょう。",
  keyword = "オウム,むーちゃん,学習,言葉,覚える",
  url = "https://torichan.app",
  image = "https://torichan.app/images/top_page.png"
}) {
  return (
    <Head>
      <title>{title}</title>
      {/* <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0" /> */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="keywords" content={keyword} />
      <meta property="og:type" content="blog" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={title} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@tcr_jp" />
      <meta name="twitter:url" content={image} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
      {/* <link rel="shortcut icon" href={'https://t-cr.jp/favicon.ico'} />
      <link rel="apple-touch-icon" href={'https://t-cr.jp/logo.png'} /> */}
    </Head>
  );
}
