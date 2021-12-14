import React, { useEffect, useState } from "react";
import { Field, reduxForm } from "redux-form";
import * as axios from "axios";
import LoaderUI from "../UI/LoaderUI";
import Alert from "react-bootstrap/Alert";

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div className="coverInput ">
    <label htmlFor="userEmail">{label}</label>
    <div>
      <input id="userEmail" {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);
const required = (value) => (value ? undefined : "Обовязкове");
const LoginForm = (props) => {
  return (
    <form className="form" onSubmit={props.handleSubmit}>
      <Field
        name="username"
        type="username"
        autocomplete="off"
        autocomplete="Логін"
        component={renderField}
        label="Логін"
        validate={required}
      />
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Пароль"
      />

      <div className="coverBtn">
        <p style={{ color: "red" }}>{props.errorAuth}</p>
        <button type="submit">Увійти</button>
      </div>
    </form>
  );
};
const LoginFormRedux = reduxForm({ form: "loginForm" })(LoginForm);

function Login(props) {
  const [errorAuth, setErrorAuth] = useState(null);

  useEffect(() => {
    if (window.localStorage.getItem("token") !== null) {
      props.history.push("/dashboard");
    } else {
      props.changeLoading(false);
    }
  }, []);

  async function RequestAuth(user_code, user_pass) {
    props.changeLoading(true);
    const body = { user_code, user_pass };
    await axios
      .post(`/api/Auth`, body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        window.localStorage.removeItem("token");
        window.localStorage.setItem("token", response.data.token);
        props.addUserData(
          response.data.token,
          response.data.user_code,
          response.data.user_name,
          response.data.user_position,
          response.data.OPERATIONS
        );
        props.changeLoading(false);
        props.history.push("/dashboard");
      })
      .catch((error) => {
        props.changeLoading(false);

        setErrorAuth(error.response.data.ErrorStatus.ErrorMessage);
      });
  }
  return (
    <>
    <div className="login">
        {errorAuth ? <Alert variant={"danger"} style={{position: "absolute", top: "20px"}}>{errorAuth}</Alert> : null}
      <div className="innerLogin">
        <h3>Вхід до системи</h3>
        <LoginFormRedux
          store={props}
          onSubmit={(val) => RequestAuth(val.username, val.password)}
          />
        {props.menuState.isLoading ? <LoaderUI /> : null}
      </div>
    </div>
          </>
  );
}
export default Login;
