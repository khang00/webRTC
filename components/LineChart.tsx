import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"));

export default class LineChart extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    let hoursArray: any = [];
    for (let index = 0; index < 23; index++) {
      hoursArray.push(index);
    }

    this.state = {
      series: [],
      options: {
        chart: {
          height: 350,
          type: "line",
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
        },
        colors: ["#77B6EA", "#545454"],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "Comparision between today and yesterday",
          align: "center",
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        markers: {
          size: 1,
        },
        xaxis: {
          categories: hoursArray,
          title: {
            text: "Hours",
          },
        },
        yaxis: {
          title: {
            text: "Number of users",
          },
          min: 0,
          max: 150,
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5,
        },
      },
    };
  }

  componentDidMount() {
    let todayArray = [];
    let yesterdayArray = [];
    for (let index = 0; index < 23; index++) {
      todayArray.push(Math.floor(Math.random() * Math.floor(100)));
      yesterdayArray.push(Math.floor(Math.random() * Math.floor(100)));
    }

    //get room data from Backend
    let dataFromBackend = [
      {
        name: "Today",
        data: todayArray,
      },
      {
        name: "Yesterday",
        data: yesterdayArray,
      },
    ];
    this.setState({ series: dataFromBackend });
  }

  render() {
    return (
      <div className="line-chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={500}
        />
      </div>
    );
  }
}
