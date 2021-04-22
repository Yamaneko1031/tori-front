import Document, { Html, Head, Main, NextScript } from "next/document";

import { GA_TRACKING_ID } from "../util/gtag";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
            }}
          />
          {/* <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_AD_ID}`}
            crossorigin="anonymous"
          ></script> */}
          {/* <script data-ad-client="ca-pub-6473717830087020" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> */}
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
               (adsbygoogle = window.adsbygoogle || []).push({
                   google_ad_client: "ca-pub-6473717830087020",
                   enable_page_level_ads: true
              });
                `
            }}
          />
          {/* <script
            data-ad-client={process.env.NEXT_PUBLIC_AD_ID}
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
