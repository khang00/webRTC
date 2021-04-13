import { FluxTableMetaData } from "@influxdata/influxdb-client";
import { queryApi } from "./DB";

export default function handler(req, res) {
  let rooms = [];
  let query;
  if (req.method === "POST") {
    // Process a POST request
    const data = req.body;
    if (data.adminName && data.roomDetails && data.dateFrom && data.dateTo) {
      const dateFrom = new Date(data.dateFrom).toISOString();
      const dateTo = new Date(data.dateTo).toISOString();
      query = `from(bucket: "webrtc") 
        |> range(start: ${dateFrom}, stop: ${dateTo}) 
        |> filter(fn: (r) => r._measurement == "rooms" and r.room_admin =~ /${data.adminName}/ and r.room_name =~ /${data.roomDetails}/)`;
    } else {
      if (data.adminName && data.roomDetails && data.dateFrom) {
        const dateFrom = new Date(data.dateFrom).toISOString();
        const dateTo = new Date(data.dateFrom);
        dateTo.setDate(dateTo.getDate() + 1);
        query = `from(bucket: "webrtc") 
        |> range(start: ${dateFrom}, stop: ${dateTo.toISOString()}) 
        |> filter(fn: (r) => r._measurement == "rooms" and r.room_admin =~ /${
          data.adminName
        }/ and r.room_name =~ /${data.roomDetails}/)`;
      } else if (data.dateFrom && data.dateTo) {
        const dateFrom = new Date(data.dateFrom).toISOString();
        const dateTo = new Date(data.dateTo).toISOString();
        query = `from(bucket: "webrtc") 
        |> range(start: ${dateFrom}, stop: ${dateTo})`;
      }
    }
  } else {
    query =
      'from(bucket: "webrtc") |> range(start: -30d) |> filter(fn: (r) => r._measurement == "rooms")';
  }

  queryApi.queryRows(query, {
    next(row: string[], tableMeta: FluxTableMetaData) {
      let data = tableMeta.toObject(row);
      rooms.push(data);
    },
    error(error: Error) {
      console.error(error);
      console.log("\nFinished ERROR");
      res.status(500).json(error);
    },
    complete() {
      res.status(200).json(rooms);
      console.log("\nFinished SUCCESS");
    },
  });
}
