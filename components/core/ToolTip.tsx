import { MDBTooltip, MDBBtn } from "mdbreact";

const ToolTip = (props) => {
  return (
    <div style={props.style}>
      <MDBTooltip placement="right">
        <MDBBtn color="primary">Info</MDBBtn>
        <div>{props.text}</div>
      </MDBTooltip>
    </div>
  );
};

export default ToolTip;
