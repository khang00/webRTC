import React from "react";
import { RTCUser } from "../utils/webrtc/RTCUser";

export default class WebRTC extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      user: {},
      username: "",
      streams: []
    };
  }

  onUsername(event) {
    console.log(this);
    this.setState({
      username: event.target.value
    });
  }

  onStream(stream) {
    this.setState((state) => {
      return { streams: [stream, ...state.streams] };
    });
  }

  onBegin(event) {
    this.setState((state) => {
      return {
        user: new RTCUser(state.username,"", this.onStream)
      };
    });
  }

  render() {
    const isBegun = this.state.user === {};

    return (<div>
      <input type="text" value={this.state.username} onChange={this.onUsername} />
      <button onClick={this.onBegin}>Begin</button>
    </div>);
  }
}
