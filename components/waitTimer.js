import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { talkState } from "state/talkState";
import { random } from "util/random";

import { useTalkStateChange } from "state/talkStatePreProc";
import { talkStateChangePreparation } from "state/talkState";

// タイマー終了後にステータスを書き換える
// props.nextStateRandom[]：値が入っている場合要素の中からランダムで取得して状態を書き換える
// props.nextState：指定された状態に書き換える

function WaitTimer(props) {
  const setState = useSetRecoilState(talkState);
  const setStateChangePreparation = useSetRecoilState(
    talkStateChangePreparation
  );

  useEffect(() => {
    const timer = setInterval(() => {
      if (props.nextStateRandom) {
        let index = random(0, props.nextStateRandom.length - 1);
        setState(props.nextStateRandom[index]);
      } else if (props.nextState) {
        setState(props.nextState);
      } else {
        setStateChangePreparation(true);
      }
    }, props.setTime);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <></>;
}

export default WaitTimer;
