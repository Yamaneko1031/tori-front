import Typewriter from "typewriter-effect";
import styles from "styles/content.module.css";
// import styles from "./muchanSpeak.module.css";

import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useRecoilState } from "recoil";

import { typewriteStateAtom } from "state/talkState";

function MuchanSpeak(props) {
  const [, setTypewriteState] = useRecoilState(typewriteStateAtom);
  // 状態セット
  useEffect(() => {
    setTypewriteState("start");
  }, []);

  return (
    <div>
      <div className={styles.hukidasi}>
        <div className={styles.hukidasiText}>
          <Typewriter
            options={{ cursor: "", delay: 50 }}
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
    </div>
  );
}

export default MuchanSpeak;
