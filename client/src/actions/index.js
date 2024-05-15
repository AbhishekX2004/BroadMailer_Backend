import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

export const fetchUser = () => {
    return async (dispatch) => {
        const res = await axios.get('/api/curr_user');
        dispatch({type: FETCH_USER, payload: res.data }); // we only care about res.data
    };
};

export const handleToken = (token) => {
    return async (dispatch) => {
        // const res = await axios.post("/api/stripe",token);   // this is no longer needed since the newer stripe library is capable of 
        // console.log(res.data.user);                          // returning the updated user model directly so the request to the route is no longer needed.
        dispatch({type: FETCH_USER, payload: token}); // token is the user model, we are updating the redux store using the user model
    };
};

export const submitSurvey = (values, navigate) => {
    return async (dispatch) => {
        // api request to backend
        const res = await axios.post('/api/surveys',values);
        // navigate to dashboard
        alert("Survey Sent Successfully!!");
        navigate("/surveys");
        // dispatch to update the header automatically
        dispatch({type: FETCH_USER, payload: res.data});
    };
};

export const fetchSurveys = () => {
    return async (dispatch) => {
        const res = await axios.get("/api/surveys");
        dispatch({ type: FETCH_SURVEYS, payload: res.data})
    };
};

export const delSurveys = (surveyId) => {
    return async (dispatch) => {
        const res = await axios.delete("/api/surveys/delete", {
            params: { surveyId }    // delete needs the data in params 
        });
        dispatch({ type: FETCH_SURVEYS, payload: res.data })
    }
}