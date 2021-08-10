import { connect } from "react-redux";
import { addUserDataCreator } from "../../redux/userReducer";
import {withRouter} from "react-router-dom";


import Main from "./Main";

const mapStateToProps = (state) => {
    console.log(state);
    return {
        userState: state.userState
    }
}

let mapDispatchToProps = (dispatch) => {
    return {

        addUserData: (value) => {
            //console.log(`addPhoneNumberCreator - value ${value}`);
            dispatch(addUserDataCreator( value ) );
        }

    }
}

let MainWithRouter = withRouter( Main );


const MainContainer = connect(mapStateToProps, mapDispatchToProps)(MainWithRouter);

export default MainContainer;