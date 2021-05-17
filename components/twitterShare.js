import { useState, useEffect } from "react";
import { getCreateTempIdFromWord } from "reqests/word";
import { useRecoilValue, useRecoilState } from "recoil";
import { answerTextAtom } from "state/talkState";

// import styles from "styles/content.module.css";
import styles from "styles/hooterMenu.module.css";

import { TwitterShareButton, TwitterIcon } from "react-share";

function TwitterShare(props) {
  const [answerText, setAnswerText] = useRecoilState(answerTextAtom);
  const [state, setState] = useState(false);
  const [text, setText] = useState(false);
  const [url, setUrl] = useState(false);

  useEffect(() => {
    if (state) {
      let button = document.getElementsByClassName("react-share__ShareButton");
      button[0].click();
    }
  }, [state]);

  async function createUrl() {
    let url = "https://torichan.app";
    if (answerText.targetWord && answerText.targetMean) {
      let id = await getCreateTempIdFromWord(answerText.targetWord);
      url = url + "/mean/" + id;
    } else {
    }
    return url;
  }

  return state ? (
    <>
      <TwitterShareButton
        url={url}
        title={text}
        onShareWindowClose={() => {
          setState(false);
        }}
      >
        {props.children}
      </TwitterShareButton>
    </>
  ) : (
    <div
      id="tweet_button"
      className={styles.twitterShare}
      onClick={async function () {
        let workUrl = "https://torichan.app";
        let workText = "";
        if (answerText.targetWord && answerText.targetMean) {
          let id = await getCreateTempIdFromWord(answerText.targetWord);
          workUrl = workUrl + "/mean/" + id;
          workText =
            "むーちゃんが「" +
            answerText.targetWord +
            "」の意味をおしえてくれるよ！";
        } else {
          workText = "むーちゃんとお話したよ！";
        }
        setText(workText);
        setUrl(workUrl);
        setState(true);
      }}
    >
      {props.children}
    </div>
  );
}

export default TwitterShare;

// import { useState, useEffect } from "react";
// import { getCreateTempIdFromWord } from "reqests/word";
// import { useRecoilValue, useRecoilState } from "recoil";
// import { answerTextAtom } from "state/talkState";

// // import styles from "styles/content.module.css";
// import styles from "styles/hooterMenu.module.css";

// import { TwitterShareButton, TwitterIcon } from "react-share";

// function TwitterShare(props) {
//   const [answerText, setAnswerText] = useRecoilState(answerTextAtom);
//   //   const [state, setState] = useState(false);

//   //   useEffect(() => {
//   // if (state) {
//   //   console.log("aaaaa");
//   //   // let tweetLink = document.createElement("a");
//   //   let tweetLink = document.getElementById("tweet_button_atag");
//   //   let url = "https://torichan.app/aaaa";
//   //   tweetLink.href = "https://twitter.com/share";
//   //   tweetLink.className = "twitter-share-button";
//   //   tweetLink.setAttribute("target", "_blank");
//   //   tweetLink.setAttribute("data-url", url);
//   //   tweetLink.setAttribute(
//   //     "data-text",
//   //     "むーちゃんが「" + props.tweet + "」の意味をおしえてくれるよ！"
//   //   );
//   //   twttr.widgets.load(tweetLink);
//   //   let tweetLinkDiv1 = document.getElementById("twitter-widget-0");
//   //   let tweetLinkDiv2 = document.getElementsByTagName("a");
//   //   console.log(tweetLinkDiv1);
//   //   console.log(tweetLinkDiv2[0]);
//   //   console.log(tweetLink);
//   //   let url = "https://torichan.app/aaaa";
//   //   let tweetLink = document.getElementById("tweet_button_atag");
//   //   const query_params = new URLSearchParams({
//   //     url: url,
//   //     text: "むーちゃんが「" + props.tweet + "」の意味をおしえてくれるよ！"
//   //   });
//   //   tweetLink.href = "https://twitter.com/intent/tweet?" + query_params;
//   //   tweetLink.click();
//   //   tweetLinkDiv2[0].click();
//   // }
//   // twttr.widgets.load(ele);
//   // console.log(ele);
//   // const f = async () => {
//   //   const tweetLink = document.getElementById("tweet_button");
//   //   let url = "https://torichan.app";
//   //   tweetLink.href = "https://twitter.com/share";
//   //   tweetLink.className = "twitter-share-button";
//   //   tweetLink.setAttribute("target", "_blank");
//   //   tweetLink.setAttribute("data-url", url);
//   //   tweetLink.setAttribute(
//   //     "data-text",
//   //     "むーちゃんが「" + props.tweet + "」の意味をおしえてくれるよ！"
//   //   );
//   //   twttr.widgets.load(tweetLink);
//   //   //   document.body.appendChild(tweetLink);
//   //   console.log(tweetLink);
//   //   tweetLink.click();
//   //   //   document.body.removeChild(tweetLink);
//   // };
//   // f();
//   //   }, [state]);

//   async function createUrl() {
//     let url = "https://torichan.app";
//     if (answerText.targetWord) {
//       let id = await getCreateTempIdFromWord(answerText.targetWord);
//       url = url + "/mean/" + id;
//     } else {
//     }
//     return url;
//   }

//   return (
//     <>
//       <div
//         id="tweet_button"
//         className={styles.twitterShare}
//         onClick={async function () {
//           let url = "https://torichan.app";
//           let text = "";
//           if (answerText.targetWord) {
//             let id = await getCreateTempIdFromWord(answerText.targetWord);
//             url = url + "/mean/" + id;
//             text =
//               "むーちゃんが「" +
//               answerText.targetWord +
//               "」の意味をおしえてくれるよ！";
//           } else {
//             text = "むーちゃんとお話したよ！";
//           }
//           const tweetLink = document.createElement("a");
//           const query_params = new URLSearchParams({
//             url: url,
//             text: text
//           });
//           tweetLink.href = "https://twitter.com/intent/tweet?" + query_params;
//           document.body.appendChild(tweetLink);
//           console.log(tweetLink);
//           tweetLink.click();
//           document.body.removeChild(tweetLink);
//         }}
//       >
//         {props.children}
//         {/* Twitterでシェア */}
//         {/* <a id="tweet_button_atag">ああああ</a> */}
//       </div>
//       {/* <div
//         onClick={async function () {
//           let tweetLinkDiv1 = document.getElementById("twitter-widget-0");
//           let tweetLinkDiv2 = document.getElementsByTagName("a");
//           tweetLinkDiv1.click();
//           console.log(tweetLinkDiv1);
//           console.log(tweetLinkDiv2[0]);
//         }}
//       >
//         ああああ
//       </div> */}
//     </>
//   );
// }

// export default TwitterShare;
