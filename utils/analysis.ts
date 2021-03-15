import { A_DAY, getToday } from "./time";
import { Dataset, SummaryData } from "./data";

const USER_ONLINE_COUNT_ENDPOINT =
  process.env.NEXT_PUBLIC_DOMAIN +
  process.env.NEXT_PUBLIC_USER_ONLINE_COUNTS_PATH;

const SUMMARY_ENDPOINT =
  process.env.NEXT_PUBLIC_DOMAIN + process.env.NEXT_PUBLIC_SUMMARY_PATH;

const getData = async (urlString: string, params: Object) => {
  console.log(urlString);
  const url = new URL(urlString);
  Object.keys(params).map((key) => url.searchParams.append(key, params[key]));
  const result = await fetch(url.toString());
  return await result.json();
};

export const fetchUserOnlineCounts = async (
  start: number,
  duration: number
): Promise<Dataset> => {
  return getData(USER_ONLINE_COUNT_ENDPOINT, {
    start: start,
    duration: duration,
  });
};

export const fetchUserOnlineCountsToday = async () => {
  return fetchUserOnlineCounts(getToday(), A_DAY);
};

export const fetchSummary = async (start, duration): Promise<SummaryData> => {
  return getData(SUMMARY_ENDPOINT, {
    start: start,
    duration: duration,
  });
};

export const fetchSummaryToday = async (): Promise<SummaryData> => {
  return fetchSummary(getToday(), A_DAY);
};
