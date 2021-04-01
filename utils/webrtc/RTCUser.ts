import { io, Socket } from "socket.io-client";
import { Peer } from "simple-peer";

enum SignalingEvents {
  Connected = "connection",
  Login = "login",
  RoomDetails = "roomDetails",
  JoinRoom = "joinRoom",
  CreateRoom = "createRoom",
  Signal = "signal",
  Stream = "stream",
  Initiate = "initiate",
}

const USERNAME_TAG: "@type/Username" = "@type/Username";

interface Username {
  tag: "@type/Username",
  username: string
}

const toUsername = (username: string) => {
  return {
    tag: USERNAME_TAG,
    username: username
  };
};

interface Data {
  from: Username;
  to: Username;
  content: String;
}

class RTCUser {
  username: Username;
  wsServerAddress: string;
  io: Socket;
  connections: Connection[];
  onStream: (stream: MediaStream) => void;

  constructor(username: string, address: string, onStream: (stream: MediaStream) => void, onCalled = undefined) {
    this.username = toUsername(username);
    this.wsServerAddress = address;
    this.connections = [];
    this.onStream = onStream;
    if (onCalled === undefined) {
      this.startSignalingConnection(Connection.defaultConnectHandler(this.io, this.onStream));
    } else {
      this.startSignalingConnection(onCalled);
    }
  }

  startSignalingConnection(onCalled: (data: Data) => void) {
    this.io = io(this.wsServerAddress, {
      path: "/ws"
    });
    this.io.on("connect_error", (error) => console.log(error));
    this.io.on(SignalingEvents.Initiate, onCalled);
    this.io.on(SignalingEvents.Connected, () => this.io.emit(SignalingEvents.Login, this.username));
  }

  connectToUser(username: string) {
    const connection = Connection.connect(this.io, this.onStream)(this.username, toUsername(username));
    this.connections.push(connection);
  }

  connectToRoom(roomName: string) {
    this.io.emit(SignalingEvents.RoomDetails, {
      from: this.username,
      to: roomName,
      content: ""
    });

    this.io.on(SignalingEvents.RoomDetails, (usernames: string[]) => {
      this.io.emit(SignalingEvents.JoinRoom, {
        from: this.username,
        to: roomName,
        content: ""
      });
      usernames.map(username => this.connectToUser(username));
    });
  }

  createRoom(roomName: string) {
    this.io.emit(SignalingEvents.CreateRoom, {
      from: this.username,
      to: roomName,
      content: ""
    });
  }
}

type PeerConnection = any

class Connection {
  caller: Username;
  callee: Username;
  signaling: Socket;
  peer: PeerConnection;

  private constructor(signaling: Socket) {
    this.signaling = signaling;
  }

  static connect = (socket: Socket, onStream: (stream: MediaStream) => void) => (caller: Username, callee: Username): Connection => {
    const connection = new Connection(socket);
    connection.caller = caller;
    connection.callee = callee;
    connection.peer = new Peer({ initiator: true });
    connection.registerSignalHandler();
    connection.signaling.emit(SignalingEvents.Initiate, {
      from: caller,
      to: callee,
      content: ""
    });
    Connection.streamHandler(connection, onStream);
    return connection;
  };

  static defaultConnectHandler = (socket: Socket, onStream: (stream: MediaStream) => void) => (data: Data): Connection => {
    const connection = new Connection(socket);
    connection.caller = data.from;
    connection.callee = data.to;
    connection.peer = new Peer();
    connection.registerSignalHandler();
    Connection.streamHandler(connection, onStream);
    return connection;
  };

  static streamHandler(connection: Connection, onStream: (stream: MediaStream) => void) {
    connection.peer.on(SignalingEvents.Stream, onStream);
  }

  registerSignalHandler() {
    this.peer.on(SignalingEvents.Signal, data => {
      this.signaling.emit(SignalingEvents.Signal, data);
    });
  }

  addStream(stream: MediaStream) {
    this.peer.addStream(stream);
  }
}

export { RTCUser, Connection };
