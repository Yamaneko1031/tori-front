import Head from "next/head";
import Link from "next/link";
import MuchanSpeak from "components/muchanSpeak";
import SelectAnswer from "components/selectAnswer";
import InputWord from "components/inputWord";
import InputMean from "components/inputMean";
import WaitTimer from "components/waitTimer";

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

  useEffect(() => {
    console.log("Talk");
    return () => {
      console.log("Talk Unmount");
      setState("開始");
    };
  }, []);

  function setInteraction(interaction) {
    let items = [];
    items.push(interaction.MUCHAN);
    if (getTypewriteStateEnd) {
      items.push(interaction.USER);
    }
    return items;
  }

  function content() {
    let items = [];

    console.log(state);

    switch (state) {
      // 状態 ------------------------------------------------------------------------
      case "開始":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause="happy"
              strings="こんにちは！<br>むーちゃんだよ！<br>たくさんお話しようね！"
            />
          ),
          USER: (
            <WaitTimer key="answer" setTime={1500} nextState="何する選択肢" />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "何する選択肢":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak key={state} pause="nomal" strings="何して遊ぶ？？" />
          ),
          USER: (
            <SelectAnswer
              key="answer"
              answerList={["お話する", "言葉を教えてあげる"]}
              nextState={["お話する", "単語入力"]}
            />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "お話する":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause="nomal"
              strings={"あのね。ちょっと話を聞いてほしいの。"}
            />
          ),
          USER: (
            <WaitTimer
              key="answer"
              setTime={1500}
              nextStateRandom={["気になる単語", "単語の詳細", "最近覚えた単語"]}
            />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "気になる単語":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause="nomal"
              strings={"ちょっと前に「" + "○○" + "」っていう言葉を聞いたの。"}
            />
          ),
          USER: (
            <WaitTimer key="answer" setTime={1500} nextState="何する選択肢" />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "単語の詳細":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause="nomal"
              strings={"「" + "○○" + "」って" + "[形容詞]" + "？"}
            />
          ),
          USER: (
            <WaitTimer key="answer" setTime={1500} nextState="何する選択肢" />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "最近覚えた単語":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause="nomal"
              strings={"最近覚えた単語：まだ実装されてないよ！"}
            />
          ),
          USER: (
            <WaitTimer key="answer" setTime={1500} nextState="何する選択肢" />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "単語入力":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause="nomal"
              strings={"やったー！<br>何を教えてくれるの？"}
            />
          ),
          USER: (
            <InputWord
              key="answer"
              nextStateKnown="単語入力後知っている単語分岐"
              nextStateUnknown="単語入力後知らない単語分岐"
            />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "単語入力後知っている単語分岐":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause="nomal"
              strings={
                answerText.targetWord +
                "は知ってるの！<br>「" +
                answerText.targetMean +
                "」<br>のことだよ！<br>むーちゃん偉い？？"
              }
            />
          ),
          USER: (
            <SelectAnswer
              key="answer"
              answerList={["褒める", "間違いを指摘する"]}
              nextState={["褒める", "間違いを指摘"]}
            />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "単語入力後知らない単語分岐":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause="nomal"
              strings={
                answerText.targetWord + "は知らないの。どういう意味なの？？"
              }
            />
          ),
          USER: (
            <InputMean
              key="answer"
              word={answerText.targetWord}
              nextState="意味入力後"
            />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "褒める":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak key={state} pause="nomal" strings={"へへへー"} />
          ),
          USER: <WaitTimer key="answer" setTime={1500} nextState="お話する" />
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "間違いを指摘":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause="nomal"
              strings={"えええ！そうなの！？<br>正しい意味は何なの？？"}
            />
          ),
          USER: (
            <InputMean
              key="answer"
              word={answerText.targetWord}
              nextState="意味入力後"
            />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "意味入力後":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause="nomal"
              strings={
                answerText.targetWord +
                "は" +
                answerText.targetMean +
                "の事なんだね！"
              }
            />
          ),
          USER: (
            <WaitTimer
              key="answer"
              setTime={1500}
              nextState={(function () {
                switch (answerText.select) {
                  case 0:
                    return "お話する";
                  case 1:
                    return "意味を知っている単語がある";
                  case 2:
                    return "意味を知らない単語がある";
                  default:
                    console.error("意味入力後 answerText.select err");
                    return "お話する";
                }
              })()}
            />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "意味を知っている単語がある":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause="nomal"
              strings={
                "むーちゃん、" + answerText.response.known.word + "知ってる！"
              }
            />
          ),
          USER: (
            <SelectAnswer
              key="answer"
              answerList={["褒める", "間違いを指摘する"]}
              nextState={["褒める", "間違いを指摘"]}
            />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "意味を知らない単語がある":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause="nomal"
              strings={
                "ところで、" +
                answerText.response.unknown.word +
                "ってどういう意味なの？"
              }
            />
          ),
          USER: (
            <InputMean
              key="answer"
              word={answerText.response.unknown.word}
              nextState="意味入力後"
            />
          )
        });
        break;
      default:
        console.error("state err:" + state);
        break;
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
