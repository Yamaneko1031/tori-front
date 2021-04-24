import Link from "next/link";
import ModalExplan1 from "components/modalExplan1";
import ModalExplan2 from "components/modalExplan2";
import ModalMuchan from "components/modalMuchan";
import ModalOther from "components/modalOther";

import styles from "styles/menu.module.css";

export default function Menu() {
  return (
    <>
      <nav className={styles.globalNavi}>
        <ul>
          <li>
            <ModalExplan1 />
          </li>
          <li>
            <ModalExplan2 />
          </li>
          <li>
            <ModalMuchan />
          </li>
          <li>
            <ModalOther />
          </li>
        </ul>
      </nav>
    </>
  );
}
