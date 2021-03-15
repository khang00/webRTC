import React from "react";

import Card from "../components/Card";
import LineChart from "../components/LineChart";
import Map from "../components/Map";
import {
  Dataset,
  fetchSummary,
  fetchSummaryToday,
  fetchUserOnlineCounts,
  fetchUserOnlineCountsToday,
  SummaryData
} from "../utils/analysis";
import Summary from "../components/Summary";
import { A_DAY, getNow, getToday } from "../utils/time";

export default class Overview extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      dataset: [],
      loading: true,
      currentDate: Date().toLocaleString(),
      total: {
        user: 60,
        currentOnlineUser: 16,
        numberRooms: 6,
        serverRequest: 64,
      },
      summary: {
        device: "",
        bandWidth: {
          min: 0,
          max: 0
        }
      },
      monthlyInfo: {
        totalRequest: 4238,
        totalTimeUserActive: 1005,
        timeHasMostAccess: "9:00 AM",
        timeHasLessAccess: "00:00 PM",
      },
    };
  }

  async getData() {
    const today :Dataset = await fetchUserOnlineCountsToday();
    const yesterday :Dataset = await fetchUserOnlineCounts(getToday() - A_DAY, A_DAY);
    today.id = "today";
    yesterday.id = "yesterday";
    this.setState({ dataset: [yesterday, today] });
  }

  async getSummary() {
    const summary :SummaryData = await fetchSummaryToday();
    this.setState({summary : summary})
  }

  componentDidMount() {
    (async () => {
      await this.getData()
      // await this.getSummary()
      this.setState({loading: false})
    })()

  }
  loading() {
    return <div></div>
  }
  render() {
    if (this.state.loading === true) {
      return this.loading()
    } else {
      return (
        <div>
          <div className="container-fluid">
            <div className="row">
              <Map />
            </div>

            <h3>Overview</h3>

            <div className="row" style={{ paddingBottom: "1rem" }}>
              <div className="col-sm-3" style={{ textAlign: "center" }}>
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

            <div className="row" style={{ backgroundColor: "white" }}>
              <div className="col-sm-8">
                <h5 style={{ padding: "1rem" }}>Today's info</h5>
                <LineChart dataset={this.state.dataset} />
              </div>

              <div className="col-sm-4">
                {/*<Summary bandWidth={this.state.summary.bandWidth}*/}
                {/*         device={this.state.summary.device}*/}
                {/*         dataset={this.state.dataset[1]}/>*/}
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
            </div>
          </div>
        </div>
      );
    }

  }
}
