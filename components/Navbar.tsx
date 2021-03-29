import Link from "next/link";
import { slide as Menu } from "react-burger-menu";
import ReactDOM from "react-dom";
export const Navbar = (): JSX.Element => {
  var styles = {
    bmBurgerButton: {
      position: "fixed",
      width: "36px",
      height: "30px",
      left: "36px",
      top: "36px",
    },
    bmBurgerBars: {
      background: "#373a47",
    },
    bmBurgerBarsHover: {
      background: "#a90000",
    },
    bmCrossButton: {
      height: "24px",
      width: "24px",
    },
    bmCross: {
      background: "#bdc3c7",
    },
    bmMenuWrap: {
      position: "fixed",
      height: "100%",
      left: 0,
    },
    bmMenu: {
      background: "#373a47",
      padding: "2.5em 1.5em 0",
      fontSize: "1.15em",
    },
    bmMorphShape: {
      fill: "#373a47",
    },
    bmItemList: {
      color: "#b8b7ad",
      padding: "0.8em",
    },
    bmItem: {
      // display: 'inline-block'
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.3)",
    },
  };
  return (
    // <div className="side-navbar">
    //   <Link href="/">Home</Link>
    //   <Link href="/room">Room</Link>
    //   <Link href="/user">User</Link>
    // </div>
    <div className="side-navbar">
      <Menu styles={styles} isOpen noOverlay>
        <div className="navbar-item">
          <Link href="/">Home</Link>
        </div>
        <div className="navbar-item">
          <Link href="/room">Room</Link>
        </div>
        <div className="navbar-item">
          <Link href="/user">User</Link>
        </div>
        <div className="navbar-item">
          <Link href="/advancedtools">Advanced tools</Link>
        </div>
      </Menu>
    </div>
  );
};
