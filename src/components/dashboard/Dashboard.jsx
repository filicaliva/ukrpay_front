import React from "react";
import * as axios from "axios";
import Header from "./header/Header";
import Menu from "./menu/Menu";
import CoverTable from "./coverTable/CoverTable";
import PopupTable from "./popup/PopupTable";
import LoaderUI from "../UI/LoaderUI";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentDidMount() {
    if (!window.localStorage.getItem("token")) {
      this.props.history.push("/login");
    } else {
      this.authToken();
    }
  }

  async authToken() {
    const baseUrl = `/api/Auth/ALL`;
    await axios
      .get(baseUrl, {
        headers: { Token: `${window.localStorage.getItem("token")}` },
      })
      .then((response) => {
        const { token, user_code, user_name, user_position, OPERATIONS } = response.data;

        this.props.addUserData(
          token,
          user_code,
          user_name,
          user_position,
          OPERATIONS
        );
        this.setState({ loading: false });
      })
      .catch((error) => {
        let ErrorMessage = error.response.data.ErrorStatus.ErrorMessage;
        if (ErrorMessage === "Помилка токена.") {
          window.localStorage.removeItem("token");
          this.props.history.push("/login");
        }
      });
  }

  render() {
    return (
      <div className="wrapper">
        {this.state.loading ? (
          <LoaderUI />
        ) : (
          <>
            <Header store={this.props}></Header>
            <div className="content">
              <Menu
                store={this.props}
                params={this.props.location.pathname.substr(11)}
              />
              <CoverTable
                store={this.props}
                params={this.props.location.pathname.substr(11)}
              />
            </div>
          </>
        )}
        {this.props.menuState.showPopupTable ? (
          <PopupTable store={this.props} />
        ) : null}
        {this.props.menuState.isLoading ? <LoaderUI /> : null}
      </div>
    );
  }
}

export default Dashboard;