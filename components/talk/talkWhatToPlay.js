// import Head from "next/head";
// import Link from "next/link";
// import MuchanSpeak from "components/muchanSpeak";
// import SelectAnswer from "components/selectAnswer";
// import InputAnswer from "components/inputAnswer";

// import { useEffect } from "react";
// import { useRecoilValue } from "recoil";
// import { useRecoilState } from "recoil";

// import { talkState, setTalkState } from "state/talkState";
// import { typewriteStateEnd } from "state/talkState";
// import { answerTextAtom } from "state/talkState";

// import { getWord } from "reqests/word";

// export default function talkWhatToPlay() {
//   const [state, setState] = useRecoilState(talkState);
//   const getTypewriteStateEnd = useRecoilValue(typewriteStateEnd);
//   const answerText = useRecoilValue(answerTextAtom);

//   useEffect(() => {
//     console.log("Talk");
//     return () => {
//       console.log("Talk Unmount");
//       setState("start");
//     };
//   }, []);

//   function content() {
//     let items = [];
//     if (state === "start") {
//       console.log("start");
//       items.push(
//         <MuchanSpeak
//           key={state}
//           pause="nomal"
//           strings="こんにちは！<br>むーちゃんです！<br>知らない言葉を教えてほしい！！"
//         />
//       );
//       if (getTypewriteStateEnd) {
//         console.log("start getTypewriteStateEnd");
//         items.push(
//           <SelectAnswer
//             key="answer"
//             answerList={["聞きたい事ある？", "教えてあげる！"]}
//             nextState="select"
//           />
//         );
//       }
//     }
//     return items;
//   }

//   return (
//     <>
//         <MuchanSpeak
//         key="talkWhatToPlay"
//         pause="nomal"
//         strings="こんにちは。<br>むーちゃんです。<br>一緒に遊んでほしいな。"
//         />
//     </>
//   );
// }
