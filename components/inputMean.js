import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { talkState, answerTextAtom } from "state/talkState";
import { postWord } from "reqests/word";
import { random } from "util/random";

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

    let selectList = [0];
    if (response.known) {
      selectList.push(1);
    }
    if (response.unknown) {
      selectList.push(2);
    }

    setanswerText({
      word: props.word,
      text: workText,
      response: response,
      select: selectList[random(0, selectList.length - 1)],
      targetWord: response.create.word,
      targetMean: response.create.mean,
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
