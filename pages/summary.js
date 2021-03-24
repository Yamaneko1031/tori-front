import Head from "next/head";
import Link from "next/link";

import { useEffect } from "react";
import { useState } from "react";

import SelectAnswer from "components/selectAnswer";
import InputAnswer from "components/inputWord";

import { useRecoilState } from "recoil";
import { talkState, talkStateSelector } from "state/talkState";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";

import MuchanSpeak from "components/muchanSpeak";

import { answerTextAtom } from "state/talkState";

import { getWord } from "reqests/word";
import { getSessionId, testRequest } from "reqests/system";

let session_id = "";

export default function Summary() {
  // const [state, setState] = useRecoilState(talkState);
  const [test, settest] = useState(false);
  const answerText = useRecoilValue(answerTextAtom);
  // const state = useSetRecoilState(testState);

  // 初期状態セット
  useEffect(() => {
    settest("");
    // console.log("useEffect:Summary Render:" + test + state)
    console.log("useEffect:Summary Render:" + test);
    return () => {
      console.log("useEffect:Summary Unmount");
    };
  }, []);

  console.log("Call:Summary");

  function list_draw() {
    if (test) {
      return <SelectAnswer answerList={["aaa", "bbb", "ccc"]} />;
    } else {
      return (
        <div>
          <SelectAnswer answerList={["aaa", "bbb", "ccc"]} />
        </div>
      );
    }
  }

  async function changeState() {
    // console.log("Call:Summary changeState");
    // setState(state+"1")
    // https://muchan-api-6gun3ieocq-an.a.run.app

    //   fetch(apiRoot + "/words", {
    //     method: "POST",
    //     cache: "no-cache",
    //     body: JSON.stringify(data)
    //   })
    //     .then((res) => {
    //       if (!res.ok) {
    //         throw new Error(`${res.status} ${res.statusText}`);
    //       }
    //       return res.json();
    //     })
    //     .then((json) => {
    //       // blob にレスポンスデータが入る
    //       console.log(json);
    //     })
    //     .catch((reason) => {
    //       console.log("reason:" + reason);
    //     });
    //await getWord(answerText);

    console.log("changeState");
  }

  async function changeState1() {
    testRequest();
  }

  async function changeState2() {
    console.log("0:" + session_id);
    let data = await getSessionId(session_id);
    session_id = data["session_id"];
    // settest(data["session_id"]);
    console.log("3:" + session_id);
  }

  let title = "学習オウム むーちゃん summary"
  let description = "人の言葉に興味津々なオウムのむーちゃん。summary"
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
      <h1>使い方</h1>

      {list_draw()}

      <div onClick={changeState1}>{"ボタン1"}</div>
      <div onClick={changeState2}>{"ボタン2"}</div>

      <InputAnswer />

      <MuchanSpeak
        pause="nomal"
        strings="こんにちわ！あそｄふぁおｄふぁｊｄふぃあじぇいあじｄｊふぃあｊｄ"
      />

      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  );
}
