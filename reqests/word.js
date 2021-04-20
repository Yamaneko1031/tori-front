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

export async function postWord(word, mean, kind, tag) {
  let session_id = getCookieSessionId();
  let response = await fetch(API_ROOT + "/words", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "session-id": session_id
    },
    body: JSON.stringify({
      word: word,
      mean: mean,
      kind: kind,
      secret_tag: tag
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

export async function addWordGood(word) {
  let session_id = getCookieSessionId();
  let response = await fetch(API_ROOT + "/word_good/" + word, {
    method: "PUT",
    cache: "no-cache",
    headers: {
      "session-id": session_id
    }
  });
  if (response.ok) {
  } else {
    console.error("HTTP-Error: " + response.status);
  }
}

export async function addWordBad(word) {
  let session_id = getCookieSessionId();
  let response = await fetch(API_ROOT + "/word_bad/" + word, {
    method: "PUT",
    cache: "no-cache",
    headers: {
      "session-id": session_id
    }
  });
  if (response.ok) {
  } else {
    console.error("HTTP-Error: " + response.status);
  }
}

export async function addWordTag(word, tag) {
  let session_id = getCookieSessionId();
  let response = await fetch(API_ROOT + "/word_tag_add", {
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
    // 合わせてツイートも呼んでおく
    fetch(API_ROOT + "/tag_add_tweet", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "session-id": session_id
      },
      body: JSON.stringify({
        word: word,
        tag: tag
      })
    });
  } else {
    console.error("HTTP-Error: " + response.status);
  }
}

export async function addWordTagText(word, text) {
  let session_id = getCookieSessionId();
  let response = await fetch(API_ROOT + "/word_tag_add_text", {
    method: "PUT",
    cache: "no-cache",
    headers: {
      "session-id": session_id
    },
    body: JSON.stringify({
      word: word,
      text: text
    })
  });
  if (response.ok) {
    let retData = await response.json();
    console.log(retData);
    if (retData["detail"] == "Tag not found.") {
      retData = false;
    } else {
      return retData;
    }
  } else {
    console.error("HTTP-Error: " + response.status);
  }
}

export async function deleteUnknown(word) {
  let session_id = getCookieSessionId();
  let response = await fetch(API_ROOT + "/unknown/" + word, {
    method: "DELETE",
    cache: "no-cache",
    headers: {
      "session-id": session_id
    }
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
    body: JSON.stringify({})
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

export async function getTemp(id) {
  let response = await fetch(API_ROOT + "/word_temp/" + id);
  if (response.ok) {
    let jsonData = await response.json();
    if (jsonData.detail == "Temp not found.") {
      return false;
    } else {
      return jsonData;
    }
  } else {
    console.error("HTTP-Error: " + response.status);
    return false;
  }
}

export async function addJankenResult(result) {
  const query_params = new URLSearchParams({result:result}); 
  let session_id = getCookieSessionId();
  let response = await fetch(API_ROOT + "/janken?" + query_params, {
    method: "PUT",
    cache: "no-cache",
    headers: {
      "session-id": session_id
    }
  });
  if (response.ok) {
  } else {
    console.error("HTTP-Error: " + response.status);
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
