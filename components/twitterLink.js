import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { twitterLinkAtom } from "state/talkState";
import styles from "styles/hooterMenu.module.css";

function TwitterLink(props) {
  const [twitterLink, setTwitterLink] = useRecoilState(twitterLinkAtom);

  // 初期状態セット
  useEffect(() => {
    return () => {};
  });

  return (
    <div className={styles.twitterLink}>
      <a href="https://twitter.com/MuchanApp" target="_blank">
        <img className={styles.twitterIcon} src="images/img_tweet.png"></img>
      </a>
    </div>
  );
  // return twitterLink ? (
  //   <div className={styles.twitterLink}>
  //     <a href="https://twitter.com/MuchanApp" target="_blank">
  //       <img className={styles.twitterIcon} src="images/img_tweet.png"></img>
  //     </a>
  //   </div>
  // ) : (
  //   <></>
  // );
}

export default TwitterLink;
