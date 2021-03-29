import "../styles/app.css";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/tableSite.scss";
import "../styles/navbar.scss";
import "../styles/advancedTools.scss";

import { Navbar } from "../components/Navbar";
const App = ({ Component, pageProps }) => {
  return (
    <div>
      {/* <Link href="/">Home</Link>
      <Link href="/room">Room</Link>
      <Link href="/user">User</Link> */}
      <div className="container-fluid">
        <div className="row no-gutters">
          <div className="col-sm-2">
            <Navbar />
          </div>
          <div className="col-sm-10">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
