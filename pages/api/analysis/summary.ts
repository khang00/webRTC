const getSummary = (start, duration) => {
  return {
    device: "windows",
    bandWidth: {
      min: 0.52,
      max: 2,
    },
  };
};

export default function handler(req: any, res: any) {
  if (req.method === "GET") {
    const { start, duration } = req.query;
    res.status(200).json(getSummary(start, duration));
  } else {
    res.status(405);
  }
}
