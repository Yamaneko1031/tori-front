import Link from "next/link";
import React, { useState } from "react";
import ModalMenu from "components/modalMenu";
import { useRecoilState } from "recoil";
import { albumDataAtom } from "state/talkState";
import styles from "styles/album.module.css";

import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const ModalAlbum = () => {
  const [albumData, setAlbumData] = useRecoilState(albumDataAtom);
  const [nextIndex, setNextIndex] = useState(null);
  let disable = true;

  if (albumData.length) {
    disable = false;
  }

  return (
    <ModalMenu
      title="アルバム"
      disable={disable}
      onOpen={() => {
        setNextIndex(1);
      }}
    >
      <div className={styles.slideContainer}>
        <Slide
          duration={10}
          transitionDuration={200}
          autoplay={false}
          indicators={true}
          onChange={(previous, next) => {
            setNextIndex(next + 1);
          }}
        >
          {albumData.map((image, index) => {
            return (
              <div key={"album-" + index} className={styles.photoBack}>
                <img className={styles.photo} src={image} />
                <p>{nextIndex + "/" + String(albumData.length)}</p>
              </div>
            );
          })}
        </Slide>
      </div>
    </ModalMenu>
  );
};

export default ModalAlbum;
