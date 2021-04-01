import { atom } from "recoil";
import { selector } from "recoil";
// import { setMyTalkState } from "state/talkStatePreProc";

// 会話全体の状態
const talkStateAtom = atom({
  key: "talkStateAtom",
  default: "開始"
});

// 会話全体の状態
export const talkStateChangePreparation = atom({
  key: "talkStateChangePreparation",
  default: false
});

// 会話全体の状態管理用インターフェース
// 関連する状態のリセットも行う
// export const talkState = selector({
//   key: "talkState",
//   get: ({ get }) => {
//     return get(talkStateAtom);
//   },
//   set: ({ get, set }, newValue) => {
//     set(talkStateAtom, newValue);
//     set(typewriteStateAtom, "none");
//   }
// });
export const talkState = selector({
  key: "talkState",
  get: ({ get }) => {
    return get(talkStateAtom);
  },
  set: ({ get, set }, newValue) => {
    // if (get(talkStateAtom) != newValue) {
    //   setMyTalkState(newValue)
    // }
    set(talkStateAtom, newValue);
    set(typewriteStateAtom, "none");
    set(talkStateChangePreparation, false);
  }
});

// Typewriteのメッセージ状態
// none:非会話 start:話し中 end:話し終わり
export const typewriteStateAtom = atom({
  key: "typewriteState",
  default: "none"
});

// 話始まりの検知用
export const typewriteStateStart = selector({
  key: "typewriteStateStart",
  get: ({ get }) => {
    if (get(typewriteStateAtom) == "start") {
      return true;
    }
    return false;
  }
});

// 話終わりの検知用
export const typewriteStateEnd = selector({
  key: "typewriteStateEnd",
  get: ({ get }) => {
    if (get(typewriteStateAtom) == "end") {
      return true;
    }
    return false;
  }
});

// じゃんけんの情報
export const answerJankenAtom = atom({
  key: "answerJankenAtom",
  default: "none"
});

// 選択肢の情報
export const answerSelectAtom = atom({
  key: "answerSelectAtom",
  default: "none"
});

// 返答の文字情報
export const answerTextAtom = atom({
  key: "answerTextAtom",
  default: "none"
});

// 話終わりの検知用
export const answerData = selector({
  key: "answerData",
  get: async ({ get }) => {
    // let state = await get(talkState)
    let state = get(talkStateAtom)
    let answer = get(answerTextAtom)
    let data = await setMyTalkState(state, answer)
    return data
  }
});


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