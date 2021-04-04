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
  image = "https://torichan.app/images/top_page.png",
  viewport = "width=device-width initial-scale=1.0"
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" property="og:content" content={viewport} />
      {/* <meta name="viewport" property="og:content" content="width=device-width initial-scale=1.0 user-scalable=no" /> */}
      {/* <meta name="viewport" property="og:content" content="height=device-height weight=device-width minimum-scale=0.5"  /> */}
      {/* <meta name="viewport" content="initial-scale=1.0, width=device-width" /> */}
      {/* <meta name="viewport" content="width=1000" /> */}
      {/* <meta name="viewport" content="width=device-width initial-scale=1.0 minimum-scale=1.0" /> */}
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

      <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon_package/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon_package/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon_package/favicon-16x16.png" />
      <link rel="manifest" href="/images/favicon_package/site.webmanifest" />
      <link rel="mask-icon" href="/images/favicon_package/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff"></meta>
      
      {/* <link rel="shortcut icon" href={'https://t-cr.jp/favicon.ico'} />
      <link rel="apple-touch-icon" href={'https://t-cr.jp/logo.png'} /> */}
    </Head>
  );
}
