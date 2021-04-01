import Head from "next/head";
import Link from "next/link";
import MuchanSpeak from "components/muchanSpeak";
import SelectAnswer from "components/selectAnswer";
import InputWord from "components/inputWord";
import InputMean from "components/inputMean";
import WaitTimer from "components/waitTimer";
import TalkStateChange from "components/talkStateChange";

import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";

import { talkState } from "state/talkState";
import { typewriteStateEnd } from "state/talkState";
import { answerTextAtom } from "state/talkState";
import { answerSelectAtom } from "state/talkState";
import { answerJankenAtom } from "state/talkState";
import { talkStateChangePreparation } from "state/talkState";

import { random } from "util/random";
import {
  getWord,
  getTopicWord,
  getTopicUnknown,
  getTopicTaught,
  addWordTag1,
  addWordTag2
} from "reqests/word";
// import { useTag1, useTag2 } from "reqests/word";

import { useTags } from "reqests/tag";
// import { useSystemInfo } from "reqests/system";

import styles from "styles/content.module.css";

export default function Talk() {
  const [state, setTalkState] = useRecoilState(talkState);
  const [answerText, setAnswerText] = useRecoilState(answerTextAtom);
  const getTypewriteStateEnd = useRecoilValue(typewriteStateEnd);
  const answerJanken = useRecoilValue(answerJankenAtom);
  const answerSelect = useRecoilValue(answerSelectAtom);
  const stateChangePreparation = useRecoilValue(talkStateChangePreparation);
  const { tags, isTagsLoading } = useTags();
  // const { systemInfo, isSystemInfoLoading } = useSystemInfo();

  useEffect(() => {
    return () => {
      setTalkState("開始");
    };
  }, []);

  // 基本設定登録用
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
    let setAnswer = {};
    let setState = "";
    let keyPrep = "prep" + state;
    
    switch (state) {
      // 状態 ------------------------------------------------------------------------
      case "開始":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause={"nml"}
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
            <MuchanSpeak
              key={state}
              pause={"nml"}
              strings="なにしてあそぶ？？"
            />
          ),
          USER: (
            <SelectAnswer
              key="answer"
              answerList={["お話する", "言葉を教える", "じゃんけん"]}
              nextState={["お話する", "単語入力", "じゃんけん"]}
            />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "じゃんけん":
      case "じゃんけん結果_あいこ":
        let jankenText = "じゃん・・・<br>けん・・・";
        if (state == "じゃんけん結果_あいこ") {
          jankenText = "あいこで・・・";
        }
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak key={state} pause={"nml"} strings={jankenText} />
          ),
          USER: (
            <SelectAnswer
              key="answer"
              answerList={["ぐー", "ちょき", "ぱー"]}
            />
          )
        });
        if (stateChangePreparation) {
          const JANKEN_STR = ["ぐー", "ちょき", "ぱー"];
          let setJanken = {};
          let jankenIdx = random(0, 2);
          setJanken["janken"] = JANKEN_STR[jankenIdx];
          if (answerSelect == jankenIdx) {
            // あいこ
            setJanken["jankenResult"] = "じゃんけん結果_あいこ";
          } else if (
            answerSelect + 1 == jankenIdx ||
            answerSelect == jankenIdx + 2
          ) {
            // 勝ち
            setJanken["jankenResult"] = "じゃんけん結果_勝ち";
          } else {
            // 負け
            setJanken["jankenResult"] = "じゃんけん結果_負け";
          }
          items.push(
            <TalkStateChange
              key={keyPrep}
              nextState="じゃんけん結果_表示"
              janken={setJanken}
            />
          );
        }
        break;
      // 状態 ------------------------------------------------------------------------
      case "じゃんけん結果_表示":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause={"nml"}
              strings={answerJanken.janken + "！！<br>・・・"}
            />
          ),
          USER: (
            <WaitTimer
              key="answer"
              setTime={1500}
              nextState={answerJanken.jankenResult}
            />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "じゃんけん結果_勝ち":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause={"nml"}
              strings={"まけちゃった！！<BR>もういっかいやろー！"}
            />
          ),
          USER: (
            <SelectAnswer
              key="answer"
              answerList={["もう一回", "お話する", "言葉を教える"]}
              nextState={["じゃんけん", "お話する", "単語入力"]}
            />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "じゃんけん結果_負け":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause={"nml"}
              strings={
                "えへへー！！<BR>むーちゃんのかち！！<BR>もういっかいやろー！"
              }
            />
          ),
          USER: (
            <SelectAnswer
              key="answer"
              answerList={["もう一回", "お話する", "言葉を教える"]}
              nextState={["じゃんけん", "お話する", "単語入力"]}
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
              pause={"nml"}
              strings={"あのね。<br>ちょっと話をきいてほしいの。"}
            />
          ),
          USER: <WaitTimer key="answer" setTime={1500} />
        });
        if (stateChangePreparation) {
          (async function () {
            switch (random(0, 2)) {
              case 0:
                setAnswer["targetWord"] = (await getTopicUnknown()).word;
                if (setAnswer["targetWord"]) {
                  setState = "気になる単語1";
                } else {
                  setState = "言葉を知らない";
                }
                break;
              case 1:
                setAnswer["response"] = await getTopicWord();
                if (!setAnswer["response"]) {
                  setState = "言葉を知らない";
                } else if (setAnswer["response"].detail == "unknown") {
                  // 教えた単語が無い場合
                  setAnswer["response"] = await getTopicWord();
                  setAnswer["targetWord"] = setAnswer["response"].word;
                  setAnswer["targetMean"] = setAnswer["response"].mean;
                  setState = "最近覚えた単語1";
                } else {
                  console.log(JSON.stringify(tags))
                  console.log(tags.length)
                  console.log(tags[0].length)
                  setAnswer["targetWord"] = setAnswer["response"].word;
                  setAnswer["targetMean"] = setAnswer["response"].mean;
                  setAnswer["picupKeiyousi"] =
                    tags[0][random(0, tags[0].length - 1)].word;
                  setState = "単語の詳細1";
                }
                break;
              case 2:
                setAnswer["response"] = await getTopicWord();
                if (setAnswer["response"]) {
                  setAnswer["targetWord"] = setAnswer["response"].word;
                  setAnswer["targetMean"] = setAnswer["response"].mean;
                  setState = "最近覚えた単語1";
                } else {
                  setState = "言葉を知らない";
                }
                break;
              default:
                console.error("想定外の値");
                break;
            }
            setAnswerText(setAnswer);
            setTalkState(setState);
          })();
        }
        break;
      // 状態 ------------------------------------------------------------------------
      case "言葉を知らない":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause={"nml"}
              strings={
                "むーちゃんは話すのが好きなの。<BR>新しい言葉を教えてほしいな。"
              }
            />
          ),
          USER: (
            <WaitTimer key="answer" setTime={1500} nextState="何する選択肢" />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "気になる単語1":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause={"nml"}
              strings={
                "さいきん聞いたことばなんだけど<BR>意味を教えてほしい言葉があるの。"
              }
            />
          ),
          USER: (
            <WaitTimer key="answer" setTime={1500} nextState="気になる単語2" />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "気になる単語2":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause={"nml"}
              strings={
                "「" + answerText.targetWord + "」ってどういう意味かわかる？"
              }
            />
          ),
          USER: (
            <SelectAnswer
              key="answer"
              answerList={["わかる", "わからない"]}
              nextState={["気になる単語3", "気になる単語4"]}
            />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "気になる単語3":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause={"nml"}
              strings={"「" + answerText.targetWord + "」ってなに？"}
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
      case "気になる単語4":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause={"nml"}
              strings={"そっかー。<BR>むずかしい言葉なんだね。"}
            />
          ),
          USER: (
            <WaitTimer key="answer" setTime={1500} nextState="何する選択肢" />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "単語の詳細1":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause={"nml"}
              strings={
                "「" +
                answerText.targetWord +
                "」って" +
                answerText.picupKeiyousi +
                "？"
              }
            />
          ),
          USER: (
            <SelectAnswer
              key="answer"
              answerList={[answerText.picupKeiyousi, "そういうのではない"]}
            />
          )
        });
        if (stateChangePreparation) {
          if (answerSelect == 0) {
            addWordTag1(answerText.targetWord, answerText.picupKeiyousi);
            setState = "単語の詳細2";
          } else {
            setState = "単語の詳細3";
          }
          items.push(
            <TalkStateChange
              key={keyPrep}
              nextState={setState}
            />
          );
        }
        break;
      // 状態 ------------------------------------------------------------------------
      case "単語の詳細2":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause={"nml"}
              strings={
                "「" +
                answerText.targetWord +
                "」は" +
                answerText.picupKeiyousi +
                "んだね！！"
              }
            />
          ),
          USER: (
            <WaitTimer key="answer" setTime={1500} nextState="何する選択肢" />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "単語の詳細3":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause={"nml"}
              strings={
                "ふ～ん。<BR>「" +
                answerText.targetWord +
                "」は" +
                answerText.picupKeiyousi +
                "とかじゃないのかー。"
              }
            />
          ),
          USER: (
            <WaitTimer key="answer" setTime={1500} nextState="何する選択肢" />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "最近覚えた単語1":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause={"nml"}
              strings={
                "最近「" +
                answerText.targetWord +
                "」っていう言葉をおぼえたの。"
              }
            />
          ),
          USER: (
            <WaitTimer
              key="answer"
              setTime={1500}
              nextState="最近覚えた単語2"
            />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "最近覚えた単語2":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause={"nml"}
              strings={"「" + answerText.targetMean + "」のことだよ！！"}
            />
          ),
          USER: <WaitTimer key="answer" setTime={1500} />
        });
        if (stateChangePreparation) {
          let next_state1 = ["最近覚えた単語4"];
          if (answerText.response.tag1.length) {
            next_state1.push("最近覚えた単語3_形容詞");
          }
          if (answerText.response.tag2.length) {
            next_state1.push("最近覚えた単語3_形容動詞");
          }
          items.push(
            <TalkStateChange
              key={keyPrep}
              nextState={next_state1[random(0, next_state1.length - 1)]}
            />
          );
        }
        break;
      // 状態 ------------------------------------------------------------------------
      case "最近覚えた単語3_形容詞":
        let keiyousi =
          answerText.response.tag1[
            random(0, answerText.response.tag1.length - 1)
          ];
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause={"nml"}
              strings={
                "「" +
                answerText.targetWord +
                "」って、" +
                keiyousi +
                "んだよ。"
              }
            />
          ),
          USER: (
            <WaitTimer
              key="answer"
              setTime={1500}
              nextState="最近覚えた単語4"
            />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "最近覚えた単語3_形容動詞":
        let keiyoudousi =
          answerText.response.tag2[
            random(0, answerText.response.tag2.length - 1)
          ];
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause={"nml"}
              strings={
                "「" +
                answerText.targetWord +
                "」って、" +
                keiyoudousi +
                "なんだよ。"
              }
            />
          ),
          USER: (
            <WaitTimer
              key="answer"
              setTime={1500}
              nextState="最近覚えた単語4"
            />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "最近覚えた単語4":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause={"nml"}
              strings={"むーちゃんえらい？"}
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
      case "単語入力":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause={"nml"}
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
              pause={"nml"}
              strings={"「" + answerText.targetWord + "」は知ってるの！"}
            />
          ),
          USER: (
            <WaitTimer
              key="answer"
              setTime={1500}
              nextState="最近覚えた単語2"
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
              pause={"nml"}
              strings={"「" + answerText.targetWord + "」は知らないの。"}
            />
          ),
          USER: (
            <WaitTimer key="answer" setTime={1500} nextState="気になる単語3" />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "褒める":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak key={state} pause={"nml"} strings={"えへへー"} />
          ),
          USER: (
            <WaitTimer key="answer" setTime={1500} nextState="何する選択肢" />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "間違いを指摘":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause={"nml"}
              strings={"ええっ！そうなの！？"}
            />
          ),
          USER: (
            <WaitTimer key="answer" setTime={1500} nextState="気になる単語3" />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "意味入力後":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause={"nml"}
              strings={
                answerText.targetWord +
                "は" +
                answerText.targetMean +
                "の事なんだね！"
              }
            />
          ),
          USER: <WaitTimer key="answer" setTime={1500} />
        });
        if (stateChangePreparation) {
          let next_state = ["もっと教えてほしい", "単語の詳細1"];

          // if (answerText.response.known) {
          //   next_state.push("意味を知っている単語がある");
          // }
          if (answerText.response.unknown) {
            next_state.push("意味を知らない単語がある");
          }

          setState = next_state[random(0, next_state.length - 1)];

          switch (setState) {
            case "もっと教えてほしい":
              break;
            case "単語の詳細1":
              setAnswer["targetWord"] = answerText.targetWord;
              setAnswer["picupKeiyousi"] =
                tags[0][random(0, tags[0].length - 1)].word;
              break;
            case "意味を知らない単語がある":
              setAnswer["targetWord"] = answerText.response.unknown.word;
              break;
          }

          items.push(
            <TalkStateChange
              key={keyPrep}
              nextState={setState}
              answer={setAnswer}
            />
          );
        }
        break;
      // 状態 ------------------------------------------------------------------------
      case "もっと教えてほしい":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              pause={"nml"}
              strings={"もっといろいろな言葉を教えてほしいな！"}
            />
          ),
          USER: (
            <SelectAnswer
              key="answer"
              answerList={["他の言葉を教える", "お話する", "じゃんけん"]}
              nextState={["単語入力", "お話する", "じゃんけん"]}
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
              pause={"nml"}
              strings={
                "でもむーちゃんはね。<BR>「" +
                answerText.targetWord +
                "」が何なのかわかんないの。"
              }
            />
          ),
          USER: (
            <WaitTimer key="answer" setTime={1500} nextState="気になる単語2" />
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

      <div className={styles.contentArea}>{content()}</div>

      <br />

      <Link href="/">
        <a>Back to home</a>
      </Link>
    </>
  );
}
