import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { albumDataAtom } from "state/talkState";
import { CSSTransition } from "react-transition-group";
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
  return <div></div>;
}

function ShutterButton(props) {
  const [albumData, setAlbumData] = useRecoilState(albumDataAtom);

  // 初期状態セット
  useEffect(() => {
    return () => {};
  });

  const onClickExport = () => {
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
        // let newData
        // console.log(preData);
        // if (preData.length >= 4) {
        //   newData = [...preData.slice(1), targetImgUri];
        // }
        // else {
        //   newData = [...preData, targetImgUri];
        // }
        let newData = [...preData, targetImgUri];
        return newData;
      });
      // document.getElementById("result").src = targetImgUri;
      // saveAsImage(targetImgUri);
    });
    target.style.height = "";
  };

  // console.log(albumData);

  return (
    <div className={styles.shutterButton} onClick={onClickExport}>
      <img className={styles.cameraIcon} src="images/camera.png"></img>
    </div>
  );
}

export default ShutterButton;
