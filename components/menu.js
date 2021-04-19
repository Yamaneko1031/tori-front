import Link from "next/link";
import ModalExplan from "components/modalExplan";
import ModalMuchan from "components/modalMuchan";

import styles from "styles/menu.module.css";

export default function Menu() {
  return (
    <>
      <nav className={styles.globalNavi}>
        <ul>
          <li>
            <ModalExplan />
          </li>
          <li>
            <ModalMuchan />
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
