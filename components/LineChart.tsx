import React from "react";
import styles from "../styles/LineChart.module.css";

// @ts-ignore
import { ResponsiveLine } from "@nivo/line";
import { fetchUserOnlineCounts } from "../utils/analysis";

interface Point {
  x: number | string | Date;
  y: number | string | Date;
}

interface Dataset {
  id: String | number;
  data: Array<Point>;
}

const random = () => Math.floor(Math.random() * 100);

export default class LineChart extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      dataset: [],
    };
  }

  componentDidMount() {
    (async () => {
      const now = Math.floor(Date.now() / 1000);
      const aDay = 3600 * 24;
      const today = await fetchUserOnlineCounts(now, aDay);
      const yesterday = await fetchUserOnlineCounts(now - aDay, aDay);
      today.id = "today";
      yesterday.id = "yesterday";
      this.setState({ dataset: [yesterday, today] });
    })()
  }

  render() {
    return (
      <div className={styles.chart}>
        <ResponsiveLine
          data={this.state.dataset}
          margin={{ top: 50, right: 100, bottom: 50, left: 50 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear" }}
          colors={{ scheme: "nivo" }}
          useMesh={true}
          axisBottom={{
            orient: "bottom",
            legend: "Hours",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            legend: "Counts",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    );
  }
}
