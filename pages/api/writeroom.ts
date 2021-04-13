import { Point } from "@influxdata/influxdb-client";
import { writeApi } from "./DB";

export default function handler(req, res) {

  const roomPoint = new Point("rooms")
    .tag("room_name", "Office Room 11")
    .tag("room_admin", "Bao Tran")
    .floatField("number_of_participants", 45);

  writeApi.writePoint(roomPoint);
  writeApi
    .close()
    .then(() => {
      console.log("FINISHED");
      res.status(200).json({ status: "success" });
    })
    .catch((e) => {
      console.error(e);
      console.log("\\nFinished ERROR");
    });
}
