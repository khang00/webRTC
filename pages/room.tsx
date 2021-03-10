import React from "react";
import "../components/Room.scss";
import { MDBBtn, MDBDataTable } from "mdbreact";

export default class Room extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      roomData: "",
    };
  }

  componentDidMount() {
    //get room data from Backend
    const dataFromBackend = [
      {
        roomDetails: "Office room 1",
        adminName: "Bao Tran",
        date: "5/26/2019",
        serverStatus: "High",
      },
      {
        roomDetails: "Office room 2",
        adminName: "Khang Dang 1",
        date: "5/24/2019",
        serverStatus: "Low",
      },
      {
        roomDetails: "Office room 3",
        adminName: "Minh Vu",
        date: "7/15/2018",
        serverStatus: "Normal",
      },
      {
        roomDetails: "Office room 4",
        adminName: "Minh Truc",
        date: "5/18/2020",
        serverStatus: "High",
      },
    ];

    dataFromBackend.forEach((room: any) => {
      if (room.serverStatus == "High") {
        room.serverStatus = <MDBBtn color="danger">High</MDBBtn>;
      }
      if (room.serverStatus == "Normal") {
        room.serverStatus = <MDBBtn color="success">Normal</MDBBtn>;
      }
      if (room.serverStatus == "Low") {
        room.serverStatus = <MDBBtn color="warning">Low</MDBBtn>;
      }
    });
    console.log(dataFromBackend);

    this.setState({ roomData: dataFromBackend });
  }

  render() {
    return (
      <div className="room-layout">
        <h2>Room</h2>
        <select
          className="form-select mode-selection"
          aria-label="Default select example"
        >
          <option selected value="office">
            OFFICE
          </option>
          <option value="">ABC</option>
        </select>
        {this.renderOfficeTableRooms()}
      </div>
    );
  }

  renderOfficeTableRooms() {
    const data = {
      columns: [
        {
          label: "Room details",
          field: "roomDetails",
          sort: "asc",
          width: 300,
        },
        {
          label: "Admin's name",
          field: "adminName",
          sort: "asc",
          width: 200,
        },
        {
          label: "Date",
          field: "date",
          sort: "asc",
          width: 200,
        },
        {
          label: "Server status",
          field: "serverStatus",
          sort: "asc",
          width: 200,
        },
      ],
      rows: this.state.roomData,
    };
    return (
      <div style={{ backgroundColor: "white" }}>
        <MDBDataTable paging={false} searching={false} data={data} />
      </div>
    );
  }
}
