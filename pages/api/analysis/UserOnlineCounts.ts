const random = () => Math.floor(Math.random() * 20);

const getUserOnlineByInterval = (start: number, duration: number) => {
  const interval = 3600;
  const size = Math.floor(duration / interval);
  const data = Array.from(Array(size), (item, index) => 0).map(
    (item, index) => {
      // WARNING: Do not reduce this formula, in NextJS
      // start * 1000 + index * 1000 * 3600 !== (start + index * 3600) * 1000
      const thisDate = new Date(start * 1000 + index * 1000 * interval);

      return {
        x: `${thisDate.getHours()}:${thisDate.getMinutes()}`,
        y: random(),
      };
    }
  );

  return {
    id: start,
    data: data,
  };
};

export default function handler(req: any, res: any) {
  if (req.method === "GET") {
    const { start, duration } = req.query;
    res.status(200).json(getUserOnlineByInterval(start, duration));
  } else {
    res.status(405);
  }
}
