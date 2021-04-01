import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { talkState } from "state/talkState";
import { answerTextAtom } from "state/talkState";
import { answerJankenAtom } from "state/talkState";

function TalkStateChange(props) {
  const setState = useSetRecoilState(talkState);
  const setJanken = useSetRecoilState(answerJankenAtom);
  const setAnswer = useSetRecoilState(answerTextAtom);

  useEffect(() => {
    if (props.nextState) {
      setState(props.nextState);
    }
    if (props.janken) {
      setJanken(props.janken);
    }
    if (props.answer) {
      setAnswer(props.answer);
    }
  }, []);

  return <></>;
}

export default TalkStateChange;
