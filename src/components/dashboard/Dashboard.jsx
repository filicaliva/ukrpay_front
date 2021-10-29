import React from "react";
import { NavLink, Route } from "react-router-dom";

import * as axios from "axios";
import Header from "./header/Header";
import Menu from "./menu/Menu";
import CoverTable from "./coverTable/CoverTable";
import PopupTable from "./popup/PopupTable";
import DashboardContainer from "./DashboardContainer";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    console.log(this.props);
    //console.log(this.props.userState.user_name);
    // console.log(baseURL);
  }
  componentDidMount() {
    //this.props.stepLoginChange('step1');
    //this.checkUser();
    //this.test_fetch();
    //this.rr();
    //console.log(window.localStorage.getItem('token') !== null);
    //console.log( window.localStorage.getItem('token') );
    //console.log(this.props.location.pathname);
    if (window.localStorage.getItem("token") == null) {
      this.props.history.push("/login");
    } else {
      this.authToken();
      //this.props.changeOperation(this.props.location.pathname.substr(11));
      //this.props.changeOperation(this.props.location.pathname); - для визначення ОПЕРАЦІЇ  в урл
    }
  }

  async authToken() {
    const baseUrl = `/api/Auth/ALL`;
    await axios
      .get(baseUrl, {
        headers: { Token: `${window.localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log(response.data);
        //console.log(response.data.token);
        this.props.addUserData(
          response.data.token,
          response.data.user_code,
          response.data.user_name,
          response.data.user_position,
          response.data.OPERATIONS
        );
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(error.response);
        console.log(error.response.data);
        console.log(error.response.data.ErrorStatus.ErrorMessage);
        let ErrorMessage = error.response.data.ErrorStatus.ErrorMessage;
        console.log(ErrorMessage == "Помилка токена.");
        if (ErrorMessage == "Помилка токена.") {
          window.localStorage.removeItem("token");
          //this.setState({ loading: false });
          this.props.history.push("/login");
        }
        //console.log('error_catch');
      });
  }

  render() {
    return (
      <div className="wrapper">
        {this.state.loading ? (
          <div className="loading">
            <div className="rotating">
              <div class="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Header store={this.props}></Header>
            <div className="content">
              <Menu
                store={this.props}
                params={this.props.location.pathname.substr(11)}
              />
              {/*<Route  path="/dashboard/:dictionary" render={ () => <CoverTable store={this.props} /> } />*/}
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
        
      </div>
    );
  }
}

export default Dashboard;
