import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { TwitterShareButton } from "react-share";

import { talkState, answerSelectAtom } from "state/talkState";
import { talkStateChangePreparation } from "state/talkState";
import * as gtag from "util/gtag";
import { getCreateTempIdFromWord } from "reqests/word";

import styles from "styles/content.module.css";

function SelectAnswer(props) {
  let items = [];
  const setState = useSetRecoilState(talkState);
  const setAnswerSelect = useSetRecoilState(answerSelectAtom);
  const setStateChangePreparation = useSetRecoilState(
    talkStateChangePreparation
  );

  // 初期状態セット
  useEffect(() => {
    return () => {};
  });

  async function createUrl() {
    let id = await getCreateTempIdFromWord(props.tweet);
    let url = "https://torichan.app/mean/" + id;
    return url;
  }

  for (let cnt = 0; cnt < props.answerList.length; cnt++) {
    items.push(
      <div
        className={styles.btnflatSimple}
        key={cnt}
        onClick={function () {
          gtag.event({
            action: "SelectAnswer",
            category: "Click",
            label: props.answerList[cnt]
          });
          if (props.nextState) {
            if (props.nextState[cnt] == "") {
              setStateChangePreparation(true);
            } else {
              setState(props.nextState[cnt]);
            }
          } else {
            setStateChangePreparation(true);
          }
          setAnswerSelect(cnt);
        }}
      >
        {props.answerList[cnt]}
      </div>
    );
  }
  // if (props.tweet) {
  //   console.log("aaaaaaa");
  //   // let aaa = "";
  //   // items.push(
  //   //   <TwitterShareButton
  //   //     // url={"https://torichan.app/mean/gwsX7cUQCwMfsF8uCDwX"}
  //   //     url={createUrl}
  //   //     title={"むーちゃんが「" + props.tweet + "」の意味をおしえてくれるよ！"}
  //   //   ></TwitterShareButton>
  //   // );
  //   items.push(
  //     <div
  //       className={styles.btnflatSimple}
  //       key="tweet"
  //       onClick={async function () {
  //         // gtag.event({
  //         //   action: "SelectAnswer",
  //         //   category: "Click",
  //         //   label: "tweet"
  //         // });
  //         // const target = document.getElementsByClassName(
  //         //   "react-share__ShareButton"
  //         // );
  //         // <a href="https://twitter.com/share" class="twitter-share-button">Tweet</a>
  //         // target[0].click();
  //         // let url = await createUrl()
  //         let url = "https://torichan.app"
  //         const tweetLink = document.createElement("a");
  //         tweetLink.href = "https://twitter.com/share";
  //         tweetLink.className = "twitter-share-button";
  //         tweetLink.setAttribute('target', "_blank" )
  //         tweetLink.setAttribute('data-url', url )
  //         tweetLink.setAttribute('data-text', "むーちゃんが「" + props.tweet + "」の意味をおしえてくれるよ！" )
  //         document.body.appendChild(tweetLink);
  //         console.log(tweetLink)
  //         tweetLink.click();
  //         document.body.removeChild(tweetLink);
          
  //         // ツイートボタン
  //         // window.twttr = (function (d,s,id) {
  //         //   var t, js, fjs = d.getElementsByTagName(s)[0];
  //         //   if (d.getElementById(id)) return; js=d.createElement(s); js.id=id;
  //         //   js.src="https://platform.twitter.com/widgets.js";
  //         //   fjs.parentNode.insertBefore(js, fjs);
  //         //   return window.twttr || (t = { _e: [], ready: function(f){ t._e.push(f) } });
  //         //   }(document, "script", "twitter-wjs"));
            
  //         //   // ツイート完了後のコールバック
  //         //   function afterTweet(intent_event) {
  //         //       if (intent_event) {
  //         //           console.log('ツイート完了');
  //         //       };
  //         //   }
            
  //         //   // イベントにコールバックをバインド
  //         //   twttr.ready(function (twttr) {
  //         //       twttr.events.bind('tweet', afterTweet);
  //         //   });
  //       }}
  //     >
  //       {"Twitterでシェア"}
  //     </div>
  //   );
  // }
  return <div className={styles.selectAnswer}>{items}</div>;
}

export default SelectAnswer;