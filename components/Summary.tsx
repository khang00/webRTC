import Card from "./Card";
import React from "react";
import { Point } from "../utils/analysis";

const Summary = (props) => {
  const {dataset, bandWidth, device} = props

  const sortedData: Array<Point> = [...(dataset.data)].sort((a, b) => {
    return a.y - b.y;
  });

  const maxTime :number = sortedData[sortedData.length - 1].y;
  const meanTime :number = sortedData[Math.floor(sortedData.length / 2)].y;

  return (
    <div className="container-fluid">
      <Card title="Bandwidth Min" quantity={`${bandWidth.min} Mbs`} />
      <Card title="Bandwidth Max" quantity={`${bandWidth.max} Mbs`} />
      <Card title="The time that has the max online users" quantity={maxTime} />
      <Card
        title="The time that has the median online users"
        quantity={meanTime}
      />
      <Card title="Common devices" quantity={device} />
    </div>
  );
};

export default Summary;
