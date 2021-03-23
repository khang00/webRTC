import { getUserOnlineByInterval } from "./userOnlineCounts";
import { NextApiRequest, NextApiResponse } from "next";

interface Frequency {
  x: string,
  y: number
}

const IdentityFreq: Frequency = {
  x: "",
  y: 0
};

const getSummary = (start, duration) => {
  const dataset = getUserOnlineByInterval(start, duration);
  const timeMost = dataset.data.reduce((pre: Frequency, curr: Frequency) => {
    return (pre.y > curr.y) ? pre : curr;
  }, IdentityFreq).x;


  const timeLeast = dataset.data.reduce((pre: Frequency, curr: Frequency) => {
    return (pre.y < curr.y) ? pre : curr;
  }, IdentityFreq).x;

  return {
    totalRequest: dataset.data.length,
    timeMostUserAccess: timeMost,
    timeLeastUserAccess: timeLeast,
    device: "windows",
    bandWidth: {
      min: 0.52,
      max: 2
    }
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { start, duration } = req.query;
    res.status(200).json(getSummary(start, duration));
  } else {
    res.status(405);
  }
}
