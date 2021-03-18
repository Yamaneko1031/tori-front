import Head from "next/head";
import Link from "next/link";

export default function FirstPost() {
  return (
    <>
      <Head>
        <title>プライバシーポリシー</title>
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
