import { FETCH_USER } from "../actions/types";

function authReducer(state = null, action) {
    // default state of null tells that we dont know about the current user status

    // uncomment to see the action recieved
    // console.log(action);
    
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;

        default:
            return state;
    }
}

export default authReducer;