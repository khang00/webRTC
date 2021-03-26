import React from "react";

import Card from "../components/Card";
import LineChart from "../components/LineChart";
import Map from "../components/Map";
import {
  fetchSummary,
  fetchSummaryToday,
  fetchUserOnlineCounts,
  fetchUserOnlineCountsToday,
} from "../utils/analysis";
import { Dataset, SummaryData } from "../utils/data";
import Summary from "../components/Summary";
import { DAYS, MONTHS, getToday } from "../utils/time";
import MonthlySummary from "../components/MonthlySummary";

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
      summaryMonthly: {
        totalRequest: 0,
        timeMostUserAccess: "",
        timeLeastUserAccess: "",
        device: "",
        bandWidth: {
          min: 0,
          max: 0,
        },
      },
      summary: {
        totalRequest: 0,
        timeMostUserAccess: "",
        timeLeastUserAccess: "",
        device: "",
        bandWidth: {
          min: 0,
          max: 0,
        },
      },
    };
  }

  async getLast2DaysData() {
    const today: Dataset = await fetchUserOnlineCountsToday();
    const yesterday: Dataset = await fetchUserOnlineCounts(
      getToday() - DAYS,
      DAYS
    );
    today.id = "today";
    yesterday.id = "yesterday";
    this.setState({ dataset: [yesterday, today] });
  }

  async getSummary() {
    const summary: SummaryData = await fetchSummaryToday();
    this.setState({ summary: summary });
  }

  async getSummaryMonth() {
    const summary: SummaryData = await fetchSummary(
      getToday() - MONTHS,
      MONTHS
    );
    this.setState({ summaryMonthly: summary });
  }

  componentDidMount() {
    (async () => {
      await this.getLast2DaysData();
      await this.getSummary();
      await this.getSummaryMonth();
      this.setState({ loading: false });
    })();
  }

  loading() {
    return <div></div>;
  }

  render() {
    if (this.state.loading === true) {
      return this.loading();
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
                <Summary
                  bandWidth={this.state.summary.bandWidth}
                  device={this.state.summary.device}
                  dataset={this.state.dataset[1]}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6" style={{ backgroundColor: "white" }}>
                <h5 style={{ paddingTop: "2rem" }}>Monthly info of OFFICE</h5>
                <MonthlySummary monthLySummary={this.state.summaryMonthly} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
