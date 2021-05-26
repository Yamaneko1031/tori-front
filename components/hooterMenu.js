import Link from "next/link";
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  InstapaperShareButton,
  InstapaperIcon,
  HatenaShareButton,
  HatenaIcon,
  LineShareButton,
  LineIcon
} from "react-share";
import TwitterLink from "components/twitterLink";
import TwitterShare from "components/twitterShare";

import styles from "styles/hooterMenu.module.css";

export default function HooterMenu() {
  const url = "https://torichan.app";
  const iconSize = 42;
  return (
    <>
      <nav className={styles.hooterMenu}>
        <div className={styles.hooterMsg1}>よかったらシェアしてね♪</div>
        <div className={styles.hooterMsg2}>むーちゃんのTwitter</div>
        <ul>
          <li>
            <TwitterShare>
              <TwitterIcon size={iconSize} round={true} />
            </TwitterShare>
          </li>
          <li>
            <FacebookShareButton url={url}>
              <FacebookIcon size={iconSize} round={true} />
            </FacebookShareButton>
          </li>
          <li>
            <LineShareButton url={url}>
              <LineIcon size={iconSize} round={true} />
            </LineShareButton>
          </li>
          <li>
            <TwitterLink />
          </li>
        </ul>
      </nav>
    </>
  );
}
