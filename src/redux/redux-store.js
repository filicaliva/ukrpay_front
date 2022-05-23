import {combineReducers, createStore} from "redux";

import userReducer from "./userReducer";
import menuReducer from "./menuReducer";




import { reducer as formReducer } from 'redux-form';




let reducers = combineReducers({
    userState: userReducer,
    menuState: menuReducer,
    form: formReducer
});

let store = createStore(reducers);
window.store = store;

export default store;