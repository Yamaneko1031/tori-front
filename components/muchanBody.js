import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { typewriteStateStart } from "state/talkState";
import { random } from "util/random";
import styles from "styles/content.module.css";
// import styles from "./muchanBody.module.css";

function MuchanBody(props) {
  const [state, setState] = useState(false);
  const start = useRecoilValue(typewriteStateStart);

  useEffect(() => {
    if (start) {
      console.log("useEffect:typewriteState=" + start);
      let setTime = random(20, 100);
      const timer = setInterval(() => {
        setState(!state);
      }, setTime);
      return () => {
        clearInterval(timer);
      };
    } else {
      setState(false);
    }
  }, [state, start]);

  let MUCHAN_IMAGE = {
    nml: ["images/muchan_nml1.png", "images/muchan_nml2.png"],
    happy: ["images/muchan_happy1.png", "images/muchan_happy2.png"],
    kasige: ["images/muchan_kasige1.png", "images/muchan_kasige2.png"],
    shobon: ["images/muchan_shobon1.png", "images/muchan_shobon2.png"],
    suprise: ["images/muchan_suprise1.png", "images/muchan_suprise2.png"],
    think: ["images/muchan_think1.png", "images/muchan_think2.png"],
    doya: ["images/muchan_doya1.png", "images/muchan_doya2.png"],
  };

  let value = props.pause;
  if (MUCHAN_IMAGE[value] === undefined) {
    value = "nomal";
    console.error("MuchanBody:pause undefined");
  }

  let items = [];
  MUCHAN_IMAGE.forEach(function (elem, index) {
    setAnswer["picupTagChoices"].push(elem.text);
  });

  return (
    <>
      <div className={styles.charaBack}>
        <img className={styles.charaSize} src={MUCHAN_IMAGE[value][0]} />
        <div className={state ? styles.charaFront2 : styles.charaFront1}>
          <img className={styles.charaSize} src={MUCHAN_IMAGE[value][1]} />
        </div>
      </div>
    </>
  );
}

export default MuchanBody;
