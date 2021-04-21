import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { talkState } from "state/talkState";
import { answerTextAtom } from "state/talkState";
import { getTemp } from "reqests/word";
import { getTag } from "reqests/tag";

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
          let tag;
          let data = await getTemp(router.query.id);
          if( data ) {
            switch (data.kind) {
              case "意味":
                setAnswer["targetWord"] = data.word;
                setAnswerText(setAnswer);
                setTalkState("意味を教えに来た");
                break;
              case "形容詞関連":
                tag = await getTag(data.word);
                setAnswer["picupKeiyousi"] = tag.text;
                setAnswer["picupKeiyousiPnt"] = tag.pnt;
                setAnswer["picupKeiyousiSupple"] = "";
                setAnswer["secretTag"] = data.word;
                setAnswer["targetKind"] = "";
                setAnswerText(setAnswer);
                setTalkState("形容詞を教えに来た");
                break;
              case "形容動詞関連":
                tag = await getTag(data.word);
                setAnswer["picupKeiyousi"] = tag.text;
                setAnswer["picupKeiyousiPnt"] = tag.pnt;
                setAnswer["picupKeiyousiSupple"] = "な";
                setAnswer["secretTag"] = data.word;
                setAnswer["targetKind"] = "";
                setAnswerText(setAnswer);
                setTalkState("形容詞を教えに来た");
                break;
              case "食べ物":
                setTalkState("じゃんけん");
                setAnswer["targetKind"] = data.kind;
                break;
            }
          }
          else {
            setTalkState("遊びに来た");
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
