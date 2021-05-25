import { useEffect, useState, useCallback } from "react";
import {
  Keyframes,
  useSpring,
  useTransition,
  animated,
  config
} from "react-spring";

import styles from "styles/content.module.css";

const DURATION = 500;
const RATIO = 330;
const INI_POS_X = -700;
const INI_POS_Y = -600;
const SHUTTER_DATA = [
  { fromRot: 45 + 30, toRot: 45 + 83, posX: -2, posY: 0 },
  { fromRot: 90 + 30, toRot: 90 + 83, posX: -1.4, posY: -1.4 },
  { fromRot: 135 + 30, toRot: 135 + 83, posX: 0, posY: -2 },
  { fromRot: 180 + 30, toRot: 180 + 83, posX: 1.4, posY: -1.4 },
  { fromRot: 225 + 30, toRot: 225 + 83, posX: 2, posY: 0 },
  { fromRot: 270 + 30, toRot: 270 + 83, posX: 1.4, posY: 1.4 },
  { fromRot: 315 + 30, toRot: 315 + 83, posX: 0, posY: 2 },
  { fromRot: 0 + 30, toRot: 0 + 83, posX: -1.4, posY: 1.4 }
];

const Translate = (props) => {
  const spring = useSpring({
    config: { duration: DURATION },
    from: {
      transform: "rotate(" + props.data.fromRot + "deg)"
    },
    reverse: true,
    to: {
        transform: "rotate(" + props.data.toRot + "deg)"
    }
  });

  return (
    <animated.img
      src={"images/shutter.svg"}
      width="900"
      height="900"
      style={{
        ...spring,
        position: "absolute",
        left: INI_POS_X + RATIO * props.data.posX + "px",
        top: INI_POS_Y + RATIO * props.data.posY + "px",
        transformOrigin: "right bottom"
      }}
    ></animated.img>
  );
};

function ShutterAnim(props) {
  const timerTouch = setTimeout(() => {
    props.rest();
  }, DURATION * 2 + 20);
  return (
    <>
      <div className={styles.shutterArea}>
        {SHUTTER_DATA.map((value, index, array) => {
          return <Translate key={index} data={value} />;
        })}
      </div>
    </>
  );
}

export default ShutterAnim;
