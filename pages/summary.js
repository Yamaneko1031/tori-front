import Head from "next/head";
import Link from "next/link";

import { useEffect } from "react";
import { useState } from "react";

import SelectAnswer from "components/selectAnswer";
import InputAnswer from "components/inputAnswer";

import { useRecoilState } from "recoil";
import { talkState, talkStateSelector } from "state/talkState";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";

import MuchanSpeak from "components/muchanSpeak";

import { answerTextAtom } from "state/talkState";

import { getWord } from "reqests/word";

export default function Summary() {
  // const [state, setState] = useRecoilState(talkState);
  const [test, settest] = useState(false);
  const answerText = useRecoilValue(answerTextAtom);
  // const state = useSetRecoilState(testState);

  // 初期状態セット
  useEffect(() => {
    // console.log("useEffect:Summary Render:" + test + state)
    console.log("useEffect:Summary Render:" + test);
    return () => {
      console.log("useEffect:Summary Unmount");
    };
  });

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
    await getWord(answerText);
    console.log("changeState")
  }

  return (
    <>
      <Head>
        <title>使い方</title>
      </Head>
      <h1>使い方</h1>

      {list_draw()}

      <div onClick={changeState}>{"post"}</div>

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
