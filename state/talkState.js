import { atom } from "recoil";
import { selector } from "recoil";

// 会話全体の状態
const talkStateAtom = atom({
  key: "talkStateAtom",
  default: "start"
});

// 会話全体の状態管理用インターフェース
// 関連する状態のリセットも行う
export const talkState = selector({
  key: "talkState",
  get: ({ get }) => {
    return get(talkStateAtom);
  },
  set: ({ get, set }, newValue) => {
    set(talkStateAtom, newValue);
    set(typewriteStateAtom, "none");
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

// 返答の文字情報
export const answerTextAtom = atom({
  key: "answerTextAtom",
  default: "none"
});
