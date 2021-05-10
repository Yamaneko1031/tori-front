import { useEffect } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";

import { talkState, answerTextAtom } from "state/talkState";
import { twitterLinkAtom } from "state/talkState";
import { getWord } from "reqests/word";
import styles from "styles/content.module.css";

import { useTags } from "reqests/tag";

function InputWord(props) {
  // const { tags, isTagsLoading } = useTags();
  let items = [];
  let workText = "";
  const setState = useSetRecoilState(talkState);
  const [answerText, setAnswerText] = useRecoilState(answerTextAtom);
  const setTwitterLink = useSetRecoilState(twitterLinkAtom);

  // 初期状態セット
  useEffect(() => {
    setTwitterLink(false);
    return () => {
    };
  },[]);

  async function onformSubmit(e) {
    if( workText.length == 0 ) {
      return
    }
    workText = workText.replace(/\r?\n/g, '');
    
    let response = await getWord(workText);
    let setData = { ...answerText }
    if (response) {
      setData.text = ""
      setData.response = response
      setData.select = 0
      setData.targetWord = response.word
      setData.targetMean = response.mean
      setAnswerText(setData)
      setState(props.nextStateKnown);
    } else {
      setData.text = ""
      setData.response = response
      setData.select = 0
      setData.targetWord = workText
      setData.targetMean = ""
      setAnswerText(setData)
      setState(props.nextStateUnknown);
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
