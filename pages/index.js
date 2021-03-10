import Head from "next/head";
import VideoCanvas from "./../components/VideoCanvas";

const state = {
  currentDate: Date().toLocaleString(),
  total: {
    user: 60,
    currentOnlineUser: 16,
    numberRooms: 6,
    serverRequest: 64,
  },
  todayInfo: {
    onlineUser: 16,
    numberRoom: 6,
    serverRequest: 64,
    averageUsingTime: "3h 8m",
    commonDevices: "Windows laptop",
  },
  monthlyInfo: {
    totalRequest: 4238,
    totalTimeUserActive: 1005,
    timeHasMostAccess: "9:00 AM",
    timeHasLessAccess: "00:00 PM",
  },
};

const Home = () => {
  return (
    <div>
      <Head>
        <title>Web RTC Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h3 style={{ padding: "1rem" }}>Overview</h3>
        <div className="container-fluid">
          <div className="row" style={{ paddingBottom: "1rem" }}>
            <div className="col-sm-3">
              <VideoCanvas title="Total number of users" quantity={state.total.user} />
            </div>
            <div className="col-sm-3">
              <VideoCanvas
                title="Number of online users"
                quantity={state.total.currentOnlineUser}
              />
            </div>
            <div className="col-sm-3">
              <VideoCanvas
                title="Number of rooms"
                quantity={state.total.numberRooms}
              />
            </div>
            <div className="col-sm-3">
              <VideoCanvas
                title="Total server request"
                quantity={state.total.serverRequest}
              />
            </div>
          </div>

          <div className="row no-gutters" style={{ backgroundColor: "white" }}>
            <div className="col-sm-8">
              <h5 style={{ padding: "1rem" }}>Today's info</h5>
              <p style={{ paddingLeft: "1rem" }}>as of {state.currentDate}</p>
              <img
                src="https://images.edrawmax.com/images/knowledge/line-graph-1-what-is.jpg"
                alt=""
                style={{ height: "34rem" }}
              />
            </div>
            <div className="col-sm-4">
              <VideoCanvas
                title="Number of online users"
                quantity={state.todayInfo.onlineUser}
              />
              <VideoCanvas
                title="Number of rooms"
                quantity={state.todayInfo.numberRoom}
              />
              <VideoCanvas
                title="Total request"
                quantity={state.todayInfo.serverRequest}
              />
              <VideoCanvas
                title="Average using time"
                quantity={state.todayInfo.averageUsingTime}
              />
              <VideoCanvas
                title="Common devices"
                quantity={state.todayInfo.commonDevices}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6" style={{ backgroundColor: "white" }}>
              <h5 style={{ paddingTop: "2rem" }}>Monthly info</h5>
              <p style={{ paddingLeft: "2rem" }}>of OFFICE</p>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-8">
                    <h5>Total request of this month</h5>
                  </div>
                  <div className="col-sm-4">
                    <p>{state.monthlyInfo.totalRequest}</p>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-8">
                    <h5>Total time user active</h5>
                  </div>
                  <div className="col-sm-4">
                    <p>{state.monthlyInfo.totalTimeUserActive}</p>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-8">
                    <h5>Time has most user access</h5>
                  </div>
                  <div className="col-sm-4">
                    <p>{state.monthlyInfo.timeHasMostAccess}</p>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-8">
                    <h5>Time has least user access</h5>
                  </div>
                  <div className="col-sm-4">
                    <p>{state.monthlyInfo.timeHasLessAccess}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6" style={{ backgroundColor: "white" }}>
              <img
                style={{ width: "100%" }}
                src="https://upload.wikimedia.org/wikipedia/commons/3/38/Worldmap-blank.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
