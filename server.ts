const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  path: "/ws",
  pingInterval: "10000",
  pingTimeout: "3000",
  cookie: false,
  cors: {
    origin: "*",
  },
});
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const LOGIN_USER = new Map();
const ROOMS = new Map();

io.on("connection", (socket) => {
  socket.emit("connection", "");
  socket.on("login", (username) => {
    LOGIN_USER.set(username, socket.id);
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
    io.to(LOGIN_USER.get(data.to)).emit("signal", data);
  });

  socket.on("initiate", (data) => {
    io.to(LOGIN_USER.get(data.to)).emit("initiate", data);
  });

  socket.on("disconnecting", (reason) => {
    console.log(reason);
    LOGIN_USER.forEach((username, socketId) => {
      if (socketId === socket.id) {
        LOGIN_USER.delete(username);
      }
    });
  });
});

nextApp.prepare().then(() => {
  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
