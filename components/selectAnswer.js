import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { talkState, answerTextAtom } from "state/talkState";

function SelectAnswer(props) {
  let items = [];
  const setState = useSetRecoilState(talkState);
  const setanswerText = useSetRecoilState(answerTextAtom);

  // 初期状態セット
  useEffect(() => {
    console.log("useEffect:SelectAnswer Render:");
    return () => {
      console.log("useEffect:SelectAnswer Unmount");
    };
  });

  console.log("Call:SelectAnswer");

  for (let cnt = 0; cnt < props.answerList.length; cnt++) {
    items.push(
      <div
        key={cnt}
        onClick={function () {
          setState(props.nextState);
          setanswerText(props.answerList[cnt]);
        }}
      >
        {props.answerList[cnt]}
      </div>
    );
  }
  return <>{items}</>;
}

export default SelectAnswer;
