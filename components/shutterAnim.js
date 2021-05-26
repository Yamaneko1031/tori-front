import { useEffect, useState, useCallback } from "react";
import { useSprings, animated } from "react-spring";
import ShutterButton from "components/shutterButton";

import styles from "styles/content.module.css";

const DURATION = 300;
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
  const [state, setState] = useState(false);
  const [springs, api] = useSprings(SHUTTER_DATA.length, (idx) => ({
    config: { duration: DURATION },
    from: {
      x: 0
    },
    x: 1,
    immediate: true
  }));

  return (
    <>
      {springs.map((item, idx) => (
        <animated.img
          key={"shutter" + idx}
          src={"images/shutter.svg"}
          width="900"
          height="900"
          style={{
            position: "absolute",
            left: INI_POS_X + RATIO * SHUTTER_DATA[idx].posX + "px",
            top: INI_POS_Y + RATIO * SHUTTER_DATA[idx].posY + "px",
            transformOrigin: "right bottom",
            transform: item.x
              .to({
                range: [0, 0.2, 0.8, 1],
                output: [
                  SHUTTER_DATA[idx].fromRot,
                  SHUTTER_DATA[idx].toRot,
                  SHUTTER_DATA[idx].toRot,
                  SHUTTER_DATA[idx].fromRot
                ]
              })
              .to((val) => `rotate(${val}deg)`)
          }}
        />
      ))}
      <ShutterButton
        onClick={() => {
          setState(!state);
          api.start({ immediate: false, x: state ? 1 : 0 });
        }}
      />
    </>
  );
};

function ShutterAnim(props) {
  return (
    <>
      <div className={styles.shutterArea}>
        <Translate />
      </div>
    </>
  );
}

export default ShutterAnim;
