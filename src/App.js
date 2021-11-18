import "./App.scss";
import { BrowserRouter, Route } from "react-router-dom";
import DashboardContainer from "./components/dashboard/DashboardContainer";
import React, { Component, useEffect } from "react";
import LoginContainer from "./components/login/LoginContainer";
import MainContainer from "./components/main/MainContainer";
import ProfileContainer from "./components/dashboard/profile/ProfileContainer";
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" render={() => <MainContainer />} />
        <Route path="/dashboard/" render={() => <DashboardContainer />} />
        <Route path="/profile" render={() => <ProfileContainer />} />
        <Route path="/login" render={() => <LoginContainer />} />
      </BrowserRouter>
    );
  }
}
export default App;
