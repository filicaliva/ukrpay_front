import { connect } from "react-redux";
import { addUserDataCreator } from "../../redux/userReducer";
import { changeLoadingCreator } from "../../redux/menuReducer";
import {withRouter} from "react-router-dom";



import Login from "./Login";

const mapStateToProps = (state) => {
    console.log(state);
    return {
        userState: state.userState,
        menuState: state.menuState,
        form: state.form
    }
}

let mapDispatchToProps = (dispatch) => {
    return {

        addUserData: (token, user_code, user_name, user_position, OPERATIONS) => {
            //console.log(`addPhoneNumberCreator - value ${value}`);
            dispatch(addUserDataCreator( token, user_code, user_name, user_position, OPERATIONS ) );
        },
        changeLoading: (operation) => {
            dispatch(changeLoadingCreator( operation ) );
        }

    }
}

let LogindWithRouter = withRouter( Login );


const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LogindWithRouter);

export default LoginContainer;