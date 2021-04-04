import { parseCookies, setCookie, destroyCookie } from "nookies";

const API_ROOT = "https://muchan-api-6gun3ieocq-an.a.run.app";
// const API_ROOT = "http://localhost:8000";

function getCookieSessionId() {
  const cookies = parseCookies();
  let session_id = "";
  console.log(cookies.session_id);
  if (cookies.session_id) {
    session_id = cookies.session_id;
  }
  return session_id;
}

export async function getWord(word) {
  let response = await fetch(API_ROOT + "/words/" + word);
  let retData;
  if (response.ok) {
    retData = await response.json();
    if (retData["detail"] == "unknown word.") {
      retData = false;
    }
  } else {
    console.error("HTTP-Error: " + response.status);
    retData = false;
  }
  return retData;
}

export async function getTopicWord() {
  let response = await fetch(API_ROOT + "/words_topic_word");
  if (response.ok) {
    let jsonData = await response.json();
    if (jsonData.detail == "Not found.") {
      return false;
    } else {
      return jsonData;
    }
  } else {
    console.error("HTTP-Error: " + response.status);
    return false;
  }
}

export async function getTopicUnknown() {
  let response = await fetch(API_ROOT + "/words_topic_unknown");
  if (response.ok) {
    let jsonData = await response.json();
    if (jsonData.detail == "Not found.") {
      return false;
    } else {
      return jsonData;
    }
  } else {
    console.error("HTTP-Error: " + response.status);
    return false;
  }
}

export async function getTopicTaught() {
  let session_id = getCookieSessionId();
  let response = await fetch(API_ROOT + "/words_topic_taught", {
    headers: {
      "session-id": session_id
    }
  });
  if (response.ok) {
    let jsonData = await response.json();
    if (jsonData.detail == "Not found.") {
      return false;
    } else {
      return jsonData;
    }
  } else {
    console.error("HTTP-Error: " + response.status);
    return false;
  }
}

export async function postWord(word, mean) {
  let session_id = getCookieSessionId();
  let response = await fetch(API_ROOT + "/words", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "session-id": session_id
    },
    body: JSON.stringify({
      word: word,
      mean: mean
    })
  });
  let retData;
  if (response.ok) {
    retData = await response.json();
    if (retData["detail"] == "unknown word.") {
      retData = false;
    }
  } else {
    console.error("HTTP-Error: " + response.status);
    retData = false;
  }
  return retData;
}

export async function addWordTag1(word, tag) {
  let session_id = getCookieSessionId();
  let response = await fetch(API_ROOT + "/word_tag_add1", {
    method: "PUT",
    cache: "no-cache",
    headers: {
      "session-id": session_id
    },
    body: JSON.stringify({
      word: word,
      tag: tag
    })
  });
  if (response.ok) {
  } else {
    console.error("HTTP-Error: " + response.status);
  }
}

export async function addWordTag2(word, tag) {
  let session_id = getCookieSessionId();
  let response = await fetch(API_ROOT + "/word_tag_add2", {
    method: "PUT",
    cache: "no-cache",
    headers: {
      "session-id": session_id
    },
    body: JSON.stringify({
      word: word,
      tag: tag
    })
  });
  if (response.ok) {
  } else {
    console.error("HTTP-Error: " + response.status);
  }
}

export async function rememberedTweet() {
  let session_id = getCookieSessionId();
  let response = await fetch(API_ROOT + "/remembered_tweet", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "session-id": session_id
    },
    body: JSON.stringify({
    })
  });
  if (response.ok) {
  } else {
    console.error("HTTP-Error: " + response.status);
  }
}

export async function getSessionId() {
  if (typeof window !== "undefined") {
    let session_id = getCookieSessionId();

    let response = await fetch(API_ROOT + "/word_session", {
      headers: {
        "session-id": session_id
      },
      method: "GET"
    });

    if (response.ok) {
      let retData = await response.json();
      if (retData["session_id"]) {
        setCookie(null, "session_id", retData["session_id"]);
      }
    } else {
      console.error("HTTP-Error: " + response.status);
    }
  }
}

// export async function getSessionId() {
//   if (typeof window !== "undefined") {
//     let session_id = getCookieSessionId()

//     let response = await fetch(API_ROOT + "/word_session", {
//       headers: {
//         "session-id": session_id
//       },
//       method: "GET"
//     });

//     if (response.ok) {
//       let retData = await response.json();
//       if (retData["session_id"]) {
//         setCookie(null, "session_id", retData["session_id"]);
//       }
//     } else {
//       console.error("HTTP-Error: " + response.status);
//     }
//   }
// }
