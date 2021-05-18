import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { twitterLinkAtom } from "state/talkState";
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
    saveAsImage(targetImgUri);
  });
  target.style.height = "";
};

function ShutterButton(props) {
  const [twitterLink, setTwitterLink] = useRecoilState(twitterLinkAtom);

  // 初期状態セット
  useEffect(() => {
    return () => {};
  });

  return (
    <div className={styles.shutterButton} onClick={onClickExport}>
      <img className={styles.cameraIcon} src="images/camera.png"></img>
    </div>
  );
}

export default ShutterButton;
