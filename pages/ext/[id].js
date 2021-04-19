import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { talkState } from "state/talkState";
import { answerTextAtom } from "state/talkState";
import { getTemp } from "reqests/word";
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
        if (router.query.id == "janken") {
          setTalkState("じゃんけんしに来た");
        } else {
          let setAnswer = {};
          let data = await getTemp(router.query.id);
          switch (data.kind) {
            case "意味":
              setAnswer["targetWord"] = data.word;
              setAnswerText(setAnswer);
              setTalkState("意味を教えに来た");
              break;
            case "食べ物":
              setTalkState("じゃんけん");
              break;
          }
        }
        router.push("/");
      })();
    }
  }, [router]);

  return (
    <>
      <Head />
      <div className={styles.loader}></div>
    </>
  );
}
