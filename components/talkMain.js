import MuchanSpeak from "components/muchanSpeak";
import SelectAnswer from "components/selectAnswer";
import InputWord from "components/inputWord";
import InputMean from "components/inputMean";
import WaitTimer from "components/waitTimer";
import TalkStateChange from "components/talkStateChange";
import MuchanBody from "components/muchanBody";

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
  addWordTag2,
  rememberedTweet
} from "reqests/word";
// import { useTag1, useTag2 } from "reqests/word";

import { useTags } from "reqests/tag";
// import { useSystemInfo } from "reqests/system";

import styles from "styles/content.module.css";

export default function TalkMain() {
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
    items.push(
      <MuchanBody key={interaction.PAUSE} pause={interaction.PAUSE} />
    );
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
              strings="こんにちは！<br>むーちゃんだよ！<br>たくさんお話しようね！"
            />
          ),
          PAUSE: "nml",
          USER: (
            <WaitTimer key="answer" setTime={1500} nextState="何する選択肢" />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "何する選択肢":
        items = setInteraction({
          MUCHAN: <MuchanSpeak key={state} strings="なにしてあそぶ？？" />,
          PAUSE: "nml",
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
          MUCHAN: <MuchanSpeak key={state} strings={jankenText} />,
          PAUSE: "nml",
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
              strings={answerJanken.janken + "！！<br>・・・"}
            />
          ),
          PAUSE: "nml",
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
              strings={"まけちゃった！！<BR>もういっかいやろー！"}
            />
          ),
          PAUSE: "nml",
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
              strings={
                "えへへー！！<BR>むーちゃんのかち！！<BR>もういっかいやろー！"
              }
            />
          ),
          PAUSE: "nml",
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
              strings={"あのね。<br>ちょっと話をきいてほしいの。"}
            />
          ),
          PAUSE: "nml",
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
                  setAnswer["targetWord"] = setAnswer["response"].word;
                  setAnswer["targetMean"] = setAnswer["response"].mean;
                  setAnswer["picupKeiyousiTag"] = random(0, tags.length - 1);
                  setAnswer["picupKeiyousi"] =
                    tags[setAnswer["picupKeiyousiTag"]][
                      random(0, tags[setAnswer["picupKeiyousiTag"]].length - 1)
                    ].word;

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
              strings={
                "むーちゃんは話すのが好きなの。<BR>新しい言葉を教えてほしいな。"
              }
            />
          ),
          PAUSE: "nml",
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
              strings={
                "さいきん聞いたことばなんだけど<BR>意味を教えてほしい言葉があるの。"
              }
            />
          ),
          PAUSE: "nml",
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
              strings={
                "「" + answerText.targetWord + "」ってどういう意味かわかる？"
              }
            />
          ),
          PAUSE: "nml",
          USER: (
            <SelectAnswer
              key="answer"
              answerList={["わかる", "わからない", "そんな言葉は無い"]}
              nextState={["気になる単語3", "気になる単語4", "そんな言葉は無い"]}
            />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "そんな言葉は無い":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              strings={"あれれ？<BR>そっかー。むーちゃんのかんちがいだったみたい！"}
            />
          ),
          PAUSE: "nml",
          USER: (
            <WaitTimer key="answer" setTime={1500} nextState="何する選択肢" />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "気になる単語3":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              strings={"「" + answerText.targetWord + "」ってなに？"}
            />
          ),
          PAUSE: "nml",
          USER: (
            <InputMean
              key="answer"
              word={answerText.targetWord}
              nextState="意味入力後"
              nextStateNg="何する選択肢"
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
              strings={"そっかー。<BR>むずかしい言葉なんだね。"}
            />
          ),
          PAUSE: "nml",
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
              strings={
                "「" +
                answerText.targetWord +
                "」って" +
                answerText.picupKeiyousi +
                "？"
              }
            />
          ),
          PAUSE: "nml",
          USER: (
            <SelectAnswer
              key="answer"
              answerList={[answerText.picupKeiyousi, "そういうのではない"]}
            />
          )
        });
        if (stateChangePreparation) {
          if (answerSelect == 0) {
            switch (answerText.picupKeiyousiTag) {
              case 0:
                addWordTag1(answerText.targetWord, answerText.picupKeiyousi);
                setState = "単語の詳細2A";
                break;
              case 1:
                addWordTag2(answerText.targetWord, answerText.picupKeiyousi);
                setState = "単語の詳細2B";
                break;
              default:
                console.error(
                  "picupKeiyousiTag err:" + answerText.picupKeiyousiTag
                );
                setState = "何する選択肢";
                break;
            }
          } else {
            setState = "単語の詳細3";
          }
          items.push(<TalkStateChange key={keyPrep} nextState={setState} />);
        }
        break;
      // 状態 ------------------------------------------------------------------------
      case "単語の詳細2A":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              strings={
                "「" +
                answerText.targetWord +
                "」は" +
                answerText.picupKeiyousi +
                "んだね！！"
              }
            />
          ),
          PAUSE: "nml",
          USER: (
            <WaitTimer key="answer" setTime={1500} nextState="何する選択肢" />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "単語の詳細2B":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              strings={
                "「" +
                answerText.targetWord +
                "」は" +
                answerText.picupKeiyousi +
                "なんだね！！"
              }
            />
          ),
          PAUSE: "nml",
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
              strings={
                "ふ～ん。<BR>「" +
                answerText.targetWord +
                "」は" +
                answerText.picupKeiyousi +
                "とかじゃないのかー。"
              }
            />
          ),
          PAUSE: "nml",
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
              strings={
                "最近「" +
                answerText.targetWord +
                "」っていう言葉をおぼえたの。"
              }
            />
          ),
          PAUSE: "nml",
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
              strings={"「" + answerText.targetMean + "」のことだよ！！"}
            />
          ),
          PAUSE: "nml",
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
              strings={
                "「" +
                answerText.targetWord +
                "」って、" +
                keiyousi +
                "んだよ。"
              }
            />
          ),
          PAUSE: "nml",
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
              strings={
                "「" +
                answerText.targetWord +
                "」って、" +
                keiyoudousi +
                "なんだよ。"
              }
            />
          ),
          PAUSE: "nml",
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
          MUCHAN: <MuchanSpeak key={state} strings={"むーちゃんえらい？"} />,
          PAUSE: "nml",
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
              strings={"やったー！<br>何を教えてくれるの？"}
            />
          ),
          PAUSE: "nml",
          USER: (
            <InputWord
              key="answer"
              nextStateKnown="単語入力後知っている単語分岐"
              nextStateUnknown="単語入力後知らない単語分岐"
              nextStateNg="何する選択肢"
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
              strings={"「" + answerText.targetWord + "」は知ってるの！"}
            />
          ),
          PAUSE: "nml",
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
              strings={"「" + answerText.targetWord + "」は知らないの。"}
            />
          ),
          PAUSE: "nml",
          USER: (
            <WaitTimer key="answer" setTime={1500} nextState="気になる単語3" />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "褒める":
        items = setInteraction({
          MUCHAN: <MuchanSpeak key={state} strings={"えへへー"} />,
          PAUSE: "nml",
          USER: (
            <WaitTimer key="answer" setTime={1500} nextState="何する選択肢" />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "間違いを指摘":
        items = setInteraction({
          MUCHAN: <MuchanSpeak key={state} strings={"ええっ！そうなの！？"} />,
          PAUSE: "nml",
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
              strings={
                answerText.targetWord +
                "は" +
                answerText.targetMean +
                "の事なんだね！"
              }
            />
          ),
          PAUSE: "nml",
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
          console.log(setState);

          rememberedTweet();

          switch (setState) {
            case "もっと教えてほしい":
              break;
            case "単語の詳細1":
              setAnswer["targetWord"] = answerText.targetWord;
              setAnswer["picupKeiyousiTag"] = random(0, tags.length - 1);
              setAnswer["picupKeiyousi"] =
                tags[setAnswer["picupKeiyousiTag"]][
                  random(0, tags[setAnswer["picupKeiyousiTag"]].length - 1)
                ].word;
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
              strings={"もっといろいろな言葉を教えてほしいな！"}
            />
          ),
          PAUSE: "nml",
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
              strings={
                "でもむーちゃんはね。<BR>「" +
                answerText.targetWord +
                "」が何なのかわかんないの。"
              }
            />
          ),
          PAUSE: "nml",
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
      <div className={styles.contentArea}>{content()}</div>
    </>
  );
}
