import React from "react";
// import "../components/Room.scss";
import { MDBBtn, MDBDataTable } from "mdbreact";
import AccountInfo from "../components/AccountInfo";

export default class AdvancedTools extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    //get room data from Backend
  }

  render() {
    return (
      <div className="advanced-tools-layout">
        <h3>Advanced management tools</h3>
        <AccountInfo title="Grafana" iconurl="https://i.pinimg.com/originals/ed/52/04/ed52045809ad01c33d1e1859531cb264.jpg" username="admin" password="admin" url="http://rtc-test.fromlabs.com:3000/"/>
        <AccountInfo title="InfluxDB" iconurl="https://assets.zabbix.com/img/brands/influxdb.svg" username="admin" password="12345678" url="http://rtc-test.fromlabs.com:8086/"/>

      </div>
    );
  }
}
