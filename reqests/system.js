import useSWR from "swr";

const API_ROOT = "https://muchan-api-6gun3ieocq-an.a.run.app";
// const API_ROOT = "http://127.0.0.1:8000";

const fetcher = (url) => fetch(url).then((r) => r.json());

//ユーザー情報の取得
export function useSystemInfo() {
  const { data, error } = useSWR(API_ROOT + "/info", fetcher);
  return {
    info: data,
    isLoading: !error && !data,
    isError: error
  };
}

export async function getJankenResult() {
  let response = await fetch(API_ROOT + "/janken");
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
