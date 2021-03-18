import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { typewriteStateStart } from "state/talkState";
import styles from "./muchanBody.module.css";

function MuchanBody(props) {
  const [state, setState] = useState(false);
  const start = useRecoilValue(typewriteStateStart);

  useEffect(() => {
    if (start) {
      console.log("useEffect:typewriteState=" + start);
      let min = 20;
      let max = 100;
      let setTime = Math.floor(Math.random() * (max + 1 - min)) + min;
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
    happy: ["images/muchab_happy.png", "images/muchab_happy.png"]
  };

  let value = props.pause;
  if (MUCHAN_IMAGE[value] === undefined) {
    value = "nomal";
    console.error("MuchanBody:pause undefined");
  }

  return (
    <>
      <div className={styles.back}>
        <img className={styles.imageSize} src={MUCHAN_IMAGE[value][0]} />
        <div className={state ? styles.front2 : styles.front1}>
          <img className={styles.imageSize} src={MUCHAN_IMAGE[value][1]} />
        </div>
      </div>
    </>
  );
}

export default MuchanBody;
