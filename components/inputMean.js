import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { talkState, answerTextAtom } from "state/talkState";
import { postWord } from "reqests/word";
import { random } from "util/random";
import styles from "styles/content.module.css";
import { talkStateChangePreparation } from "state/talkState";

function InputMean(props) {
  let workText = "";
  const setState = useSetRecoilState(talkState);
  const setanswerText = useSetRecoilState(answerTextAtom);
  const setStateChangePreparation = useSetRecoilState(
    talkStateChangePreparation
  );

  // 初期状態セット
  useEffect(() => {
    console.log("useEffect:InputAnswer Render:");
    return () => {
      console.log("useEffect:InputAnswer Unmount");
    };
  });

  async function onformSubmit(e) {
    if (workText.length == 0) {
      return;
    }
    workText = workText.replace(/\r?\n/g, "");

    // 文章の末尾が特定の場合は除外する
    const EXCLU_TEST = ["のこと", "の事", "ということ", "という事"];
    if (workText.endsWith("。")) {
      workText = workText.slice(0, -1);
    }
    for (let i = 0; i < EXCLU_TEST.length; i++) {
      if (workText.endsWith(EXCLU_TEST[i])) {
        workText = workText.slice(0, -EXCLU_TEST[i].length);
        break;
      }
    }

    let tag = "";
    if (props.tag) {
      tag = props.tag;
    }
    let kind = "";
    if (props.kind) {
      kind = props.kind;
    }

    let response = await postWord(props.word, workText, tag, kind);
    setanswerText({
      word: props.word,
      text: workText,
      response: response,
      targetWord: response.create.word,
      targetMean: response.create.mean,
      targetKind: "",
      secretTag: ""
    });
    if (props.nextState) {
      setState(props.nextState);
    } else {
      setStateChangePreparation(true);
    }
  }
  function onformNg(e) {
    setState(props.nextStateNg);
  }

  function onTextAreaChange(e) {
    workText = e.target.value;
  }

  console.log("Call:InputMean");

  return (
    <div className={styles.inputWord}>
      <textarea
        className={styles.inputWordText}
        placeholder="説明を入力してください"
        name="message"
        onChange={onTextAreaChange}
        required
      />
      <div className={styles.btnInputOk} onClick={onformSubmit}>
        OK
      </div>
      <div className={styles.btnInputOk} onClick={onformNg}>
        NG
      </div>
    </div>
  );
}

export default InputMean;
