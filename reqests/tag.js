import { parseCookies, setCookie, destroyCookie } from "nookies";
import useSWR from 'swr'
import { random } from "util/random";
  
const API_ROOT = process.env.NEXT_PUBLIC_API_URL;

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

export async function getTagRandom() {
  let response = await fetch(API_ROOT + "/tag/more0");
  let retData;
  if (response.ok) {
    retData = await response.json();
  } else {
    console.error("HTTP-Error: " + response.status);
    retData = false;
  }
  return retData;
}