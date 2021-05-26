import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { albumDataAtom } from "state/talkState";
import html2canvas from "html2canvas";
import styles from "styles/content.module.css";

function ShutterButton(props) {
  const setAlbumData = useSetRecoilState(albumDataAtom);
  const PAGE_MAX = 10;

  // 初期状態セット
  useEffect(() => {
    return () => {};
  });

  const onClickExport = () => {
    props.onClick();
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
  };

  return (
    <>
      <div className={styles.shutterButton} onClick={onClickExport}>
        <img className={styles.cameraIcon} src="images/camera.png"></img>
      </div>
    </>
  );
}

export default ShutterButton;
