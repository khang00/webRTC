import { MDBBtn } from "mdbreact";

export const formatRoomTable = (data) => {
  const result = [];
  data.forEach((item) => {
    let room = {
      roomDetails: item.room_name.replace(/\\/g, " "),
      adminName: item.room_admin,
      date: new Date(item._time).toDateString(),
      serverStatus: item._value > 30 ? "High" : "Normal",
    };
    result.push(room);
  });

  result.forEach((room: any) => {
    if (room.serverStatus === "High") {
      room.serverStatus = <MDBBtn color="danger">High</MDBBtn>;
    }
    if (room.serverStatus === "Normal") {
      room.serverStatus = <MDBBtn color="success">Normal</MDBBtn>;
    }
    if (room.serverStatus === "Low") {
      room.serverStatus = <MDBBtn color="warning">Low</MDBBtn>;
    }
  });
  return result;
};
