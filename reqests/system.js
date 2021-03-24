// const API_ROOT = "https://muchan-api-6gun3ieocq-an.a.run.app";
const API_ROOT = "http://127.0.0.1:8000";

export async function getSessionId(session_id) {
  let response = await fetch(API_ROOT + "/session", {
    headers: {
      session_id: session_id
      // 'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  });
  let retData;
  if (response.ok) {
    retData = await response.json();
    console.log("1:" + retData["session_id"]);
  } else {
    console.error("HTTP-Error: " + response.status);
    retData = false;
  }
  console.log("2:" + retData["session_id"]);
  return retData;
}

export async function testRequest() {
  let response = await fetch(API_ROOT + "/test");
  let retData;
  if (response.ok) {
    retData = await response.json();
    console.log(retData);
  } else {
    console.error("HTTP-Error: " + response.status);
    retData = false;
  }
  // return retData;
}
