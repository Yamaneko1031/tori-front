import { parseCookies, setCookie, destroyCookie } from "nookies";
import useSWR from 'swr'
import { random } from "util/random";
  
const API_ROOT = "https://muchan-api-6gun3ieocq-an.a.run.app";
// const API_ROOT = "http://localhost:8000";

// const fetcher = url => fetch(url).then(r => r.json())

// //ユーザー情報の取得
// export function useTags () {
//   const { data, error } = useSWR(API_ROOT + "/tags", fetcher)
//   return {
//     tags: data,
//     isLoading: !error && !data,
//     isError: error
//   }
// }

// export async function getTags() {
//   let response = await fetch(API_ROOT + "/tags");
//   let retData;
//   if (response.ok) {
//     retData = await response.json();
//   } else {
//     console.error("HTTP-Error: " + response.status);
//     retData = false;
//   }
//   return retData;
// }

export async function getTag(tag) {
  const query_params = new URLSearchParams({tag:tag}); 
  let response = await fetch(API_ROOT + "/tag?" + query_params);
  let retData;
  if (response.ok) {
    retData = await response.json();
  } else {
    console.error("HTTP-Error: " + response.status);
    retData = false;
  }
  return retData;
}

export async function getTagChoices() {
  let response = await fetch(API_ROOT + "/tag/choices");
  let retData;
  if (response.ok) {
    retData = await response.json();
  } else {
    console.error("HTTP-Error: " + response.status);
    retData = false;
  }
  return retData;
}

// export function useTag1(word) {
//   fetch(API_ROOT + "/tag1/" + word, {
//     method: "PUT"
//   });
// }

// export function useTag2(word) {
//   fetch(API_ROOT + "/tag2/" + word, {
//     method: "PUT"
//   });
// }

export async function getTagRandom() {
    const cookies = parseCookies();
    let index = 0
    console.log("a"+cookies)
    if (!cookies.allTagData) {
      // let tagData = await getTags()
      let tagData = Object.create(await getTags());
      console.log("b"+tagData)
      setCookie(null, "allTagData", tagData);
      index = random(0, tagData[0].length - 1)
      return tagData[0][index];
    }
    else {
      index = random(0, cookies.allTagData[0].length - 1)
      console.log("d"+index)
      console.log(cookies.allTagData)
      console.log(cookies.allTagData[0])
      return cookies.allTagData[0][index];
    }
}