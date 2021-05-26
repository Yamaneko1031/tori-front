import { getPostId, postCreateTempIdFromWord } from "reqests/word";
import { useRecoilState } from "recoil";
import { answerTextAtom } from "state/talkState";

import styles from "styles/hooterMenu.module.css";

function TwitterShare(props) {
  const [answerText, setAnswerText] = useRecoilState(answerTextAtom);
  return (
    <>
      <div
        id="tweet_button"
        className={styles.twitterShare}
        onClick={async function () {
          let url = "https://torichan.app";
          let text = "";
          let isWord = false;
          if (answerText.targetWord && answerText.targetMean) {
            let id = getPostId();
            isWord = true;
            url = url + "/mean/" + id;
            text =
              "むーちゃんが「" +
              answerText.targetWord +
              "」の意味をおしえてくれるよ！";
          } else {
            text = "むーちゃんとお話したよ！";
          }
          const tweetLink = document.createElement("a");
          const query_params = new URLSearchParams({
            url: url,
            text: text
          });
          tweetLink.style.cursur = "pointer";
          tweetLink.href = "https://twitter.com/intent/tweet?" + query_params;
          document.body.appendChild(tweetLink);
          tweetLink.click();
          document.body.removeChild(tweetLink);
          if (isWord) {
            postCreateTempIdFromWord(answerText.targetWord);
          }
        }}
      >
        {props.children}
      </div>
    </>
  );
}

export default TwitterShare;
