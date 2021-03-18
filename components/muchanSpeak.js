import Typewriter from "typewriter-effect";
import styles from "./muchanSpeak.module.css";

import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useRecoilState } from "recoil";

import MuchanBody from "components/muchanBody";
import { typewriteStateAtom } from "state/talkState";

function MuchanSpeak(props) {
  const [, setTypewriteState] = useRecoilState(typewriteStateAtom);
  // 状態セット
  useEffect(() => {
    setTypewriteState("start");
  }, []);

  return (
    <>
      <div className={styles.hukidasi}>
        <div className={styles.hukidasitext}>
          <Typewriter
            options={{ cursor: "", delay: 40 }}
            onInit={(typewriter) => {
              typewriter
                .typeString(props.strings)
                .callFunction(function () {
                  setTypewriteState("end");
                })
                .start();
            }}
          />
        </div>
      </div>
      <MuchanBody pause={props.pause} />
    </>
  );
}

export default MuchanSpeak;
