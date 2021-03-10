import React from "react";
import "../components/Room.scss";
import { MDBBtn, MDBDataTable } from "mdbreact";

export default class Room extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      roomData: "",
      openFilter: false,
      roomDetails: "",
      filterData: {
        roomDetails: "",
        adminName: "",
        dateFrom: "",
        dateTo: "",
        serverStatus: "",
      },
    };
  }

  componentDidMount() {
    //get room data from Backend
    let dataFromBackend = [
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

  renderTableFilter() {
    return (
      <div className="container-fluid table-filter">
        <div className="row">
          <div className="col-sm-2">
            <input
              type="text"
              className="form-control"
              placeholder="Room details"
              value={this.state.filterData.roomDetails}
              onChange={(event: any) => {
                this.setState((prevState: any) => ({
                  // copy all other key-value pairs of food object
                  filterData: {
                    // specific object of food object
                    ...prevState.filterData, // copy all pizza key-value pairs
                    roomDetails: event.target.value, // update value of specific key
                  },
                }));
              }}
            />
          </div>
          <div className="col-sm-2">
            <input
              type="text"
              className="form-control"
              placeholder="Admin's name"
              value={this.state.filterData.adminName}
              onChange={(event: any) => {
                this.setState((prevState: any) => ({
                  // copy all other key-value pairs of food object
                  filterData: {
                    // specific object of food object
                    ...prevState.filterData, // copy all pizza key-value pairs
                    adminName: event.target.value, // update value of specific key
                  },
                }));
              }}
            />
          </div>
          <div className="col-sm-2">
            <input
              type="date"
              className="form-control"
              placeholder="Date"
              value={this.state.filterData.dateFrom}
              onChange={(event: any) => {
                this.setState((prevState: any) => ({
                  // copy all other key-value pairs of food object
                  filterData: {
                    // specific object of food object
                    ...prevState.filterData, // copy all pizza key-value pairs
                    dateFrom: event.target.value, // update value of specific key
                  },
                }));
              }}
            />
            <br />
            {this.state.filterData.dateFrom ? (
              <div>
                <p>To</p>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Date"
                  min={this.state.filterData.dateFrom}
                  value={this.state.filterData.dateTo}
                  onChange={(event: any) => {
                    this.setState((prevState: any) => ({
                      // copy all other key-value pairs of food object
                      filterData: {
                        // specific object of food object
                        ...prevState.filterData, // copy all pizza key-value pairs
                        dateTo: event.target.value, // update value of specific key
                      },
                    }));
                  }}
                />
              </div>
            ) : null}
          </div>
          <div className="col-sm-2">
            <select
              className="custom-select"
              value={this.state.filterData.serverStatus}
              onChange={(event: any) => {
                this.setState((prevState: any) => ({
                  // copy all other key-value pairs of food object
                  filterData: {
                    // specific object of food object
                    ...prevState.filterData, // copy all pizza key-value pairs
                    serverStatus: event.target.value, // update value of specific key
                  },
                }));
              }}
            >
              <option selected>Server status</option>
              <option value="1">Low</option>
              <option value="2">Normal</option>
              <option value="3">High</option>
            </select>
          </div>
          <div className="col-sm-2">
            <MDBBtn
              color="primary"
              onClick={(event: any) => console.log(this.state.filterData)}
            >
              Go
            </MDBBtn>
          </div>
        </div>
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
        <h3 className="room-title">All Room</h3>
        <p
          className="filter-icon"
          onClick={(event: any) => {
            this.state.openFilter
              ? this.setState({ openFilter: false })
              : this.setState({ openFilter: true });
          }}
        >
          <i className="ms-Icon ms-Icon--Filter" aria-hidden="true"></i>Filter
        </p>
        {this.state.openFilter ? this.renderTableFilter() : null}
        <MDBDataTable
          className="room-table"
          paging={false}
          searching={false}
          data={data}
        />
      </div>
    );
  }
}
