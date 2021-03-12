import React from "react";

import Card from "../components/Card";
import LineChart from "../components/LineChart";

export default class Overview extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentDate: Date().toLocaleString(),
      total: {
        user: 60,
        currentOnlineUser: 16,
        numberRooms: 6,
        serverRequest: 64,
      },
      todayInfo: {
        bandwidthMin: "4 Mbps",
        bandwidthMax: "9.5 Mbps",
        mostUseTime: "10AM",
        averageUsingTime: "3h 8m",
        commonDevices: "Windows laptop",
      },
      monthlyInfo: {
        totalRequest: 4238,
        totalTimeUserActive: 1005,
        timeHasMostAccess: "9:00 AM",
        timeHasLessAccess: "00:00 PM",
      },
    };
  }
  componentDidMount() {}

  render() {
    return (
      <div>
        <h3 style={{ padding: "1rem" }}>Overview</h3>
        <div className="container-fluid">
          <div className="row" style={{ paddingBottom: "1rem" }}>
            <div className="col-sm-3">
              <Card
                title="Total number of users"
                quantity={this.state.total.user}
              />
            </div>
            <div className="col-sm-3">
              <Card
                title="Number of online users"
                quantity={this.state.total.currentOnlineUser}
              />
            </div>
            <div className="col-sm-3">
              <Card
                title="Number of rooms"
                quantity={this.state.total.numberRooms}
              />
            </div>
            <div className="col-sm-3">
              <Card
                title="Total server request"
                quantity={this.state.total.serverRequest}
              />
            </div>
          </div>

          <div className="row no-gutters" style={{ backgroundColor: "white" }}>
            <div className="col-sm-8">
              <h5 style={{ padding: "1rem" }}>Today's info</h5>
              <LineChart />
            </div>
            <div className="col-sm-4">
              <Card
                title="Bandwidth Min"
                quantity={this.state.todayInfo.bandwidthMin}
              />
              <Card
                title="Bandwidth Max"
                quantity={this.state.todayInfo.bandwidthMax}
              />
              <Card
                title="Most use time"
                quantity={this.state.todayInfo.mostUseTime}
              />
              <Card
                title="Average using time"
                quantity={this.state.todayInfo.averageUsingTime}
              />
              <Card
                title="Common devices"
                quantity={this.state.todayInfo.commonDevices}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6" style={{ backgroundColor: "white" }}>
              <h5 style={{ paddingTop: "2rem" }}>Monthly info</h5>
              <p style={{ paddingLeft: "2rem" }}>of OFFICE</p>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-8">
                    <h5>Total request of this month</h5>
                  </div>
                  <div className="col-sm-4">
                    <p>{this.state.monthlyInfo.totalRequest}</p>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-8">
                    <h5>Total time user active</h5>
                  </div>
                  <div className="col-sm-4">
                    <p>{this.state.monthlyInfo.totalTimeUserActive}</p>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-8">
                    <h5>Time has most user access</h5>
                  </div>
                  <div className="col-sm-4">
                    <p>{this.state.monthlyInfo.timeHasMostAccess}</p>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-8">
                    <h5>Time has least user access</h5>
                  </div>
                  <div className="col-sm-4">
                    <p>{this.state.monthlyInfo.timeHasLessAccess}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6" style={{ backgroundColor: "white" }}>
              <img
                style={{ width: "100%" }}
                src="https://upload.wikimedia.org/wikipedia/commons/3/38/Worldmap-blank.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
