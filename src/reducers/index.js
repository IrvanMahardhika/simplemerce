import { combineReducers } from "redux";

const init = {
    id : '',
    username : ''
}


const AuthReducer = (state = init, a) => {
    switch (a.type) {
        case 'LOGIN_SUCCESS':
            return {...state, id : a.payload.id, username : a.payload.username}
            break;
        case 'LOGOUT_SUCCESS':
            return {...state, id : '', username : ''}
            break;
    
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