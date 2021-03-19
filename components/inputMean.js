import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { talkState, answerTextAtom } from "state/talkState";
import { postWord } from "reqests/word";

function InputMean(props) {
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
    let response = await postWord(props.word, workText);
    setanswerText({
      word: props.word,
      text: workText,
      response: response,
      select: 0
    });
    setState(props.nextState);
  }

  function onTextAreaChange(e) {
    workText = e.target.value;
  }

  console.log("Call:InputMean");

  return (
    <>
      <textarea
        placeholder="Your Message"
        name="message"
        onChange={onTextAreaChange}
        required
      />
      <div>
        <button onClick={onformSubmit}>OK</button>
      </div>
    </>
  );
}

export default InputMean;
