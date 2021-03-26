// @ts-ignore
const Client = require("socket.io-client");
const initApp = require("../app");
const newConnection = () => {
  return new Client(`http://localhost:3000`,
    {
      path: "/ws"
    }
  );
};
describe("test socket connection", () => {
  let clientSocket;

  beforeAll((done) => {
    initApp(done);
  });

  afterAll(() => {
    clientSocket.close();
  });

  test("connection should work", (done) => {
    const connection = newConnection();
    connection.on("connection", (data) => {
      done();
    });
  });

  test("login 2 users should work", (done) => {
    const alice = newConnection();

    alice.on("connection", () => {
      alice.emit("login", "alice");
      done();
    });

    const bob = newConnection();
    bob.on("connection", () => {
      bob.emit("login", "alice");
      done();
    });
  });
});
