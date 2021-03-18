import Head from "next/head";
import Link from "next/link";
import MuchanSpeak from "components/muchanSpeak";
import SelectAnswer from "components/selectAnswer";
import InputAnswer from "components/inputAnswer";

import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";

import { talkState, setTalkState } from "state/talkState";
import { typewriteStateEnd } from "state/talkState";
import { answerTextAtom } from "state/talkState";

export default function Talk() {
  const [state, setState] = useRecoilState(talkState);
  const getTypewriteStateEnd = useRecoilValue(typewriteStateEnd);
  const answerText = useRecoilValue(answerTextAtom);

  useEffect(() => {
    console.log("Talk");
    return () => {
      console.log("Talk Unmount");
      setState("start");
    };
  }, []);

  return (
    <>
      <Head>
        <title>会話</title>
      </Head>

      {(function () {
        let items = [];
        if (state === "start") {
          console.log("start");
          items.push(
            <MuchanSpeak
              key={state}
              pause="nomal"
              strings="こんにちは！<br>むーちゃんです！<br>知らない言葉を教えてほしい！！"
            />
          );
          if (getTypewriteStateEnd) {
            console.log("start getTypewriteStateEnd");
            items.push(
              <SelectAnswer
                key="answer"
                answerList={["聞きたい事ある？", "教えてあげる！"]}
                nextState="select"
              />
            );
          }
        } else if (state === "select") {
          console.log("select");
          if (answerText == "聞きたい事ある？") {
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
              strings={answerText + "<br>おいしいいいいいい"}
            />
          );
        } else {
          items.push(
            <MuchanSpeak
              key={state}
              pause="nomal"
              strings={answerText + "<br>むずかしいいいいいい！"}
            />
          );
        }
        return items;
      })()}

      <Link href="/">
        <a>Back to home</a>
      </Link>
    </>
  );
}
