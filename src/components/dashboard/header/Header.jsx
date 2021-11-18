import React from "react";
import axios from 'axios'
import { DropdownButton, Dropdown } from "react-bootstrap";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  userShortName = (userName) => {
    let userNameArr = userName.split(" ", 2);
    let userShortName = userNameArr[0] && userNameArr[0][0];
    if (userNameArr[1] && userNameArr[1].length > 0) {
      userShortName = userShortName + userNameArr[1][0];
    }
    return userShortName;
  };
  getProfileData = () => {
    this.props.store.history.push("/profile");
  };
//   async requestUserCabinet(token) {
//     this.props.store.changeLoading(true);
//     const baseUrl = `/api/UserCabinet`;
//     await axios
//       .get(baseUrl, {
//         headers: {
//           Token: `${token}`,
//           "Content-Type": "application/json",
//         },
//       })
//       .then((response) => {
//         this.props.store.history.push("/profile");
//         this.props.store.changeLoading(false);
//       })
//       .catch((error) => {
//         console.log(error.response);
//       });
//   }
  async requestLogOut(token) {
    this.props.store.changeLoading(true);
    console.log(token);
    const baseUrl = `/api/Auth`;
    await axios
      .delete(baseUrl, {
        headers: {
          Token: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        window.localStorage.removeItem("token");
        this.props.store.history.push("/login");
        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        console.error(error.response);
      });
  }

  render() {
    return (
      <header>
        <div className="blockNav">
          <div className="menuBtn">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <g data-name="Layer 2">
                <g data-name="menu-2">
                  <rect
                    width="24"
                    height="24"
                    transform="rotate(180 12 12)"
                    opacity="0"
                  ></rect>
                  <circle cx="4" cy="12" r="1"></circle>
                  <rect
                    x="7"
                    y="11"
                    width="14"
                    height="2"
                    rx=".94"
                    ry=".94"
                  ></rect>
                  <rect
                    x="3"
                    y="16"
                    width="18"
                    height="2"
                    rx=".94"
                    ry=".94"
                  ></rect>
                  <rect
                    x="3"
                    y="6"
                    width="18"
                    height="2"
                    rx=".94"
                    ry=".94"
                  ></rect>
                </g>
              </g>
            </svg> */}
          </div>
          <div className="logoBank">ОЩАДБАНК</div>
        </div>
        <div className="blockHeader">
          <div className="nameProject">АРМ Звітність</div>
          <div className="userBlock">
            <div
              onClick={this.getProfileData}
              title="Мій кабінет"
              className="userLogo">
              {this.userShortName(this.props.store.userState.user_name)}
            </div>
            <div
              onClick={this.getProfileData}
              title="Мій кабінет"
              className="userName">
              {this.props.store.userState.user_name}
            </div>
            <DropdownButton id="dropdown-basic-button" title="">
              <Dropdown.Item onClick={()=>this.requestLogOut(this.props.store.userState.token)} as="button">
                Вийти
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </header>
    );
  }
}
export default Header;