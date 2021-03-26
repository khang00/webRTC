// @ts-ignore
function init() {
  const app = require("express")();
  const server = require("http").Server(app);
  const io = require("socket.io")(server, {
    path: "/ws",
    pingInterval: "10000",
    pingTimeout: "3000",
    cookie: false,
    cors: {
      origin: "*"
    }
  });
  const next = require("next");

  const port = parseInt(process.env.PORT, 10) || 3000;
  const dev = process.env.NODE_ENV !== "production";
  const nextApp = next({ dev });
  const nextHandler = nextApp.getRequestHandler();

  const LOGIN_USER = {};
  const getTotalUsers = async () => Object.keys(LOGIN_USER).length;

  const ROOMS = new Map();
  const getUserEachRoom = async () =>
    Array.from(ROOMS.keys()).map((key) => {
      return {
        room: key,
        count: ROOMS.get(key).length
      };
    });

  io.on("connection", (socket) => {
    socket.emit("connection", "");
    socket.on("login", (username) => {
      LOGIN_USER[username] = socket.id;
      console.log(`${username} login`);
    });

    socket.on("getRoomDetails", (data) => {
      const room = ROOMS.get(data.to);
      socket.emit("roomDetails", room);
      console.log(
        "get room details: ",
        JSON.stringify(room),
        JSON.stringify(ROOMS)
      );
    });

    socket.on("joinRoom", (data) => {
      socket.join(data.to);
      ROOMS.get(data.to).push(data.from);
      console.log(`join room: ${ROOMS.toString()}`);
    });

    socket.on("createRoom", (data) => {
      socket.join(data.to);
      ROOMS.get(data.to).push(data.from);
      console.log(`join room: ${ROOMS.toString()}`);
    });

    socket.on("createRoom", (data) => {
      socket.join(data.from);
      ROOMS.set(data.from, [data.from]);
      console.log(`create room: ${ROOMS.toString()}`);
    });

    socket.on("signal", (data) => {
      io.to(LOGIN_USER[data.to]).emit("signal", data);
    });

    socket.on("initiate", (data) => {
      io.to(LOGIN_USER[data.to]).emit("initiate", data);
    });

    socket.on("disconnecting", (reason) => {
      console.log(reason);
      Object.keys(LOGIN_USER).forEach((username) => {
        if (LOGIN_USER[username] === socket.id) {
          delete LOGIN_USER[username];
        }
      });
    });
  });

  const prom = require("prom-client");
  new prom.Gauge({
    name: "total_ws_users",
    help: "Number of websocket users at a point in time",
    async collect() {
      const currentCounts = await getTotalUsers();
      this.set(currentCounts);
    }
  });

  new prom.Gauge({
    name: "total_ws_users_each_room",
    help: "Number of websocket users in each room at a point in time",
    labelNames: ["room"],
    async collect() {
      const records = await getUserEachRoom();
      records.map(({ room, count }) => this.set({ room: room }, count));
    }
  });

  prom.collectDefaultMetrics({
    timeout: 10000,
    gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5] // These are the default buckets.
  });

  nextApp.prepare().then(() => {
    app.get("/metrics", async (req, res) => {
      res
        .writeHead(200, {
          "Content-Type": prom.register.contentType
        })
        .end(await prom.register.metrics());
    });

    app.get("*", (req, res) => {
      return nextHandler(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
}

module.exports = init;
