import React from 'react';
import {NavLink, Route} from 'react-router-dom';

import * as axios from "axios";
import Header from "./header/Header";
import Menu from "./menu/Menu";
import CoverTable from "./coverTable/CoverTable";
import PopupTable from "./popup/PopupTable";
import DashboardContainer from "./DashboardContainer";




class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
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
        if (window.localStorage.getItem('token') == null) {
            this.props.history.push('/login');
        }else{
            this.authToken();
            //this.props.changeOperation(this.props.location.pathname.substr(11));
            //this.props.changeOperation(this.props.location.pathname); - для визначення ОПЕРАЦІЇ  в урл
        }
    }




    async authToken ()  {
        const baseUrl = `/api/Auth/ALL`;
        await axios.get(
            baseUrl,
            {
                headers: {"Token" : `${ window.localStorage.getItem('token') }`}
            }
        )
            .then((response) => {
                console.log(response.data);
                //console.log(response.data.token);
                this.props.addUserData(response.data.token,response.data.user_code,response.data.user_name,response.data.user_position,response.data.OPERATIONS);
                this.setState({ loading: false });
            })
            .catch((error) => {
                console.log(error.response);
                console.log(error.response.data);
                console.log(error.response.data.ErrorStatus.ErrorMessage);
                let ErrorMessage = error.response.data.ErrorStatus.ErrorMessage;
                console.log(ErrorMessage == "Помилка токена.");
                if(ErrorMessage == "Помилка токена."){
                    window.localStorage.removeItem('token');
                    //this.setState({ loading: false });
                    this.props.history.push('/login');
                }
                //console.log('error_catch');

            });
    }


    render() {
        return (
            <div className="wrapper">
                {
                    this.state.loading
                        ? <div className="loading">
                            <div className="rotating">
                                <svg viewBox="0 0 512 512">
                                    <path
                                        d="m244.36 372.36c-12.853 0-23.273 10.42-23.273 23.273v93.091c0 12.853 10.42 23.273 23.273 23.273s23.273-10.42 23.273-23.273v-93.091c-1e-3 -12.853-10.421-23.273-23.273-23.273z"
                                        fill="#2D50A7"/>
                                    <path
                                        d="m244.36 0c-12.853 0-23.273 10.42-23.273 23.273v93.091c0 12.853 10.42 23.273 23.273 23.273s23.273-10.42 23.273-23.273v-93.091c-1e-3 -12.853-10.421-23.273-23.273-23.273z"
                                        fill="#73A1FB"/>
                                    <path
                                        d="m359.56 338.28c-9.087-9.089-23.824-9.089-32.912 0-9.089 9.087-9.089 23.824 0 32.912l65.826 65.826c4.544 4.544 10.499 6.816 16.455 6.816s11.913-2.271 16.457-6.816c9.089-9.089 9.089-23.824 0-32.912l-65.826-65.826z"
                                        fill="#355EC9"/>
                                    <g fill="#C4D9FD">
                                        <path
                                            d="m81.455 232.73h-46.546c-12.853 0-23.273 10.42-23.273 23.273s10.42 23.273 23.273 23.273h46.545c12.853 0 23.273-10.42 23.273-23.273s-10.42-23.273-23.272-23.273z"/>
                                        <path
                                            d="m96.256 74.982c-9.087-9.089-23.824-9.089-32.912 0s-9.089 23.825 0 32.912l65.826 65.825c4.544 4.544 10.501 6.817 16.455 6.817 5.956 0 11.913-2.273 16.455-6.817 9.089-9.089 9.089-23.824 0-32.912l-65.824-65.825z"/>
                                    </g>
                                    <path
                                        d="m477.09 232.73h-93.091c-12.853 0-23.273 10.42-23.273 23.273s10.42 23.273 23.273 23.273h93.091c12.853 0 23.273-10.42 23.273-23.273s-10.42-23.273-23.273-23.273z"
                                        fill="#3D6DEB"/>
                                    <path
                                        d="m392.47 74.982-65.826 65.825c-9.089 9.087-9.089 23.824 0 32.912 4.544 4.544 10.501 6.817 16.455 6.817 5.955 0 11.913-2.273 16.457-6.817l65.826-65.825c9.089-9.087 9.089-23.824 0-32.912-9.087-9.089-23.823-9.089-32.912 0z"
                                        fill="#5286FA"/>
                                </svg>
                            </div>
                        </div>
                        : <>
                            <Header store={this.props}></Header>
                            <div className="content">
                                <Menu  store={this.props} params={this.props.location.pathname.substr(11)} />
                                {/*<Route  path="/dashboard/:dictionary" render={ () => <CoverTable store={this.props} /> } />*/}
                                <CoverTable store={this.props} params={this.props.location.pathname.substr(11)} />
                            </div>
                        </>
                }
                {
                    this.props.menuState.showPopupTable
                        ? <PopupTable store={this.props} />
                        :<></>
                }
                {
                    this.props.menuState.isLoading
                        ? <div className="coverloader">
                            <div className="loader"></div>
                        </div>
                        : <></>
                }
            </div>
        )
    }
}

export default Dashboard;