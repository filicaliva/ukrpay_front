import { connect } from "react-redux";
import { addUserDataCreator } from "../../../redux/userReducer";
import { changeLoadingCreator } from "../../../redux/menuReducer";
import { withRouter } from "react-router-dom";
import Profile from "./Profile";

const mapStateToProps = (state) => {
  console.log(state);
  return {
    userState: state.userState,
    menuState: state.menuState,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    addUserData: (token, user_code, user_name, user_position, OPERATIONS) => {
      dispatch(
        addUserDataCreator(
          token,
          user_code,
          user_name,
          user_position,
          OPERATIONS
        )
      );
    },
    changeLoading: (operation) => {
      dispatch(changeLoadingCreator(operation));
    },
  };
};
let ProfileWithRouter = withRouter(Profile);
const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileWithRouter);
export default ProfileContainer;