// const API_ROOT = "https://muchan-api-6gun3ieocq-an.a.run.app";
const API_ROOT = "http://127.0.0.1:8000";

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

export async function postWord(word, mean) {
  let response = await fetch(API_ROOT + "/words", {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify({
      word: word,
      mean: mean,
      tag_list: []
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
