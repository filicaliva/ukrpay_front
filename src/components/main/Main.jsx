import React from 'react';
import {withRouter} from "react-router-dom";





class Main extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
        console.log(this.props);
        // console.log(baseURL);
    }
    componentDidMount() {
        console.log(window.localStorage.getItem('token') !== null);
        if (window.localStorage.getItem('token') !== null) {
            this.props.history.push('/dashboard');
        }else{
            this.props.history.push('/login');
        }
    }



    render() {
        return (
            <div className="main">

            </div>
        )
    }
}

export default Main;