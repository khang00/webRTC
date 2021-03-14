const USER_ONLINE_COUNT_ENDPOINT =
  "http://localhost:3000/api/analysis/UserOnlineCounts";

const getData = async (urlString: string, params: Object) => {
  const url = new URL(urlString);
  Object.keys(params).map((key) => url.searchParams.append(key, params[key]));
  const result = await fetch(url.toString());
  return await result.json();
};


interface Point {
  x: number | string | Date;
  y: number | string | Date;
}

interface Dataset {
  id: String | number;
  data: Array<Point>;
}

export const fetchUserOnlineCounts = async (
  start: number,
  duration: number
) :Promise<Dataset> => {
  return getData(USER_ONLINE_COUNT_ENDPOINT, {
    start: start,
    duration: duration,
  });
};
