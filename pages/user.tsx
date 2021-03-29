import React from "react";
// import '../components/User.scss';
import { MDBBtn, MDBDataTable } from "mdbreact";

export default class User extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      roomData: "",
      openFilter: false,
      roomDetails: "",
      filterData: {
        userDetails: "",
        dateLogin: "",
        dateLogout: "",
        numberOfRequest: "",
      },
    };
  }
  componentDidMount() {
    //get user data from Backend
    let dataFromBackend = [
      {
        userDetails: "Bao Tran",
        dateLogin: "5/26/2019",
        dateLogout: "5/26/2019",
        numberOfRequest: "High",
      },
      {
        userDetails: "Minh Vu",
        dateLogin: "3/10/2020",
        dateLogout: "3/11/2020",
        numberOfRequest: "Normal",
      },
      {
        userDetails: "Minh Truc",
        dateLogin: "5/19/2020",
        dateLogout: "5/20/2020",
        numberOfRequest: "Low",
      },
      {
        userDetails: "Khang Dang",
        dateLogin: "5/19/2021",
        dateLogout: "5/20/2021",
        numberOfRequest: "Low",
      },
    ];
    dataFromBackend.forEach((room: any) => {
      if (room.numberOfRequest == "High") {
        room.numberOfRequest = <MDBBtn color="danger">High</MDBBtn>;
      }
      if (room.numberOfRequest == "Normal") {
        room.numberOfRequest = <MDBBtn color="success">Normal</MDBBtn>;
      }
      if (room.numberOfRequest == "Low") {
        room.numberOfRequest = <MDBBtn color="warning">Low</MDBBtn>;
      }
    });
    console.log(dataFromBackend);

    this.setState({ roomData: dataFromBackend });
  }

  render() {
    return (
      <div className="room-layout">
        <h3>User</h3>

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
          <div className="col-sm-2"></div>
          <div className="col-sm-2">Date login</div>
          <div className="col-sm-2">Date logout</div>
        </div>
        <div className="row">
          <div className="col-sm-2">
            <input
              type="text"
              className="form-control"
              placeholder="User details"
              value={this.state.filterData.roomDetails}
              onChange={(event: any) => {
                this.setState((prevState: any) => ({
                  filterData: {
                    ...prevState.filterData,
                    userDetails: event.target.value,
                  },
                }));
              }}
            />
          </div>
          <div className="col-sm-2">
            <input
              type="date"
              className="form-control"
              placeholder="Date login"
              value={this.state.filterData.dateFrom}
              onChange={(event: any) => {
                this.setState((prevState: any) => ({
                  filterData: {
                    ...prevState.filterData,
                    dateLogin: event.target.value,
                  },
                }));
              }}
            />
          </div>
          <div className="col-sm-2">
            <input
              type="date"
              className="form-control"
              placeholder="Date logout"
              value={this.state.filterData.dateFrom}
              onChange={(event: any) => {
                this.setState((prevState: any) => ({
                  filterData: {
                    ...prevState.filterData,
                    dateLogout: event.target.value,
                  },
                }));
              }}
            />
          </div>
          <div className="col-sm-2">
            <select
              className="custom-select"
              value={this.state.filterData.numberOfRequest}
              onChange={(event: any) => {
                this.setState((prevState: any) => ({
                  filterData: {
                    ...prevState.filterData,
                    numberOfRequest: event.target.value,
                  },
                }));
              }}
            >
              <option selected>Number of request</option>
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
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
          label: "User details",
          field: "userDetails",
          sort: "asc",
          width: 300,
        },
        {
          label: "Date Login",
          field: "dateLogin",
          sort: "asc",
          width: 200,
        },
        {
          label: "Date Logout",
          field: "dateLogout",
          sort: "asc",
          width: 200,
        },
        {
          label: "Number of requests",
          field: "numberOfRequest",
          sort: "asc",
          width: 200,
        },
      ],
      rows: this.state.roomData,
    };
    return (
      <div style={{ backgroundColor: "white" }}>
        {/* <h3 className="room-title">All Users</h3> */}
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
