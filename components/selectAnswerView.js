import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { talkState, answerSelectAtom } from "state/talkState";
import { talkStateChangePreparation } from "state/talkState";
import * as gtag from "util/gtag";

import styles from "styles/content.module.css";

function SelectAnswerView(props) {
  let items = [];

  // 初期状態セット
  useEffect(() => {
    return () => {};
  });

  for (let cnt = 0; cnt < props.answerList.length; cnt++) {
    if (props.select == cnt) {
      items.push(
        <div className={styles.btnflatSelected} key={cnt}>
          {props.answerList[cnt]}
        </div>
      );
    } else {
      items.push(
        <div className={styles.btnflatNonSelected} key={cnt}>
          {props.answerList[cnt]}
        </div>
      );
    }
  }
  return <div className={styles.selectAnswer}>{items}</div>;
}

export default SelectAnswerView;
