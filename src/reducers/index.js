import { combineReducers } from "redux";

const init = {
    id : '',
    username : '',
    atc : []
}

const AuthReducer = (state = init, a) => {
    switch (a.type) {
        case 'LOGIN_SUCCESS':
            return {...state, id : a.payload.id, username : a.payload.username};
        case 'LOGOUT_SUCCESS':
            return {...state, id : '', username : '', atc : []};
        case 'ATC_SUCCESS' :
            return {...state, atc : a.payload.atc};
        default:
            return state;
    }
}


const reducers = combineReducers(
    {
        auth : AuthReducer
    }
)

export default reducers