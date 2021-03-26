// @ts-ignore
class SignalingServer {
  dev: any;
  domain: string;
  port: number;
  app: any;
  server: any;
  nextApp: any;
  nextHandler: any;
  io: any;
  prom: any;

  LOGIN_USER = {};
  ROOMS = new Map();

  constructor(domain = "localhost", port = parseInt(process.env.PORT, 10) || 3000) {
    this.dev = process.env.NODE_ENV !== "production";
    this.domain = domain;
    this.port = port;

    this.app = require("express")();
    this.server = require("http").Server(this.app);

    const next = require("next");
    this.nextApp = next({ dev: this.dev });
    this.nextHandler = this.nextApp.getRequestHandler();

    this.io = require("socket.io")(this.server, {
      path: "/ws",
      pingInterval: "10000",
      pingTimeout: "3000",
      cookie: false,
      cors: {
        origin: "*"
      }
    });

    this.prom = require("prom-client");

    this.mountSocketEvent();
    this.registerMetric();
    this.initNextApp();
  }

  async getTotalUsers() {
    return Object.keys(this.LOGIN_USER).length;
  }

  async getUserEachRoom() {
    return Array.from(this.ROOMS.keys()).map((key) => {
      return {
        room: key,
        count: this.ROOMS.get(key).length
      };
    });
  }

  mountSocketEvent() {
    this.io.on("connection", (socket) => {
      socket.emit("connection", "");
      socket.on("login", (username) => {
        this.LOGIN_USER[username] = socket.id;
        console.log(`${username} login`);
      });

      socket.on("getRoomDetails", (data) => {
        const room = this.ROOMS.get(data.to);
        socket.emit("roomDetails", room);
        console.log(
          "get room details: ",
          JSON.stringify(room),
          JSON.stringify(this.ROOMS)
        );
      });

      socket.on("joinRoom", (data) => {
        socket.join(data.to);
        this.ROOMS.get(data.to).push(data.from);
        console.log(`join room: ${this.ROOMS.toString()}`);
      });

      socket.on("createRoom", (data) => {
        socket.join(data.to);
        this.ROOMS.get(data.to).push(data.from);
        console.log(`join room: ${this.ROOMS.toString()}`);
      });

      socket.on("createRoom", (data) => {
        socket.join(data.from);
        this.ROOMS.set(data.from, [data.from]);
        console.log(`create room: ${this.ROOMS.toString()}`);
      });

      socket.on("signal", (data) => {
        this.io.to(this.LOGIN_USER[data.to]).emit("signal", data);
      });

      socket.on("initiate", (data) => {
        this.io.to(this.LOGIN_USER[data.to]).emit("initiate", data);
      });

      socket.on("disconnecting", (reason) => {
        console.log(reason);
        Object.keys(this.LOGIN_USER).forEach((username) => {
          if (this.LOGIN_USER[username] === socket.id) {
            delete this.LOGIN_USER[username];
          }
        });
      });
    });
  }

  registerMetric() {
    new this.prom.Gauge({
      name: "total_ws_users",
      help: "Number of websocket users at a point in time",
      async collect() {
        const currentCounts = await this.getTotalUsers();
        this.set(currentCounts);
      }
    });

    new this.prom.Gauge({
      name: "total_ws_users_each_room",
      help: "Number of websocket users in each room at a point in time",
      labelNames: ["room"],
      async collect() {
        const records = await this.getUserEachRoom();
        records.map(({ room, count }) => this.set({ room: room }, count));
      }
    });

    this.prom.collectDefaultMetrics({
      timeout: 10000,
      gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5] // These are the default buckets.
    });
  }

  initNextApp() {
    this.nextApp.prepare().then(() => {
      this.app.get("/metrics", async (req, res) => {
        res
          .writeHead(200, {
            "Content-Type": this.prom.register.contentType
          })
          .end(await this.prom.register.metrics());
      });

      this.app.get("*", (req, res) => {
        return this.nextHandler(req, res);
      });

      this.server.listen(this.port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${this.port}`);
      });
    });
  }
}
const _ = new SignalingServer()

module.exports = SignalingServer;
