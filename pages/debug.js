import Link from "next/link";
import Head from "components/head";

import { useEffect, useState, useCallback } from "react";

import SelectAnswer from "components/selectAnswer";
import InputAnswer from "components/inputWord";
import TwitterShare from "components/twitterShare";

import { useRecoilState } from "recoil";
import { talkState, talkStateSelector } from "state/talkState";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";

import MuchanSpeak from "components/muchanSpeak";

import { answerTextAtom } from "state/talkState";

import { random, randomArray } from "util/random";

import { getWord, rememberedTweet } from "reqests/word";

import { getTag, getTagChoices } from "reqests/tag";
import { getCreateTempIdFromWord } from "reqests/word";

import { useSpring, useTransition, animated } from "react-spring";

// import { useTags } from "reqests/tag";
// import { addWordTag1 } from "reqests/word";
import styles from "styles/debug.module.css";
import loader from "styles/loader.module.css";

import useSWR from "swr";
import Div100vh from "react-div-100vh";

let session_id = "";

const Thing = ({ toggle }) => {
  const props = useSpring({
    transform: toggle ? "translate3d(0,-25px,0)" : "translate3d(0,0,0)"
  });

  return (
    <animated.div style={props}>
      <div
        style={{
          padding: "50px"
        }}
      >
        THING
      </div>
    </animated.div>
  );
};

export default function Summary() {
  const [state, setState] = useRecoilState(talkState);
  const [test, settest] = useState(false);
  const answerText = useRecoilValue(answerTextAtom);
  const [enter, setEnter] = useState(false);
  const spring = useSpring({
    fontSize: enter ? "48pt" : "24pt",
    color: enter ? "red" : "green"
  });
  const [show, set] = useState(false);
  const transitions = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: show,
    delay: 20,
    // config: config.molasses,
    onRest: () => set(!show)
  });
  const [flag, setFlag] = useState(true);

  let work = [];

  // 初期状態セット
  useEffect(() => {
    settest("");
    // console.log("useEffect:Summary Render:" + test + state)
    console.log("useEffect:Summary Render:" + test);
    return () => {
      console.log("useEffect:Summary Unmount");
    };
  }, []);

  console.log("Call:Summary");

  function list_draw() {
    if (test) {
      return <SelectAnswer answerList={["aaa", "bbb", "ccc"]} />;
    } else {
      return (
        <div>
          <SelectAnswer answerList={["aaa", "bbb", "ccc"]} />
        </div>
      );
    }
  }

  async function changeState() {
    let a = work.pop();
    console.log(a);
  }

  async function changeState1() {
    console.log(work.length);
    if (work.length === 0) {
      work = randomArray(0, 7);
    }
    console.log(work);
  }

  async function changeState2() {
    async function createUrl() {
      let id = await getCreateTempIdFromWord("あたおか");
      let url = "https://torichan.app/mean/" + id;
      return url;
    }
    let url = await createUrl();
    console.log(url);
  }

  let title = "学習オウム むーちゃん summary";
  let description = "人の言葉に興味津々なオウムのむーちゃん。summary";

  // if (error) return <div>failed to load</div>
  // if (!data) return <div>loading...</div>
  // return <div>hello {data.name}!</div>

  const styleGenerator = (index) => ({
    minWidth: 64,
    lineHeight: "32px",
    borderRadius: 4,
    border: "none",
    padding: "0 16px",
    color: "#fff",
    background: background ? background : "#639"
  });

  return (
    <>
      <Head title={title} description={description} />

      {/* <Div100vh>
        <div className={styles.contentArea}>
          あああ
        </div>
      </Div100vh> */}
      {/* <div className={styles.contentArea}> */}
      {/* <h1>使い方</h1> */}

      {/* <div className={styles.hukidasi}>
          あああああああああああああああああああああああああああああああああああああああああああああああ
        </div>
        <div className={styles.charaBack}>
          <img className={styles.branch} src={"images/branch.png"} />
          <img className={styles.chara} src={"images/muchan_nml1.png"} />
        </div>

        {list_draw()} */}
      <div className="App">
        <Thing toggle={flag} />
        <button
          style={{
            padding: "50px",
            marginTop: "50px"
          }}
          onClick={() => setFlag(!flag)}
        >
          click me
        </button>
      </div>

      <div onClick={changeState}>{"changeState"}</div>
      <div onClick={changeState1}>{"ボタン1"}</div>
      <div onClick={changeState2}>{"ボタン2"}</div>

      {/* <img className={styles.shutter} src={"images/shutter.svg"} /> */}
      {/* <img className={styles.shutter} src={"images/shutter.svg"} /> */}
      {/* <div className={loader.loader} /> */}

      <animated.div
        style={spring}
        onMouseEnter={(e) => setEnter(true)}
        onMouseLeave={(e) => setEnter(false)}
      >
        Hello React Spring
      </animated.div>

      {transitions(
        (styles, item) => item && <animated.div style={styles}>✌️</animated.div>
      )}

      {/* <a href="https://twitter.com/MuchanApp?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="false">Follow @MuchanApp</a> */}
      {/* <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> */}
      {/* <InputAnswer /> */}

      {/* <MuchanSpeak
          pause="nomal"
          strings="こんにちわ！あそｄふぁおｄふぁｊｄふぃあじぇいあじｄｊふぃあｊｄ"
        /> */}

      {/* <div>{answerText}</div> */}

      {/* <MyComponent /> */}
      {/* <TextInput />
        <TextSubmit /> */}

      {/* <h2>
          <Link href="/">
            <a>Back to home</a>
          </Link>
        </h2> */}
      {/* </div> */}
    </>
  );
}

// import { useCallback } from "react";
// import { atom, useRecoilCallback } from "recoil";
// import { tryGetPreviewData } from "next/dist/next-server/server/api-utils";

// const text = atom({
//   key: "inputMessage",
//   default: ""
// });
// function TextInput() {
//   const [value, setValue] = useRecoilState(text);
//   const handleChange = useCallback(
//     (event) => setValue(event.currentTarget.value),
//     []
//   );
//   return <input value={value} onChange={handleChange} />;
// }

// const nextState = atom({
//   key: "nextState",
//   default: ""
// });

// let items = [];
// function TextSubmit() {
//   const [value, setValue] = useRecoilState(nextState);
//   items.push(<div>{"aaaa"}</div>)
//   function test() {
//     items.push(<div>{"aaaa"}</div>)
//     setValue(value+1)
//   }
//   const handleSubmit = useRecoilCallback(
//     ({ snapshot }) => async () => {
//       const value = await snapshot.getPromise(text); // text は非同期ではないため、実際には待たない
//       if (!value) return; // 入力のバリデーション（テキストが空だった）
//       let data = await getWord(value)
//       console.log(data)
//       items.push(<div>{data.mean}</div>)
//       // return <div>aaaa</div>
//       // await fetch(`/submit?value=${value}`); // なんらかの非同期処理を行うことができる
//     },
//     []
//   );
//   return (
//     <div>
//       <div>{value}</div>
//       {items}
//       <button onClick={handleSubmit}>Submit</button>
//       <button onClick={test}>add</button>
//     </div>
//   )
//   return <button onClick={handleSubmit}>Submit</button>;
// }

// import { atom, selectorFamily, selector } from "recoil";
// const myNumberState = atom({
//   key: "myNumberState",
//   default: 0
// });

// const myNumberAnswer = atom({
//   key: "myNumberAnswer",
//   default: "answer"
// });

// const myMultipliedState = selectorFamily({
//   key: "MyMultipliedNumber",
//   get: (multiplier) => ({ get }) => {
//     console.log("□get:myMultipliedState" + multiplier)
//     return get(myNumberState) * multiplier;
//   },

//   // optional set
//   set: (multiplier) => ({ set }, newValue) => {
//     console.log("■set:myMultipliedState")
//     set(myNumberState, newValue / multiplier);
//   }
// });

// const myMultipliedState2 = selector({
//   key: "MyMultipliedNumber2",
//   get: async ({ get }) => {
//     console.log("□get:myMultipliedState2");
//     let data = {
//       mean: "aaaa",
//     }
//     data = await getWord("ラーメン");
//     return get(myNumberState)+data.mean;
//   },

//   // optional set
//   set: async ({ set, get }, newValue) => {
//     console.log("■set:myMultipliedState2");
//     set(myNumberState, get(myNumberState) + newValue);
//     let data = {
//       mean: "aaaa",
//     }
//     set(myNumberAnswer, data.mean);
//     data = await getWord("ラーメン");
//     console.log(data);
//     set(myNumberAnswer, data.mean);
//   }
// });

// function MyComponent() {
//   // defaults to 2
//   const [number, serNumber] = useRecoilState(myNumberState);

//   // defaults to 200
//   // const multipliedNumber = useRecoilValue(myMultipliedState(100));
//   // const [multipliedNumber,setMultipliedNumber] = useRecoilState(myMultipliedState(50));
//   const [multipliedNumber2, setMultipliedNumber2] = useRecoilState(
//     myMultipliedState2
//   );
//   const answer = useRecoilValue(myNumberAnswer);

//   return (
//     <div>
//       <div>{"a:" + number}</div>
//       {/* <div>{multipliedNumber}</div> */}
//       <div>{"b:" + multipliedNumber2}</div>
//       <div>{"c:" + answer}</div>
//       <div onClick={() => serNumber(number + 1)}>{"MyComponent"}</div>
//       {/* <div onClick={() => setMultipliedNumber(300)}>{"MyComponent2"}</div> */}
//       <div onClick={() => setMultipliedNumber2(1)}>{"MyComponent3"}</div>
//     </div>
//   );
// }

//-----------------------------------------------------------------------------------------
// import { atom, selector } from "recoil";

// export async function testBunki(state) {
//   let data = {};
//   console.log("State Change:" + state);
//   switch (state) {
//     // 状態 ------------------------------------------------------------------------
//     case "A":
//       data = await getWord("ラーメン");
//       break;
//     // 状態 ------------------------------------------------------------------------
//     case "B":
//       data = await getWord("うどん");
//       break;
//   }
//   return data;
// }

// const testState = atom({
//   key: "testState",
//   default: ""
// });

// const testAnswer = atom({
//   key: "testAnswer",
//   default: ""
// });

// const testAnswerSelector = selector({
//   key: "testAnswerSelector",
//   get: async ({ get }) => {
//     let state = get(testState);
//     // const response = await testBunki(state);
//     return response;
//   }
// });

// function Test() {
//   const [state, setState] = useRecoilState(testState);
//   const [answer, serAnswer] = useRecoilState(testAnswer);
//   // const ans2 = useRecoilState(testAnswerSelector);

//   return (
//     <div>
//       <div onClick={() => setState("A")}>{"A セット"}</div>
//       <div onClick={() => setState("B")}>{"B セット"}</div>
//       <div>{state}</div>
//     </div>
//   );
// }

// const currentUserIDState = atom({
//   key: 'CurrentUserID',
//   default: null,
// });

// const userInfoQuery = selectorFamily({
//   key: 'UserInfoQuery',
//   get: userID => async () => {
//     const response = await myDBQuery({userID});
//     if (response.error) {
//       throw response.error;
//     }
//     return response;
//   },
// });

// const currentUserInfoQuery = selector({
//   key: 'CurrentUserInfoQuery',
//   get: ({get}) => get(userInfoQuery(get(currentUserIDState))),
// });

// const friendsInfoQuery = selector({
//   key: 'FriendsInfoQuery',
//   get: ({get}) => {
//     const {friendList} = get(currentUserInfoQuery);
//     const friends = get(waitForAll(
//       friendList.map(friendID => userInfoQuery(friendID))
//     ));
//     return friends;
//   },
// });
//-----------------------------------------------------------------------
// const friendsInfoQuery = selector({
//   key: 'FriendsInfoQuery',
//   get: ({get}) => {
//     const {friendList} = get(currentUserInfoQuery);
//     const friendLoadables = get(waitForNone(
//       friendList.map(friendID => userInfoQuery(friendID))
//     ));
//     return friendLoadables
//       .filter(({state}) => state === 'hasValue')
//       .map(({contents}) => contents);
//   },
// });

// function CurrentUserInfo() {
//   const currentUser = useRecoilValue(currentUserInfoQuery);
//   const friends = useRecoilValue(friendsInfoQuery);

//   const changeUser = useRecoilCallback(({ snapshot, set }) => (userID) => {
//     snapshot.getLoadable(userInfoQuery(userID)); // pre-fetch user info
//     set(currentUserIDState, userID); // change current user to start new render
//   });

//   return (
//     <div>
//       <h1>{currentUser.name}</h1>
//       <ul>
//         {friends.map((friend) => (
//           <li key={friend.id} onClick={() => changeUser(friend.id)}>
//             {friend.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// import { useCallback } from "react";
// import { atom, useRecoilCallback } from "recoil";
// import { talkState, talkStateSelector } from "state/talkState";

// const currentUserNameQuery = selector({
//   key: 'CurrentUserName',
//   get: async ({get}) => {
//     let state = await get(talkState)
//     setMyTalkState(state)
//     const response = await myDBQuery({userID: ,});
//     let response = await getWord(value)
//     return response.name;
//   },
// });

// function CurrentUserInfo() {
//   const userName = useRecoilValue(currentUserNameQuery);
//   return <div>{userName}</div>;
// }

// import { getWord } from "reqests/word";

// const answerText = useRecoilValue(answerTextAtom);
// const [state, setState] = useRecoilState(talkState);

// const text = atom({
//   key: "inputMessage",
//   default: ""
// });
// function TextInput() {
//   const [value, setValue] = useRecoilState(text);
//   const handleChange = useCallback(
//     (event) => setValue(event.currentTarget.value),
//     []
//   );
//   return <input value={value} onChange={handleChange} />;
// }
// function TextSubmit() {
//   const handleSubmit = useRecoilCallback(
//     ({ snapshot }) => async () => {
//       const value = await snapshot.getPromise(text); // text は非同期ではないため、実際には待たない
//       if (!value) return; // 入力のバリデーション（テキストが空だった）
//       let data = await getWord(value)
//       console.log(data)
//       // await fetch(`/submit?value=${value}`); // なんらかの非同期処理を行うことができる
//     },
//     []
//   );
//   return <button onClick={handleSubmit}>Submit</button>;
// }

// import { atom, useRecoilCallback } from "recoil";

// const itemsInCart = atom({
//   key: "itemsInCart",
//   default: 0
// });

// function CartInfoDebug() {

//   const logCartItems = useRecoilCallback(({ snapshot }) => async () => {
//     const numItemsInCart = await snapshot.getPromise(itemsInCart);
//     console.log("Items in cart: ", numItemsInCart);
//   });
//   function test() {

//   }

//   return (
//     <div>
//       <button onClick={logCartItems}>Log Cart Items</button>
//       <button onClick={logCartItems}>Log Cart Items</button>
//     </div>
//   );
// }

// import { useRecoilValue, useRecoilState } from "recoil";
// import { talkState } from "state/talkState";
// import { answerTextAtom } from "state/talkState";
// import { getWord } from "reqests/word";
// import { useRecoilCallback } from "recoil";

// function CurrentUserInfo() {
//   const currentUser = useRecoilValue(talkState);
//   const answer = useRecoilValue(answerTextAtom);

//   const changeUser = useRecoilCallback(({snapshot, set}) => word => {
//     // let data = getWord(word)
//     snapshot.getLoadable(getWord(userID)); // pre-fetch user info
//     snapshot.getPromise().then(

//     )
//     set(answerTextAtom, data.mean); // change current user to start new render
//   });

//   return (
//     <div>
//       <h1>{currentUser.name}</h1>
//       <div onClick={() => changeUser("ラーメン")}>
//         {answer}
//       </div>
//     </div>
//   );
// }

// </div>
// <ul>
// {}
// {friends.map(friend =>
// <li key={friend.id} onClick={() => changeUser(friend.id)}>
// {friend.name}
// </li>
// )}
// </ul>
