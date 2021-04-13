import React from "react";
// import "../components/Room.scss";
import { MDBBtn, MDBDataTable } from "mdbreact";
import axios from "axios";
import { formatRoomTable } from "../utils/format";

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
  async componentDidMount() {
    let roomData = await (await axios.get("http://localhost:8080/api/room"))
      .data;

    this.setState({ roomData: formatRoomTable(roomData) });
  }

  render() {
    return (
      <div className="room-layout">
        <h3>Room</h3>

        <select
          className="form-select mode-selection"
          aria-label="Default select example"
        >
          <option selected value="office">
            OFFICE
          </option>
          <option value="conference">CONFERENCE</option>
        </select>
        {this.renderOfficeTableRooms()}
      </div>
    );
  }
  renderTableFilter() {
    return (
      <div className="container-fluid table-filter">
        <div className="row">
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              placeholder="Room details"
              value={this.state.filterData.roomDetails}
              onChange={(event: any) => {
                this.setState((prevState: any) => ({
                  filterData: {
                    ...prevState.filterData,
                    roomDetails: event.target.value,
                  },
                }));
              }}
            />
          </div>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              placeholder="Admin's name"
              value={this.state.filterData.adminName}
              onChange={(event: any) => {
                this.setState((prevState: any) => ({
                  filterData: {
                    ...prevState.filterData,
                    adminName: event.target.value,
                  },
                }));
              }}
            />
          </div>
          <div className="col-sm-3">
            <input
              type="date"
              className="form-control"
              placeholder="Date"
              value={this.state.filterData.dateFrom}
              onChange={(event: any) => {
                this.setState((prevState: any) => ({
                  filterData: {
                    ...prevState.filterData,
                    dateFrom: event.target.value,
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
                      filterData: {
                        ...prevState.filterData,
                        dateTo: event.target.value,
                      },
                    }));
                  }}
                />
              </div>
            ) : null}
          </div>
          <div className="col-sm-3">
            <select
              className="custom-select"
              value={this.state.filterData.serverStatus}
              onChange={(event: any) => {
                this.setState((prevState: any) => ({
                  filterData: {
                    ...prevState.filterData,
                    serverStatus: event.target.value,
                  },
                }));
              }}
            >
              <option selected>Server status</option>
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="col-sm-3">
            <MDBBtn color="primary" onClick={this.handleFilterSubmit}>
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

  handleFilterSubmit = () => {
    axios
      .post("http://localhost:8080/api/room", this.state.filterData)
      .then((res) => {
        this.setState({ roomData: formatRoomTable(res.data) });
      });
  };
}
