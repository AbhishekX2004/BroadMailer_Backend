import { FETCH_SURVEYS } from "../actions/types";

function surveysReducer(state = [], action) {
    // default state is empty array

    // uncomment to see the action recieved
    // console.log(action);
    
    switch (action.type) {
        case FETCH_SURVEYS:
            return action.payload || false;

        default:
            return state;
    }
}

export default surveysReducer;