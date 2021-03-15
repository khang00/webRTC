import { A_DAY, getToday } from "./time";
import { Dataset, SummaryData } from "./data";

const USER_ONLINE_COUNT_ENDPOINT =
  "http://localhost:3000/api/analysis/UserOnlineCounts";

const getData = async (urlString: string, params: Object) => {
  const url = new URL(urlString);
  Object.keys(params).map((key) => url.searchParams.append(key, params[key]));
  const result = await fetch(url.toString());
  return await result.json();
};

export const fetchUserOnlineCounts = async (
  start: number,
  duration: number
) :Promise<Dataset> => {
  return getData(USER_ONLINE_COUNT_ENDPOINT, {
    start: start,
    duration: duration,
  });
};

export const fetchUserOnlineCountsToday = async () => {
  return fetchUserOnlineCounts(getToday(), A_DAY)
}


const SUMMARY_ENDPOINT = "http://localhost:3000/api/analysis/summary"

export const fetchSummary = async (start, duration) :Promise<SummaryData> => {
 return getData(SUMMARY_ENDPOINT, {
   start: start,
   duration: duration,
 })
}

export const fetchSummaryToday = async () :Promise<SummaryData> => {
  return fetchSummary(getToday(), A_DAY)
}
