import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { typewriteStateStart } from "state/talkState";
import { random } from "util/random";
import styles from "styles/content.module.css";
// import styles from "./muchanBody.module.css";

function MuchanBody(props) {
  const [state, setState] = useState(false);
  const [stateTouch, setStateTouch] = useState(false);
  const start = useRecoilValue(typewriteStateStart);

  useEffect(() => {
    if (start) {
      console.log("useEffect:typewriteState=" + start);
      let setTime = random(20, 100);
      const timer = setInterval(() => {
        setState(!state);
      }, setTime);
      setStateTouch(false);
      return () => {
        clearInterval(timer);
      };
    } else {
      if (stateTouch) {
        let setTimeTouch = random(1000, 3000);
        const timerTouch = setInterval(() => {
          setStateTouch(false);
        }, setTimeTouch);
        return () => {
          clearInterval(timerTouch);
        };
      }

      setState(false);
    }
  }, [state, start, stateTouch]);

  let MUCHAN_IMAGE = {
    nml: ["images/muchan_nml1.png", "images/muchan_nml2.png"],
    happy: ["images/muchan_happy1.png", "images/muchan_happy2.png"],
    kasige: ["images/muchan_kasige1.png", "images/muchan_kasige2.png"],
    shobon: ["images/muchan_shobon1.png", "images/muchan_shobon2.png"],
    suprise: ["images/muchan_surprise1.png", "images/muchan_surprise2.png"],
    think: ["images/muchan_think1.png", "images/muchan_think2.png"],
    doya: ["images/muchan_doya1.png", "images/muchan_doya2.png"]
  };
  let branchImage = "images/branch.png";

  let value = props.pause;
  if (MUCHAN_IMAGE[value] === undefined) {
    value = "nml";
    console.error("MuchanBody:pause undefined");
  }

  if (stateTouch) {
    value = "kasige";
  }

  function touch() {
    if (!stateTouch && !start) {
      console.log("touch");
      setStateTouch(true);
    }
  }

  let items = [];
  //オブジェクトの全要素を処理する
  Object.keys(MUCHAN_IMAGE).forEach(function (key) {
    if (key == value) {
      items.push(
        <img
          key={key + "1"}
          className={styles.charaSize}
          src={MUCHAN_IMAGE[key][0]}
        />
      );
      items.push(
        <div
          key={key + "2"}
          className={state ? styles.charaFront2 : styles.charaFront1}
        >
          <img className={styles.charaSize} src={MUCHAN_IMAGE[key][1]} />
        </div>
      );
    } else {
      items.push(
        <img
          key={key}
          className={styles.charaSizeClr}
          src={MUCHAN_IMAGE[key][0]}
        />
      );
    }
  });

  return (
    <>
      <img className={styles.branch} src={branchImage} />
      <div className={styles.charaBack}>
        {items}
        <div className={styles.charaTouch} onClick={touch}></div>
      </div>
    </>
  );
}

export default MuchanBody;
