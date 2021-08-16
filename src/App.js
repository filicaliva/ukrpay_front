import logo from './logo.svg';
import './App.scss';
import {BrowserRouter, Route} from "react-router-dom";
import DashboardContainer from "./components/dashboard/DashboardContainer";
import React, {Component, useEffect} from "react";
import LoginContainer from "./components/login/LoginContainer";
import store from "./redux/redux-store";
import MainContainer from "./components/main/MainContainer";
import * as axios from "axios";
import ProfileContainer from "./components/dashboard/profile/ProfileContainer";

console.log(store.getState());

// function App() {
//     useEffect(() => {
//         console.log('rr');
//         //console.log(store);
//     }, []);
//   return (
//       <BrowserRouter>
//         <Route exact path="/dashboard" render={ () => <DashboardContainer /> } />
//         {/*<Route path="/dashboard" render={ () => <Dashboard /> } />*/}
//         <Route path="/login" render={ () => <LoginContainer /> } />
//       </BrowserRouter>
//   );
// }
class App extends React.Component {
    constructor(props) {
        super(props);
        //console.log(this.props);
    }

    componentDidMount() {
        // console.log(window.localStorage.getItem('token') !== null);
        // if (window.localStorage.getItem('token') !== null) {
        //     this.props.history.push('/dashboard');
        // }else{
        //     this.props.history.push('/login');
        // }

    }

    render() {
        return (
            <BrowserRouter>
                <Route exact path="/" render={ () => <MainContainer /> } />
                <Route  path="/dashboard/" render={ () => <DashboardContainer /> } />
                <Route  path="/profile" render={ () => <ProfileContainer /> } />

                {/*<Route path="/dashboard" render={ () => <Dashboard /> } />*/}
                <Route path="/login" render={ () => <LoginContainer /> } />
                {/*<Route path="*" render={ () => <LoginContainer /> } />*/}
            </BrowserRouter>
        )
    }
}



export default App;
