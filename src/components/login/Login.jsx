import React from 'react';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import * as axios from "axios";



const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
    <div className="coverInput ">
        <label htmlFor="userEmail">{label}</label>
        <div>
            <input id="userEmail" {...input} placeholder={label} type={type}/>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
)
const aol = (value) => {
    return value && /.+@aol\.com/.test(value) ?
        'Really? You still use AOL for your email?' : undefined
}
const email = (value) => {
    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Невірний email' : undefined
}
const required = value => value ? undefined : 'Required'
const LoginForm = (props) => {
    console.log(props);
    //console.log(this.props.menuState.isLoading);
    // const { handleSubmit, pristine, reset, submitting } = props
    return (
        <form className="form" onSubmit={props.handleSubmit}>
            <Field name="username" type="username" autocomplete="off" autocomplete="username"
                   component={renderField} label="Username"
                   validate={required}
            />
            <Field name="password" type="password" component={renderField} label="Password"/>

            <div className="coverBtn">
                <button type="submit">Увійти</button>
                {/*<button type="submit" disabled={props.submitting}>Увійти</button>*/}
            </div>
        </form>
    )

}
const LoginFormRedux = reduxForm({ form: 'loginForm' })(LoginForm)


class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            user_code: null,
            user_pass: null
        }
        console.log(this.props);
        //console.log( this.props.history );
    }
    componentDidMount() {
        console.log(window.localStorage.getItem('token') !== null);
        if (window.localStorage.getItem('token') !== null) {
            this.props.history.push('/dashboard');
        }else{
            // this.setState({ loading: false });
            this.props.changeLoading(false);
        }
    }

    async RequestAuth (user_code, user_pass)  {
        //this.setState({ loading: true });
        this.props.changeLoading(true);
        console.log(user_code);
        const baseUrl = `/api/Auth`;
        const userCreds = {user_code: user_code, user_pass: user_pass};
        await axios.post(
            baseUrl,
            userCreds,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((response) => {
                window.localStorage.removeItem('token');
                console.log(response.data);
                console.log(response.data.token);
                // this.setState({ loading: false });
                this.props.changeLoading(false);
                this.props.addUserData(response.data.token,response.data.user_code,response.data.user_name,response.data.user_position,response.data.OPERATIONS);
                window.localStorage.setItem('token', response.data.token);
                this.props.history.push('/dashboard');
            })
            .catch((error) => {
                console.log(error.response);
                console.log(error.response.data);
                //console.log('error_catch');

            });
    }
    RequestAuthrr = () => {
        console.log(this.state.user_code);
        axios.post(
            `http://192.168.65.71:8470/api/Auth`,
            {"user_code": `${this.state.user_code}`, "user_pass": ""},
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                console.log(response.data.success);
                // this.props.au_addToken(response.data.token); //записуєм token в store
                // this.setState({ loading: false });
            })
            .catch((error) => {
                console.log(error.response);
                //console.log('error_catch');

            });
    }
    addLogin = (e) => {
        this.setState({ user_code: e.target.value });
        // this.props.state.au_addPhoneNumber(e.target.value);
        console.log(e.target.value);
    }
    loginFormData = (val) => {
        console.log(val);
        this.RequestAuth(val.username, val.password);
    }
    render() {
        // console.log(this.props);
        console.log(this.props.menuState.isLoading);
        return (
            <div className="login">
                <div className="innerLogin">
                    <h3>Вхід до системи</h3>
                    <LoginFormRedux store={this.props} onSubmit={this.loginFormData} />
                    {/*<div className="form">*/}
                    {/*    <div className="coverInput ">*/}
                    {/*        <label htmlFor="userEmail">Email/Логін:</label>*/}
                    {/*        <input onChange={this.addLogin} name="userEmail" id="userEmail" placeholder="Email / Логін" />*/}
                    {/*    </div>*/}
                    {/*    <div className="coverInput">*/}
                    {/*        <label htmlFor="userPassword">Пароль:</label>*/}
                    {/*        <input name="userPassword" id="userPassword" type="password" placeholder="Пароль" />*/}
                    {/*    </div>*/}
                    {/*    <div className="coverBtn">*/}
                    {/*        <button onClick={() => {this.RequestAuth(this.state.user_code, this.state.user_pass)}}>Увійти</button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {
                        this.props.menuState.isLoading
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

                            </>
                    }
                </div>
            </div>
        )
    }
}

export default Login;