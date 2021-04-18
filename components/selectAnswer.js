import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { talkState, answerSelectAtom } from "state/talkState";
import { talkStateChangePreparation } from "state/talkState";

import styles from "styles/content.module.css";

function SelectAnswer(props) {
  let items = [];
  const setState = useSetRecoilState(talkState);
  const setAnswerSelect = useSetRecoilState(answerSelectAtom);
  const setStateChangePreparation = useSetRecoilState(
    talkStateChangePreparation
  );

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
        className={styles.btnflatSimple}
        key={cnt}
        onClick={function () {
          if (props.nextState) {
            if (props.nextState[cnt] == "") {
              setStateChangePreparation(true);
            } else {
              setState(props.nextState[cnt]);
            }
          } else {
            setStateChangePreparation(true);
          }
          setAnswerSelect(cnt);
        }}
      >
        {props.answerList[cnt]}
      </div>
    );
  }
  return <div className={styles.selectAnswer}>{items}</div>;
}

export default SelectAnswer;
