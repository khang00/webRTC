import React from "react";
import Form from "../components/Form";
import { RTCUser } from "../utils/webrtc/RTCUser";
import Stream from "../components/Stream";

export default class WebRTC extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {},
      username: "",
      streams: [],
      isLogin: false
    };
  }

  onStream(stream) {
    this.setState((state) => {
      return { streams: [stream, ...state.streams] };
    });
  }

  render() {
    if (this.state.isLogin) {
      return (
        <div>
          <Form
            title="Call User"
            onSubmit={(username) => {
              this.state.user.connectToUser(username);
            }}
          />
          <Stream streams={this.state.user.streams || []} />
        </div>
      );
    } else {
      return (
        <div>
          <Form
            title="Username"
            onSubmit={(username) => {
              this.setState({
                isLogin: true,
                user: new RTCUser(
                  username,
                  process.env.NEXT_PUBLIC_WS,
                  this.onStream
                )
              });
            }}
          />
        </div>
      );
    }
  }
}
