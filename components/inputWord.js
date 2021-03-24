import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { talkState, answerTextAtom } from "state/talkState";
import { getWord } from "reqests/word";

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
    console.log(response)
    if (response) {
      setanswerText({
        text: "",
        response: response,
        select: 0,
        targetWord: response.word,
        targetMean: response.mean,
      });
      setState(props.nextStateKnown);
    } else {
      setanswerText({
        text: "",
        response: response,
        select: 0,
        targetWord: workText,
        targetMean: "",
      });
      setState(props.nextStateUnknown);
    }
  }

  function onTextAreaChange(e) {
    workText = e.target.value;
  }

  console.log("Call:InputAnswer");

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

export default InputWord;
