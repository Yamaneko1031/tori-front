import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { talkState, answerTextAtom } from "state/talkState";
import { getWord } from "reqests/word";
import styles from "styles/content.module.css";

function InputWord(props) {
  let items = [];
  let workText = "";
  const setState = useSetRecoilState(talkState);
  const setanswerText = useSetRecoilState(answerTextAtom);

  // 初期状態セット
  useEffect(() => {
    console.log("useEffect:InputAnswer Render:");
    return () => {
      console.log("useEffect:InputAnswer Unmount");
    };
  });

  async function onformSubmit(e) {
    let response = await getWord(workText);
    console.log(response);
    if (response) {
      setanswerText({
        text: "",
        response: response,
        select: 0,
        targetWord: response.word,
        targetMean: response.mean
      });
      setState(props.nextStateKnown);
    } else {
      setanswerText({
        text: "",
        response: response,
        select: 0,
        targetWord: workText,
        targetMean: ""
      });
      setState(props.nextStateUnknown);
    }
  }
  function onformNg(e) {
    setState(props.nextStateNg);
  }

  function onTextAreaChange(e) {
    workText = e.target.value;
  }

  console.log("Call:InputAnswer");

  return (
    <div className={styles.inputWord}>
      <textarea
        className={styles.inputWordText}
        placeholder="単語を入力してください"
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

export default InputWord;
