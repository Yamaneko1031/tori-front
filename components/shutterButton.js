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

// const tweet = (uri) => {
  
//   const downloadLink = document.createElement("a");

//   if (typeof downloadLink.download === "string") {
//     downloadLink.href = "http://twitter.com/intent/tweet?text=このサイトの診断面白いよ！ https://twitter.com/[twitter ID]/status/[ランダムな数字]/photo/1&url=https://sample.com/test/share-page&via=[twitter ID]&related=[twitter ID]&hashtags=ハッシュタグ1,ハッシュタグ2";
//     downloadLink.rel = "nofollow"
//     downloadLink.target="_blank"
//     downloadLink.title="Twitterで共有"

//     // ファイル名
//     downloadLink.download = "component.png";

//     // Firefox では body の中にダウンロードリンクがないといけないので一時的に追加
//     document.body.appendChild(downloadLink);

//     // ダウンロードリンクが設定された a タグをクリック
//     downloadLink.click();

//     // Firefox 対策で追加したリンクを削除しておく
//     document.body.removeChild(downloadLink);
//   } else {
//     window.open(uri);
//   }

//   <a class="twitter" href= rel="nofollow" target="_blank" title="Twitterで共有">
//   <img src="/img/social_twitter.png" width="45" alt="twitter">
// </a>

// }

const onClickExport = () => {
  console.log("aaaaa");
  // let social = require('dk.napp.social');
  // social.twitter({
  //   text: "test",
  // });
  // 画像に変換する component の id を指定
  const target = document.getElementById("target-component");
  target.style.height = '600px';
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

    // Intent intent = new Intent(); 
    // intent.setAction(Intent.ACTION_SEND);
    // //intent.setClassName("com.twitter.android","com.twitter.android.PostActivity");
    // intent.setType("image/png");
    // intent.putExtra(Intent.EXTRA_STREAM, imageuri);
    // intent.putExtra(Intent.EXTRA_TEXT, "投稿したいテキスト");
    // startActivity(intent);
  });
  target.style.height = '';
};

function ShutterButton(props) {
  const [twitterLink, setTwitterLink] = useRecoilState(twitterLinkAtom);

  // 初期状態セット
  useEffect(() => {
    return () => {};
  });

  return twitterLink ? (
    <div className={styles.shutterButton} onClick={onClickExport}>
      <img className={styles.cameraIcon} src="images/camera.png"></img>
    </div>
  ) : (
    <></>
  );
}

export default ShutterButton;
