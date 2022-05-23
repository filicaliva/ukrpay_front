
let addUserData = 'addUserData';

let initialState = {
    token: null,
    user_code: null,
    user_name: null,
    user_position: null,
    OPERATIONS: null
}



const userReducer = (state = initialState, action ) => {
    //console.log(state);
    switch (action.type) {
        // case 'addToken' :
        //     let stateAddToken= {...state};
        //     stateAddToken.authorization = {...state.authorization};
        //     stateAddToken.authorization.userData.token = action.value;
        //     return stateAddToken;
        case 'addUserData' :
            let stateAddUserData= {...state};
            stateAddUserData.token = action.token;
            stateAddUserData.user_code = action.user_code;
            stateAddUserData.user_name = action.user_name;
            stateAddUserData.user_position = action.user_position;
            stateAddUserData.OPERATIONS = action.OPERATIONS;
            return stateAddUserData;

        default:
            return state;
    }
}

export const addUserDataCreator = (token, user_code, user_name, user_position, OPERATIONS) => {
    return {
        type: addUserData, token: token, user_code: user_code, user_name: user_name, user_position: user_position, OPERATIONS: OPERATIONS
    }
}


export default userReducer;


