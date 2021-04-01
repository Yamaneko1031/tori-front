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
    nomal: ["images/muchan_nomal_close.png", "images/muchan_nomal_open.png"],
    happy: ["images/muchab_happy.png", "images/muchab_happy.png"],
    nml: ["images/muchan_nml1.png", "images/muchan_nml2.png"],
    deko: ["images/muchan_deko1.png", "images/muchan_deko2.png"],
    gaku: ["images/muchan_gaku1.png", "images/muchan_gaku2.png"],
  };

  let value = props.pause;
  if (MUCHAN_IMAGE[value] === undefined) {
    value = "nomal";
    console.error("MuchanBody:pause undefined");
  }

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
