// @ts-ignore
const Client = require("socket.io-client");
const initApp = require("../server")

describe("test socket connection", () => {
  let clientSocket;

  beforeAll((done) => {
    clientSocket = new Client(`http://localhost:3000/ws`);
    clientSocket.on("connect", done);
    initApp()
  });

  afterAll(() => {
    clientSocket.close();
  });

  test("should work", (done) => {
    clientSocket.on("hello", (arg) => {
      expect(arg).toBe("world");
      done();
    });
  });
});
