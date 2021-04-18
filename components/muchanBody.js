import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { typewriteStateStart } from "state/talkState";
import { random } from "util/random";
import styles from "styles/content.module.css";
// import styles from "./muchanBody.module.css";

function MuchanBody(props) {
  const [state, setState] = useState(false);
  const [stateTouch, setStateTouch] = useState(0);
  const start = useRecoilValue(typewriteStateStart);

  useEffect(() => {
    if (start) {
      console.log("useEffect:typewriteState=" + start);
      let setTime = random(40, 120);
      const timer = setInterval(() => {
        setState(!state);
      }, setTime);
      setStateTouch(0);
      return () => {
        clearInterval(timer);
      };
    } else {
      if (stateTouch) {
        let setTimeTouch = random(1000, 1000);
        const timerTouch = setInterval(() => {
          setStateTouch(0);
        }, setTimeTouch);
        return () => {
          clearInterval(timerTouch);
        };
      }

      setState(0);
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

  let kuchi = state

  switch (stateTouch) {
    case 1:
      value = "happy";
      kuchi = true
      break;
    case 2:
      value = "suprise";
      kuchi = true
      break;
    case 3:
      value = "kasige";
      kuchi = false
      break;
  }

  function touchPos1() {
    if (!stateTouch && !start) {
      setStateTouch(1);
    }
  }
  function touchPos2() {
    if (!stateTouch && !start) {
      setStateTouch(2);
    }
  }
  function touchPos3() {
    if (!stateTouch && !start) {
      setStateTouch(3);
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
          className={kuchi ? styles.charaFront2 : styles.charaFront1}
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
        <div className={styles.charaTouch1} onClick={touchPos1}></div>
        <div className={styles.charaTouch2} onClick={touchPos2}></div>
        <div className={styles.charaTouch3} onClick={touchPos3}></div>
      </div>
    </>
  );
}

export default MuchanBody;
