import Link from "next/link";
import ModalExplan from "components/modalExplan";
import ModalMuchan from "components/modalMuchan";

import styles from "styles/menu.module.css";

export default function Menu() {
  return (
    <>
      <nav className={styles.globalNavi}>
        <ul>
          {/* <li>
            <Link href="/">
              <div className={styles.clickArea}>TOP</div>
            </Link>
          </li> */}
          <li>
            <div className={styles.clickArea}>
              <ModalExplan />
            </div>
          </li>
          <li>
            <div className={styles.clickArea}>
              <ModalMuchan />
            </div>
          </li>
          <li>
            <a
              className={styles.clickArea}
              href="https://twitter.com/MuchanApp"
              target="_blank"
            >
              Twitter
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
