import React from "react";
import axios from "axios";
import { DropdownButton, Dropdown } from "react-bootstrap";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: ""
    }
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
  async getDate() {
    this.props.store.changeLoading(true);

    const baseUrl = `/api/Dictionary/GetLastBankingDate`;
    await axios
      .get(baseUrl, {
        headers: {
          Token: `${this.props.store.userState.token}`
        },
      })
      .then((res) => {
        this.setState({date: res.data.last_banking_date})
        this.props.store.changeLoading(false);
      })
      .catch((error) => {
        console.error(error.response);
      });
  }

  componentDidMount(){
     this.getDate();
  }

  render() {
    return (
      <header>
        <div className="blockNav">
          <div className="logoBank">ОЩАДБАНК</div>
        </div>
        <div className="blockHeader">
          <div className="nameProject">
            <div className="title">
            АРМ Звітність
              </div> 
            <div className="dates">
              <p><b>остання завантажена дата обробки: {this.state.date}</b></p>
              <p><b>остання завантажена дата авторизації: {this.state.date}</b></p>
            </div>
          </div>

          <div className="userBlock">
            <div
              onClick={this.getProfileData}
              title="Мій кабінет"
              className="userLogo"
            >
              {this.userShortName(this.props.store.userState.user_name)}
            </div>
            <div
              onClick={this.getProfileData}
              title="Мій кабінет"
              className="userName"
            >
              {this.props.store.userState.user_name}
            </div>
            <DropdownButton id="dropdown-basic-button" title="">
              <Dropdown.Item
                onClick={() =>
                  this.requestLogOut(this.props.store.userState.token)
                }
                as="button"
              >
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
