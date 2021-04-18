import MuchanSpeak from "components/muchanSpeak";
import SelectAnswer from "components/selectAnswer";
import InputWord from "components/inputWord";
import InputMean from "components/inputMean";
import InputFeature from "components/inputFeature";
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
import Menu from "components/menu";
import Div100vh from 'react-div-100vh'

import { random } from "util/random";
import {
  getWord,
  getTopicWord,
  getTopicUnknown,
  getTopicTaught,
  addWordGood,
  addWordBad,
  addWordTag,
  deleteUnknown,
  rememberedTweet,
  addJankenResult
} from "reqests/word";
import { getTag, getTagChoices } from "reqests/tag";
// import { useSystemInfo } from "reqests/system";

import styles from "styles/content.module.css";

export default function TalkMain() {
  const [state, setTalkState] = useRecoilState(talkState);
  const [answerText, setAnswerText] = useRecoilState(answerTextAtom);
  const getTypewriteStateEnd = useRecoilValue(typewriteStateEnd);
  const answerJanken = useRecoilValue(answerJankenAtom);
  const answerSelect = useRecoilValue(answerSelectAtom);
  const stateChangePreparation = useRecoilValue(talkStateChangePreparation);
  // const { systemInfo, isSystemInfoLoading } = useSystemInfo();

  useEffect(() => {
    return () => {
      setTalkState("開始");
    };
  }, []);

  // 好み判定用
  function getLikeText(pnt) {
    const LIKE_TEXT = [
      "嫌い！", // -5
      "苦手！", // -4
      "苦手。", // -3
      "苦手。", // -2
      "あんまりなの。", // -1
      "きらいじゃないの。", // 0
      "ちょっと好き。", // 1
      "好き。", // 2
      "好き。", // 3
      "好き！", // 4
      "大好き！" // 5
    ];
    if (-5 <= pnt && pnt <= 5) {
      return LIKE_TEXT[pnt + 5];
    } else {
      console.error("pntが範囲外");
      return "";
    }
  }

  const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

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
            addJankenResult(2)
          } else if (
            answerSelect + 1 == jankenIdx ||
            answerSelect == jankenIdx + 2
          ) {
            // 勝ち
            setJanken["jankenResult"] = "じゃんけん結果_勝ち";
            addJankenResult(0)
          } else {
            // 負け
            setJanken["jankenResult"] = "じゃんけん結果_負け";
            addJankenResult(1)
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
              strings={answerJanken.janken + "！<br>・・・"}
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
          MUCHAN: <MuchanSpeak key={state} strings={"まけちゃった・・・"} />,
          PAUSE: "shobon",
          USER: (
            <WaitTimer
              key="answer"
              setTime={1500}
              nextState="じゃんけん結果_もう一回"
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
              strings={"えへへー！<BR>むーちゃんのかち！"}
            />
          ),
          PAUSE: "happy",
          USER: (
            <WaitTimer
              key="answer"
              setTime={1500}
              nextState="じゃんけん結果_もう一回"
            />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "じゃんけん結果_もう一回":
        items = setInteraction({
          MUCHAN: <MuchanSpeak key={state} strings={"もういっかいやろー！"} />,
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
              strings={"ねえねえ。<BR>ちょっと話を聞いてほしいの。"}
            />
          ),
          PAUSE: "nml",
          USER: <WaitTimer key="answer" setTime={1500} />
        });
        if (stateChangePreparation) {
          (async function () {
            switch (random(0, 3)) {
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
                  setAnswer["picupTag"] = await getTagChoices();
                  setAnswer["picupTagChoices"] = [];
                  setAnswer["picupTag"].forEach(function (elem, index) {
                    setAnswer["picupTagChoices"].push(elem.text);
                  });
                  setAnswer["picupTagChoices"].push("そういうのではない");
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
              case 3:
                setAnswer["response"] = await getTopicWord();
                if (setAnswer["response"]) {
                  setAnswer["targetWord"] = setAnswer["response"].word;
                  setAnswer["targetMean"] = setAnswer["response"].mean;
                  setState = "好きかどうか";
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
      case "好きかどうか":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              strings={"「" + answerText.targetWord + "」は好き？"}
            />
          ),
          PAUSE: "nml",
          USER: (
            <SelectAnswer
              key="answer"
              answerList={["好き", "嫌い", "どちらでもない"]}
            />
          )
        });
        if (stateChangePreparation) {
          switch (answerSelect) {
            case 0: // 好き
              addWordGood(answerText.targetWord);
              setState = "好き選択";
              break;
            case 1: // 嫌い
              addWordBad(answerText.targetWord);
              setState = "嫌い選択";
              break;
            case 2: // どちらでもない
              setState = "どちらでもない選択";
              break;
            default:
              console.error(state + ":error");
              break;
          }
          items.push(<TalkStateChange key={keyPrep} nextState={setState} />);
        }
        break;
      // 状態 ------------------------------------------------------------------------
      case "好き選択":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              strings={"そうなんだ！<BR>どういうところが好きなの？"}
            />
          ),
          PAUSE: "nml",
          USER: (
            <InputFeature
              key="answer"
              word={answerText.targetWord}
              nextStateNg="キャンセル"
            />
          )
        });
        if (stateChangePreparation) {
          if (answerText.good_tag) {
            switch (answerText.good_tag.part) {
              case "形容詞":
                setState = "特徴入力後_形容詞";
                break;
              case "形容動詞":
                setState = "特徴入力後_形容動詞";
                break;
              default:
                console.error(answerText.good_tag);
                setState = "何する選択肢";
                break;
            }
          } else {
            setState = "特徴入力後_なし";
          }
          items.push(<TalkStateChange key={keyPrep} nextState={setState} />);
        }
        break;
      // 状態 ------------------------------------------------------------------------
      case "特徴入力後_形容詞":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              strings={
                "ふむふむ。<BR>むーちゃん" +
                answerText.good_tag.text +
                "の" +
                getLikeText(answerText.good_tag.pnt)
              }
            />
          ),
          PAUSE: "nml",
          USER: (
            <WaitTimer key="answer" setTime={2000} nextState="何する選択肢" />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "特徴入力後_形容動詞":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              strings={
                "ふむふむ。<BR>むーちゃん" +
                answerText.good_tag.text +
                "なの" +
                getLikeText(answerText.good_tag.pnt)
              }
            />
          ),
          PAUSE: "nml",
          USER: (
            <WaitTimer key="answer" setTime={2000} nextState="何する選択肢" />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "特徴入力後_なし":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              strings={"ふむふむ。<BR>そーなんだ。<BR>ありがとー！"}
            />
          ),
          PAUSE: "nml",
          USER: (
            <WaitTimer key="answer" setTime={2000} nextState="何する選択肢" />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "嫌い選択":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              strings={
                "そっかー。<BR>じゃあむーちゃんもあんまり好きじゃないかも！"
              }
            />
          ),
          PAUSE: "nml",
          USER: (
            <WaitTimer key="answer" setTime={2000} nextState="何する選択肢" />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "どちらでもない選択":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              strings={"そっかー。<BR>むーちゃんも嫌いじゃないよ！"}
            />
          ),
          PAUSE: "nml",
          USER: (
            <WaitTimer key="answer" setTime={2000} nextState="何する選択肢" />
          )
        });
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
                "さいきん聞いたことばなんだけど<BR>意味を教えてほしいの。"
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
          PAUSE: "kasige",
          USER: (
            <SelectAnswer
              key="answer"
              answerList={["わかる", "わからない", "そんな言葉は無いよ"]}
              nextState={["気になる単語3", "気になる単語4", ""]}
            />
          )
        });
        if (stateChangePreparation) {
          deleteUnknown(answerText.targetWord);
          items.push(
            <TalkStateChange key={keyPrep} nextState="そんな言葉は無い" />
          );
        }
        break;
      // 状態 ------------------------------------------------------------------------
      case "そんな言葉は無い":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              strings={
                "あれれ？<BR>そっかー。<BR>むーちゃんのかんちがいだったみたい！"
              }
            />
          ),
          PAUSE: "kasige",
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
          PAUSE: "kasige",
          USER: (
            <InputMean
              key="answer"
              word={answerText.targetWord}
              nextState="意味入力後"
              nextStateNg="キャンセル"
            />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "気になる単語4":
        items = setInteraction({
          MUCHAN: <MuchanSpeak key={state} strings={"そっかー。"} />,
          PAUSE: "shobon",
          USER: (
            <WaitTimer key="answer" setTime={1500} nextState="気になる単語5" />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "気になる単語5":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              strings={"きっと、むずかしい言葉なんだとおもう。"}
            />
          ),
          PAUSE: "think",
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
                answerText.picupTagChoices[0] +
                "？"
              }
            />
          ),
          PAUSE: "nml",
          USER: (
            <SelectAnswer
              key="answer"
              answerList={answerText.picupTagChoices}
            />
          )
        });
        if (stateChangePreparation) {
          setAnswer = { ...answerText };
          if (answerSelect === answerText.picupTagChoices.length - 1) {
            setState = "単語の詳細3";
          } else {
            setAnswer["picupKeiyousi"] = answerText.picupTag[answerSelect].text;
            setAnswer["picupKeiyousiPnt"] =
              answerText.picupTag[answerSelect].pnt;
            switch (answerText.picupTag[answerSelect].part) {
              case "形容詞":
                setState = "単語の詳細2_形容詞";
                break;
              case "形容動詞":
                setState = "単語の詳細2_形容動詞";
                break;
              default:
                console.error(
                  "picupKeiyousiTag err:" + setAnswer["picupKeiyousi"]
                );
                setState = "何する選択肢";
                break;
            }
            addWordTag(answerText.targetWord, setAnswer["picupKeiyousi"]);
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
      case "単語の詳細2_形容詞":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              strings={
                "「" +
                answerText.targetWord +
                "」は" +
                answerText.picupKeiyousi +
                "んだね！"
              }
            />
          ),
          PAUSE: "nml",
          USER: (
            // <WaitTimer key="answer" setTime={1500} nextState="何する選択肢" />
            <WaitTimer
              key="answer"
              setTime={1500}
              nextState="最近覚えた単語4_形容詞"
            />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "単語の詳細2_形容動詞":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              strings={
                "「" +
                answerText.targetWord +
                "」は" +
                answerText.picupKeiyousi +
                "なんだね！"
              }
            />
          ),
          PAUSE: "nml",
          USER: (
            // <WaitTimer key="answer" setTime={1500} nextState="何する選択肢" />
            <WaitTimer
              key="answer"
              setTime={1500}
              nextState="最近覚えた単語4_形容動詞"
            />
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
                answerText.picupTagChoices[0] +
                "とかじゃないのかー。"
              }
            />
          ),
          PAUSE: "think",
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
              strings={"「" + answerText.targetMean + "」のことだよ。"}
            />
          ),
          PAUSE: "doya",
          USER: <WaitTimer key="answer" setTime={1500} />
        });
        if (stateChangePreparation) {
          (async function () {
            let next_state1 = ["最近覚えた単語4"];
            await sleep(100);
            if (answerText.response.tags.length) {
              setAnswer = { ...answerText };
              let part =
                answerText.response.tags[
                  random(0, answerText.response.tags.length - 1)
                ];
              let tag = await getTag(part);
              setAnswer["picupKeiyousi"] = tag.text;
              setAnswer["picupKeiyousiPnt"] = tag.pnt;
              switch (tag.part) {
                case "形容詞":
                  next_state1.push("最近覚えた単語3_形容詞");
                  break;
                case "形容動詞":
                  next_state1.push("最近覚えた単語3_形容動詞");
                  break;
                default:
                  console.error("tag.part err");
                  break;
              }
              setAnswerText(setAnswer);
            }
            setTalkState(next_state1[random(0, next_state1.length - 1)]);
          })();
        }
        break;
      // 状態 ------------------------------------------------------------------------
      case "最近覚えた単語3_形容詞":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              strings={
                "「" +
                answerText.targetWord +
                "」って、" +
                answerText.picupKeiyousi +
                "んだよ。"
              }
            />
          ),
          PAUSE: "doya",
          USER: (
            <WaitTimer
              key="answer"
              setTime={1500}
              nextState="最近覚えた単語4_形容詞"
            />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "最近覚えた単語4_形容詞":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              strings={
                "むーちゃん、" +
                answerText.picupKeiyousi +
                "のは" +
                getLikeText(answerText.picupKeiyousiPnt)
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
      case "最近覚えた単語3_形容動詞":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              strings={
                "「" +
                answerText.targetWord +
                "」って、" +
                answerText.picupKeiyousi +
                "なんだよ。"
              }
            />
          ),
          PAUSE: "doya",
          USER: (
            <WaitTimer
              key="answer"
              setTime={1500}
              nextState="最近覚えた単語4_形容動詞"
            />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "最近覚えた単語4_形容動詞":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              strings={
                "むーちゃん、" +
                answerText.picupKeiyousi +
                "なのは" +
                getLikeText(answerText.picupKeiyousiPnt)
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
      case "最近覚えた単語4":
        items = setInteraction({
          MUCHAN: <MuchanSpeak key={state} strings={"むーちゃんえらい？"} />,
          PAUSE: "kasige",
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
          PAUSE: "happy",
          USER: (
            <InputWord
              key="answer"
              nextStateKnown="単語入力後知っている単語分岐"
              nextStateUnknown="単語入力後知らない単語分岐"
              nextStateNg="キャンセル"
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
          PAUSE: "doya",
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
          PAUSE: "kasige",
          USER: (
            <WaitTimer key="answer" setTime={1500} nextState="気になる単語3" />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "褒める":
        items = setInteraction({
          MUCHAN: <MuchanSpeak key={state} strings={"えへへー"} />,
          PAUSE: "happy",
          USER: (
            <WaitTimer key="answer" setTime={1500} nextState="何する選択肢" />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "間違いを指摘":
        items = setInteraction({
          MUCHAN: <MuchanSpeak key={state} strings={"ええっ！そうなの！？"} />,
          PAUSE: "suprise",
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
                "のことなんだね！"
              }
            />
          ),
          PAUSE: "nml",
          USER: <WaitTimer key="answer" setTime={1500} />
        });
        if (stateChangePreparation) {
          (async function () {
            let next_state = ["もっと教えてほしい", "単語の詳細1"];

            // if (answerText.response.known) {
            //   next_state.push("意味を知っている単語がある");
            // }
            if (answerText.response.unknown) {
              next_state.push("意味を知らない単語がある");
            }

            setState = next_state[random(0, next_state.length - 1)];
            console.log(setState);

            if (answerText.response.create.cnt == 1) {
              rememberedTweet();
            }

            await sleep(100);
            switch (setState) {
              case "もっと教えてほしい":
                break;
              case "単語の詳細1":
                setAnswer["targetWord"] = answerText.targetWord;
                setAnswer["picupTag"] = await getTagChoices();
                setAnswer["picupTagChoices"] = [];
                setAnswer["picupTag"].forEach(function (elem, index) {
                  setAnswer["picupTagChoices"].push(elem.text);
                });
                setAnswer["picupTagChoices"].push("そういうのではない");
                break;
              case "意味を知らない単語がある":
                setAnswer["targetWord"] = answerText.response.unknown.word;
                break;
            }
            setAnswerText(setAnswer);
            setTalkState(setState);
          })();
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
          PAUSE: "think",
          USER: (
            <WaitTimer key="answer" setTime={1500} nextState="気になる単語2" />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "意味を教えに来た":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              strings={
                "わーい！<BR>ことばを教えに来てくれたー！"
              }
            />
          ),
          PAUSE: "happy",
          USER: (
            <WaitTimer key="answer" setTime={1500} nextState="気になる単語3" />
          )
        });
        break;
      // 状態 ------------------------------------------------------------------------
      case "キャンセル":
        items = setInteraction({
          MUCHAN: (
            <MuchanSpeak
              key={state}
              strings={
                "あれ？？"
              }
            />
          ),
          PAUSE: "kasige",
          USER: (
            <WaitTimer key="answer" setTime={1500} nextState="何する選択肢" />
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
    <Div100vh>
      <div className={styles.contentArea}>
        <Menu />
        <div>{content()}</div>
      </div>
    </Div100vh>
  );
}
