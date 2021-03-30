import {
  MDBJumbotron,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBCardTitle,
  MDBCardImage,
  MDBCardBody,
  MDBCardText,
  MDBInput,
  MDBTypography,
  MDBBtn,
} from "mdbreact";
import { useState } from "react";

interface AccountInfoProps {
  title: string;
  iconurl?: string;
  username: string;
  password: string;
  url: string;
}

const AccountInfo = (props: AccountInfoProps): JSX.Element => {
  const { title, iconurl, username, password, url } = props;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <MDBContainer className="mt-5 text-center">
        <MDBRow>
          <MDBCol>
            <MDBJumbotron>
              <MDBCardTitle className="card-title h4 pb-2">
                <strong>{title}</strong>
              </MDBCardTitle>

              <img src={iconurl} width="200" height="200" alt="tool-icon" />
              <MDBCardBody>
                <MDBCardTitle className="indigo-text h5 m-4">
                  <a href={url} target="_blank">
                    {url}
                  </a>
                </MDBCardTitle>

                <MDBCardText>
                  <MDBCardTitle className="indigo-text h5 m-4">
                    Username
                  </MDBCardTitle>
                  <MDBInput background value={username} />
                  <MDBCardTitle className="indigo-text h5 m-4">
                    Password
                  </MDBCardTitle>
                  {showPassword ? (
                    <MDBInput background value={password} />
                  ) : (
                    <MDBInput type="password" background value={password} />
                  )}
                  <MDBBtn
                    color="warning"
                    onClick={() =>
                      showPassword
                        ? setShowPassword(false)
                        : setShowPassword(true)
                    }
                  >
                      {showPassword ? "Hide password" : "Show password"}
                  </MDBBtn>
                </MDBCardText>
              </MDBCardBody>
            </MDBJumbotron>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default AccountInfo;
