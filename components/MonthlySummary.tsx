import React from "react";
import { SummaryData } from "../utils/data";

interface Props {
  monthLySummary: SummaryData;
}

const MonthlySummary = (props: Props) => {
  const {
    totalRequest,
    timeMostUserAccess,
    timeLeastUserAccess,
  } = props.monthLySummary;

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8">
            <h5>Total request of this month</h5>
          </div>
          <div className="col-sm-4">
            <p>{totalRequest}</p>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8">
            <h5>Total time user active</h5>
          </div>
          <div className="col-sm-4">
            <p>{timeLeastUserAccess}</p>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8">
            <h5>Time has most user access</h5>
          </div>
          <div className="col-sm-4">
            <p>{timeMostUserAccess}</p>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8">
            <h5>Time has least user access</h5>
          </div>
          <div className="col-sm-4">
            <p>{timeLeastUserAccess}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlySummary;
