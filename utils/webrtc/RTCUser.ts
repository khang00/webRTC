import { io, Socket } from "socket.io-client";
import Peer from "simple-peer";

const ICE_SERVERS = [
  {
    urls: "turn:178.128.119.82:3478",
    username: "khang",
    credential: "123456",
  },
  {
    urls: "stun:178.128.119.82:3478",
    username: "khang",
    credential: "123456",
  },
];

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
  tag: "@type/Username";
  username: string;
}

const toUsername = (username: string) => {
  return {
    tag: USERNAME_TAG,
    username: username,
  };
};

interface Data {
  from: string;
  to: string;
  content: String;
}

class RTCUser {
  username: string;
  wsServerAddress: string;
  io: Socket;
  connections: Connection[];
  onStream: (stream: MediaStream) => void;
  onCalled: (data: Data) => void;

  constructor(
    username: string,
    address: string,
    onStream: (stream: MediaStream) => void,
    onCalled = undefined
  ) {
    this.username = username;
    this.wsServerAddress = address;
    this.connections = [];
    this.onStream = onStream;
    this.onCalled = onCalled;
    this.startSignalingConnection();
  }

  startSignalingConnection() {
    this.io = io(this.wsServerAddress, {
      path: "/ws",
    });
    this.io.on("connect_error", (error) => console.log(error));
    if (this.onCalled === undefined) {
      this.io.on(
        SignalingEvents.Initiate,
        Connection.defaultConnectHandler(this.io, this.onStream)
      );
    } else {
      this.io.on(SignalingEvents.Initiate, this.onCalled);
    }
    this.io.on(SignalingEvents.Connected, () =>
      this.io.emit(SignalingEvents.Login, this.username)
    );
  }

  connectToUser(username: string) {
    const connection = Connection.connect(this.io, this.onStream)(
      this.username,
      username
    );
    this.connections.push(connection);
  }

  connectToRoom(roomName: string) {
    this.io.emit(SignalingEvents.RoomDetails, {
      from: this.username,
      to: roomName,
      content: "",
    });

    this.io.on(SignalingEvents.RoomDetails, (usernames: string[]) => {
      this.io.emit(SignalingEvents.JoinRoom, {
        from: this.username,
        to: roomName,
        content: "",
      });
      usernames.map((username) => this.connectToUser(username));
    });
  }

  createRoom(roomName: string) {
    this.io.emit(SignalingEvents.CreateRoom, {
      from: this.username,
      to: roomName,
      content: "",
    });
  }
}

type PeerConnection = any;

class Connection {
  owner: string;
  caller: string;
  callee: string;
  signaling: Socket;
  peer: PeerConnection;

  static connect = (
    socket: Socket,
    onStream: (stream: MediaStream) => void
  ) => (caller: string, callee: string): Connection => {
    const connection = new Connection();
    connection.signaling = socket;
    connection.owner = caller;
    connection.caller = caller;
    connection.callee = callee;
    connection.peer = new Peer({
      initiator: true,
      config: {
        iceServers: ICE_SERVERS,
      },
    });
    connection.registerSignalHandler();
    connection.signaling.emit(SignalingEvents.Initiate, {
      from: caller,
      to: callee,
      content: "",
    });
    Connection.streamHandler(connection, onStream);
    return connection;
  };

  static defaultConnectHandler = (
    socket: Socket,
    onStream: (stream: MediaStream) => void
  ) => (data: Data): Connection => {
    const connection = new Connection();
    connection.signaling = socket;
    connection.owner = data.to;
    connection.caller = data.from;
    connection.callee = data.to;
    connection.peer = new Peer({
      config: {
        iceServers: ICE_SERVERS,
      },
    });
    console.log(connection);
    connection.registerSignalHandler();
    Connection.streamHandler(connection, onStream);
    return connection;
  };

  static streamHandler(
    connection: Connection,
    onStream: (stream: MediaStream) => void
  ) {
    connection.peer.on(SignalingEvents.Stream, onStream);
  }

  registerSignalHandler() {
    this.peer.on(SignalingEvents.Signal, (signalData) => {
      console.log("signal sends");
      const to = this.owner === this.caller ? this.callee : this.caller;
      console.log(to);
      this.signaling.emit(SignalingEvents.Signal, {
        from: this.owner,
        to: to,
        content: signalData,
      });
    });

    this.signaling.on(SignalingEvents.Signal, (data) => {
      console.log("signal comes");
      this.peer.signal(data.content);
    });
  }

  addStream(stream: MediaStream) {
    this.peer.addStream(stream);
  }
}

export { RTCUser, Connection };
