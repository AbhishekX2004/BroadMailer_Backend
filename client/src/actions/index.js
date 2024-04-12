import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => {
    return async (dispatch) => {
        const res = await axios.get('/api/curr_user');
        dispatch({type: FETCH_USER, payload: res.data }); // we only care about res.data
    }
};

export const handleToken = (token) => {
    return async (dispatch) => {
        const res = await axios.post("/api/stripe",token);
        dispatch({type: FETCH_USER, payload: res.data});
    }
}
