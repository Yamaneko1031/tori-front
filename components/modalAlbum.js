import Link from "next/link";
import React from "react";
import ModalMenu from "components/modalMenu";
import { useRecoilState } from "recoil";
import { albumDataAtom } from "state/talkState";
import styles from "styles/album.module.css";

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const ModalAlbum = () => {
  const [albumData, setAlbumData] = useRecoilState(albumDataAtom);

  return (
    <ModalMenu title="アルバム">
      
      <div className={styles.slideContainer}>
        <Slide duration={10} transitionDuration={200} autoplay={false} indicators={(i) => <div className="indicator">{i + 1}</div>}>
      
          {albumData.map((image, index) => {
            return (
              <div className={styles.photoBack}>
                <img
                  className={styles.photo}
                  id={"album-" + index}
                  src={image}
                />
              </div>
            );
          })}
          {/* <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
              <span>Slide 1</span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
              <span>Slide 2</span>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
              <span>Slide 3</span>
            </div>
          </div> */}
        </Slide>
      </div>
      {/* <h1>アルバム</h1>
      <div className={styles.slider}>
        <div className={styles.arrow + " " + styles.prev}>
          <i className="ico"></i>
          {albumData.map((image, index) => {
            return <label for={"switch" + index}></label>;
          })}
        </div>
        <div className={styles.arrow + " " + styles.next}>
          <i className="ico"></i>
          {albumData.map((image, index) => {
            return <label for={"switch" + index}></label>;
          })}
        </div>
        <div className={styles.slides}>
          {albumData.map((image, index) => {
            return (
              <div>
                <img
                  // alt="outimage"
                  className={styles.slide}
                  id={"album-" + index}
                  src={image}
                  // width="220px"
                  // height="300px"
                />
              </div>
            );
          })}
        </div>
      </div> */}
    </ModalMenu>
  );
};

export default ModalAlbum;
