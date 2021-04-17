import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import TalkStateChange from "components/talkStateChange";
import { talkState } from "state/talkState";
import { getTemp } from "reqests/word";

export default function TempId() {
  const router = useRouter();
  const setTalkState = useSetRecoilState(talkState);

  // 初期状態セット
  useEffect(() => {
    if (router.query.word) {
      (async function () {
        let setAnswer = {};
        let data = await getTemp(router.query.word);
        switch (data.kind) {
          case "意味":
            setAnswer["targetWord"] = data.word
            setAnswerText(setAnswer);
            setTalkState("気になる単語3");
            break;
          case "食べ物":
            setTalkState("じゃんけん");
            break;
        }
        router.push("/");
      })();
    }
  }, [router]);

  return (
    <>
      <Head />
    </>
  );
}
