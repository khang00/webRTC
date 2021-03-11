import React from "react";
import styles from "../styles/LineChart.module.css"

// @ts-ignore
import { ResponsiveLine } from "@nivo/line";

interface Point {
  x: number | string | Date;
  y: number | string | Date;
}

interface Dataset {
  id: String | number;
  data: Array<Point>;
}

type UnixSecond = number;

const random = () => Math.floor(Math.random() * 100);

const fetchData = (start: UnixSecond, duration: UnixSecond): Dataset => {
  const interval = 3600;
  const size = Math.floor(duration / interval);
  const data = Array.from(Array(size), (item, index) => {
    return { x: new Date((start + index * interval) * 1000).getHours(), y: random() };
  });

  return {
    id: start,
    data: data,
  };
};

export default class LineChart extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      dataset: [],
    };
  }

  componentDidMount() {
    const now = Math.floor(Date.now() / 3600);
    const aDay = 3600 * 24;
    const today = fetchData(now, aDay);
    const yesterday = fetchData(now - aDay, aDay);
    today.id = "today"
    yesterday.id = "yesterday"
    this.setState({ dataset: [yesterday, today] });
  }

  render() {
    return <div className={styles.chart}>
      <ResponsiveLine
        data={this.state.dataset}
        margin={{ top: 50, right: 100, bottom: 50, left: 50 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear' }}
        colors={{ scheme: 'nivo' }}
        useMesh={true}
        axisBottom={{
          orient: 'bottom',
          legend: 'Hours',
          legendOffset: 36,
          legendPosition: 'middle'
        }}
        axisLeft={{
          orient: 'left',
          legend: 'Counts',
          legendOffset: -40,
          legendPosition: 'middle'
        }}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
      />
    </div>;
  }
}

