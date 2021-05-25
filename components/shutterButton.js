import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { albumDataAtom } from "state/talkState";
import {
  Transition,
  TransitionGroup,
  CSSTransition
} from "react-transition-group";
import ShutterAnim from "components/shutterAnim";
import html2canvas from "html2canvas";
import styles from "styles/content.module.css";

const saveAsImage = (uri) => {
  const downloadLink = document.createElement("a");

  if (typeof downloadLink.download === "string") {
    downloadLink.href = uri;

    // ファイル名
    downloadLink.download = "muchan.png";

    // Firefox では body の中にダウンロードリンクがないといけないので一時的に追加
    document.body.appendChild(downloadLink);

    // ダウンロードリンクが設定された a タグをクリック
    downloadLink.click();

    // Firefox 対策で追加したリンクを削除しておく
    document.body.removeChild(downloadLink);
  } else {
    window.open(uri);
  }
};

function ShutterAnimation(props) {
  const [state, setState] = useState(false);
  // 初期状態セット
  useEffect(() => {
    setState(true);
    return () => {};
  }, []);
  const transitionStyles = {
    entering: {
      // opacity: 1,
      // color: "blue",
      // zIndex: "1000",
      transform: "scaleY(100)",
      transition: "transform 5000ms linear"
    },
    entered: {
      // opacity: 1,
      // color: "blue",
      // zIndex: "1000",
      transform: "scaleY(1)",
      transition: "transform 5000ms linear"
    },
    exiting: {
      opacity: 1
    },
    exited: {
      opacity: 1
    }
  };
  const transitionStyles2 = {
    entering: {
      // opacity: 1,
      // color: "blue",
      // zIndex: "1000",
      transform: "scaleY(100)",
      transition: "transform 5000ms linear"
    },
    entered: {
      // opacity: 1,
      // color: "blue",
      // zIndex: "1000",
      transform: "scaleY(1)",
      transition: "transform 5000ms linear"
    },
    exiting: {
      opacity: 1
    },
    exited: {
      opacity: 1
    }
  };
  console.log("aaaaaa");
  return (
    <div className={styles.shutterArea}>
      <div className={styles.shutterAreaTop}>
        <div className={styles.test} />
        <Transition in={state} timeout={5000}>
          {(state) => (
            <div style={transitionStyles[state]}>
              <div className={styles.test} />
            </div>
          )}
        </Transition>
      </div>
      <div className={styles.shutterAreaBottom}>
        <div className={styles.test2} />
        <Transition in={state} timeout={5000}>
          {(state) => (
            <div style={transitionStyles2[state]}>
              <div className={styles.test2} />
            </div>
          )}
        </Transition>
      </div>
    </div>
    // <TransitionGroup className="wrapper">
    //   {/* <CSSTransition key={props.data} classNames="slide" timeout={1500}> */}
    //   <CSSTransition key={props.data} classNames={"slide"} timeout={1500}>
    //     <div className={styles.test}>あああああ</div>
    //   </CSSTransition>
    // </TransitionGroup>
  );
  // (
  //   <>
  //     <Root>
  //       <TransitionGroup className="wrapper">
  //         <CSSTransition classNames="slide" timeout={1500}>
  //           <div className="main">あああああ</div>
  //         </CSSTransition>
  //       </TransitionGroup>
  //     </Root>
  //     <button style={{ marginTop: "10px" }} onClick={() => setInProp(!inProp)}>
  //       Click
  //     </button>
  //   </>
  // );
}

function ShutterButton(props) {
  const [state, setState] = useState(false);
  const [albumData, setAlbumData] = useRecoilState(albumDataAtom);
  const PAGE_MAX = 10;

  // 初期状態セット
  useEffect(() => {
    return () => {};
  });

  const onClickExport = () => {
    if (state) {
      return;
    }
    // 画像に変換する component の id を指定
    const target = document.getElementById("target-component");
    target.style.height = "600px";
    html2canvas(target, {
      scale: 1,
      ignoreElements: function (element) {
        /* Remove element with id="MyElementIdHere" */
        if ("target-ignore" == element.id) {
          return true;
        }
      }
    }).then((canvas) => {
      const targetImgUri = canvas.toDataURL("img/png");
      setAlbumData((preData) => {
        let newData;
        if (preData.length >= PAGE_MAX) {
          newData = [
            targetImgUri,
            ...preData.slice(preData.length - (PAGE_MAX - 1))
          ];
        } else {
          newData = [targetImgUri, ...preData];
        }
        return newData;
      });
    });
    target.style.height = "";

    setState(true);
    // const timerTouch = setTimeout(() => {
    //   console.log(state);
    //   setState(false);
    // }, 10000);
  };

  return (
    <>
      {/* <div className={styles.shutterArea}>
      </div> */}
      {/* {state ? <ShutterAnimation /> : <></>} */}
      {state ? (
        <ShutterAnim
          rest={() => {
            setState(false);
          }}
        />
      ) : (
        <></>
      )}
      <div className={styles.shutterButton} onClick={onClickExport}>
        <img className={styles.cameraIcon} src="images/camera.png"></img>
      </div>
    </>
  );
}

export default ShutterButton;
