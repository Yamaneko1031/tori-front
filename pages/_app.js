import { useEffect } from "react";
import { useRouter } from "next/router";
import { RecoilRoot } from "recoil";
import * as gtag from "../util/gtag";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  useEffect(() => {
    if (window.adsbygoogle && process.env.NODE_ENV !== "development") {
      window.adsbygoogle.push({
        google_ad_client: "ca-pub-6473717830087020",
        enable_page_level_ads: true,
        overlays: { bottom: true }
      });
    }
  }, []);
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
