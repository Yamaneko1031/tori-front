import Head from "next/head";
import Link from "next/link";
import MuchanSpeak from "components/muchanSpeak";
import SelectAnswer from "components/selectAnswer";
import InputAnswer from "components/inputAnswer";
import InputMean from "components/inputMean";

import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";

import { talkState, setTalkState } from "state/talkState";
import { typewriteStateEnd } from "state/talkState";
import { answerTextAtom } from "state/talkState";

import { getWord } from "reqests/word";

export default function Talk() {
  const [state, setState] = useRecoilState(talkState);
  const getTypewriteStateEnd = useRecoilValue(typewriteStateEnd);
  const answerText = useRecoilValue(answerTextAtom);

  // let apiRoot = "https://muchan-api-6gun3ieocq-an.a.run.app";
  // const data = {
  //   word: "コップ",
  //   mean: "飲み物を入れる器",
  //   tag_list: ["便利", "小さい"]
  // };
  // let response = await fetch(apiRoot + "/words", {
  //   method: "POST",
  //   cache: "no-cache",
  //   body: JSON.stringify(data)
  // })

  useEffect(() => {
    console.log("Talk");
    return () => {
      console.log("Talk Unmount");
      setState("start");
    };
  }, []);

  function content() {
    let items = [];
    if (state === "start") {
      console.log("start");
      items.push(
        <MuchanSpeak
          key={state}
          pause="nomal"
          strings="こんにちは。<br>むーちゃんです。<br>一緒に遊んでほしいな。"
        />
      );
      if (getTypewriteStateEnd) {
        console.log("start getTypewriteStateEnd");
        items.push(
          <SelectAnswer
            key="answer"
            answerList={["お話する", "言葉を教えてあげる"]}
            nextState="select"
          />
        );
      }
    } else if (state === "select") {
      console.log("select");
      if (answerText.text == "お話する") {
        items.push(
          <MuchanSpeak
            key={state}
            pause="nomal"
            strings={"ポテトチップって何？"}
          />
        );
        if (getTypewriteStateEnd) {
          items.push(
            <SelectAnswer
              key="answer"
              answerList={["じゃがいも", "サツマイモ", "鶏肉"]}
              nextState="act1"
            />
          );
        }
      } else {
        items.push(
          <MuchanSpeak
            key={state}
            pause="nomal"
            strings={"やったー！<br>何を教えてくれるの？"}
          />
        );
        if (getTypewriteStateEnd) {
          items.push(<InputAnswer key="answer" nextState="act2" />);
        }
      }
    } else if (state === "act1") {
      items.push(
        <MuchanSpeak
          key={state}
          pause="nomal"
          strings={answerText.text + "<br>おいしいいいいいい"}
        />
      );
    } else if (state === "act2") {
      let text = "";
      if (answerText.response) {
        console.log(answerText.response);
        text =
          answerText.text +
          "は知ってるの！<br>「" +
          answerText.response["mean"] +
          "」<br>のことだよ！むーちゃん偉い？？";
        items.push(<MuchanSpeak key={state} pause="nomal" strings={text} />);
        if (getTypewriteStateEnd) {
          items.push(
            <SelectAnswer
              key="answer"
              answerList={["お話する", "言葉を教えてあげる"]}
              nextState="select"
            />
          );
        }
      } else {
        text = answerText.text + "は知らないの。どういう意味なの？？";
        items.push(<MuchanSpeak key={state} pause="nomal" strings={text} />);
        if (getTypewriteStateEnd) {
          items.push(
            <InputMean key="answer" word={answerText.text} nextState="act3" />
          );
        }
      }
    } else if (state === "act3") {
      items.push(
        <MuchanSpeak
          key={state}
          pause="nomal"
          strings={answerText.word + "は" + answerText.text + "の事なんだね！"}
        />
      );
      if (getTypewriteStateEnd) {
        items.push(
          <SelectAnswer
            key="answer"
            answerList={["お話する", "言葉を教えてあげる"]}
            nextState="select"
          />
        );
      }
    }

    return items;
  }

  return (
    <>
      <Head>
        <title>会話</title>
      </Head>

      {content()}

      <Link href="/">
        <a>Back to home</a>
      </Link>
    </>
  );
}
