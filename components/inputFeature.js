import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { talkState, answerTextAtom } from "state/talkState";
import { talkStateChangePreparation } from "state/talkState";
import { twitterLinkAtom } from "state/talkState";
import { addWordTagText } from "reqests/word";
import styles from "styles/content.module.css";

function InputFeature(props) {
  let workText = "";
  const setState = useSetRecoilState(talkState);
  const setanswerText = useSetRecoilState(answerTextAtom);
  const setStateChangePreparation = useSetRecoilState(
    talkStateChangePreparation
  );
  const setTwitterLink = useSetRecoilState(twitterLinkAtom);

  // 初期状態セット
  useEffect(() => {
    setTwitterLink(false);
    return () => {};
  }, []);

  async function onformSubmit(e) {
    if (workText.length == 0) {
      return;
    }
    if (workText.length > 100) {
      setState(props.nextStateNg);
      return;
    }
    workText = workText.replace(/\r?\n/g, "");

    let response = await addWordTagText(props.word, workText);
    let max = 0;
    let good_tag = false;
    if (response) {
      response.forEach(function (elem, index) {
        if (max < elem.pnt) {
          max = elem.pnt;
          good_tag = { ...elem };
        }
      });
    }
    setanswerText({
      word: props.word,
      text: workText,
      good_tag: good_tag
      // response: response,
      // targetWord: response.create.word,
      // targetMean: response.create.mean
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

  return (
    <div className={styles.inputWord}>
      <textarea
        className={styles.inputWordText}
        placeholder="特徴を入力してください"
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

export default InputFeature;
