import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { talkState } from "state/talkState";
import { answerTextAtom } from "state/talkState";
import { getTempFront } from "reqests/word";
import { getTag } from "reqests/tag";
import * as gtag from "util/gtag";

import Head from "components/head";

import styles from "styles/loader.module.css";

export default function TempId() {
  const router = useRouter();
  const setTalkState = useSetRecoilState(talkState);
  const setAnswerText = useSetRecoilState(answerTextAtom);

  // 初期状態セット
  useEffect(() => {
    if (router.query.id) {
      (async function () {
        let setAnswer = {};
        let data = await getTempFront(router.query.id);
        gtag.event({
          action: "MeanIn",
          category: data.kind,
          label: data.word
        });
        if (data) {
          switch (data.kind) {
            case "覚えた単語":
              setAnswer["targetWord"] = data.word;
              setAnswer["targetMean"] = data.mean;
              setAnswerText(setAnswer);
              setTalkState("言葉を教えてくれる");
              break;
          }
        } else {
          setTalkState("遊びに来た");
        }
        router.push("/");
      })();
    }
  }, [router]);

  return (
    <>
      <Head description="オウムのむーちゃんが覚えた言葉の意味をおしえてくれるよ。" />
      <div className={styles.loader}></div>
    </>
  );
}
