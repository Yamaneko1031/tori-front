import Link from "next/link";
import Head from "components/head";

import { useEffect, useState, useCallback } from "react";
import {
  Keyframes,
  useSpring,
  useTransition,
  animated,
  config
} from "react-spring";
import delay from "delay";

import styles from "styles/debug.module.css";
import loader from "styles/loader.module.css";

const RATIO = 100;
const INI_POS_X = -208;
const INI_POS_Y = -208;
const SHUTTER_DATA = [
  //   { fromRot: 0,   toRot: 0 + 90,   posX: -2, posY: 0 },
  //   { fromRot: 45,  toRot: 45 + 90,  posX: -1.4, posY: -1.4 },
  //   { fromRot: 90,  toRot: 90 + 90,  posX: 0, posY: -2 },
  //   { fromRot: 135, toRot: 135 + 90, posX: 1.4, posY: -1.4 },
  //   { fromRot: 180, toRot: 180 + 90, posX: 2, posY: 0 },
  //   { fromRot: 225, toRot: 225 + 90, posX: 1.4, posY: 1.4 },
  //   { fromRot: 270, toRot: 270 + 90, posX: 0, posY: 2 },
  //   { fromRot: 315, toRot: 315 + 90, posX: -1.4, posY: 1.4 }

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
    config: { duration: 3300 },
    from: {
      transform: "translate3d(0px,0px,0px) rotate(" + props.data.fromRot + "deg) rotateX(-25deg)"
    },
    to: async (next, cancel) => {
      await next({ transform: "translate3d(0px,0px,0px) rotate(" + props.data.toRot + "deg) rotateX(-25deg)" });
      await next({ transform: "translate3d(0px,0px,0px) rotate(" + props.data.fromRot + "deg) rotateX(-25deg)" });
    }
  });
  console.log(props.data);

  return (
    <animated.img
    src={"images/shutter.svg"} width="300" height="300"
      style={{
        ...spring,
        position: "absolute",
        left: INI_POS_X + RATIO * props.data.posX + "px",
        top: INI_POS_Y + RATIO * props.data.posY + "px",
        transformOrigin: "right bottom"
      }}
    >
      {/* <img src={"images/shutter.svg"} width="300" height="300" /> */}
    </animated.img>
  );
};

export default function Summary() {
  const [enter, setEnter] = useState(false);

  const spring = useSpring({
    transform: enter ? "translate3d(0,25px,0px)" : "translate3d(0,0px,0px)",
    opacity: enter ? 1 : 1,
    fontSize: enter ? "48pt" : "24pt",
    color: enter ? "red" : "green"
  });

  const test = useSpring({
    // single items,
    open: {
      from: { transform: "rotate(50deg)" },
      to: { transform: "rotate(180deg)" },
      config: config.default
    },
    // or async functions with side-effects
    close: async (call) => {
      await delay(400);
      await call({ to: { transform: "rotate(50deg)" }, config: config.gentle });
    }
  });

  return (
    <>
      <div className={styles.testarea}>
        {SHUTTER_DATA.map((value, index, array) => {
          return <Translate key={index} data={value} />;
        })}
      </div>

      <animated.div
        style={test}
        onClick={() => setEnter(!enter)}
        // onMouseEnter={(e) => setEnter(true)}
        // onMouseLeave={(e) => setEnter(false)}
      >
        Hello React Spring
      </animated.div>
    </>
  );
}
