import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

export const fetchUser = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/curr_user');
            dispatch({type: FETCH_USER, payload: res.data }); // we only care about res.data
        } catch (error) {
            console.error('Error in fetchUser:', error);
        }
    };
};

export const handleToken = (token) => {
    return async (dispatch) => {
        try {
            // const res = await axios.post("/api/stripe",token);   // this is no longer needed since the newer stripe library is capable of 
            // request is still sent in the paymentForm.js file
            // console.log(res.data.user);                          // returning the updated user model directly so the request to the route is no longer needed.
            dispatch({type: FETCH_USER, payload: token}); // token is the user model, we are updating the redux store using the user model
        } catch (error) {
            console.error('Error in handleToken:', error);
        }
    };
};

export const submitSurvey = (values, navigate) => {
    return async (dispatch) => {
        try {
            // api request to backend
            const res = await axios.post('/api/surveys', values);
            // navigate to dashboard
            alert("Survey Sent Successfully!!");
            navigate("/surveys");
            // dispatch to update the header automatically
            dispatch({type: FETCH_USER, payload: res.data});
        } catch (error) {
            console.error('Error in submitSurvey:', error);
        }
    };
};

export const fetchSurveys = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get("/api/surveys");
            dispatch({ type: FETCH_SURVEYS, payload: res.data });
        } catch (error) {
            console.error('Error in fetchSurveys:', error);
        }
    };
};

export const delSurveys = (surveyId) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete("/api/surveys/delete", {
                params: { surveyId }    // delete needs the data in params 
            });
            dispatch({ type: FETCH_SURVEYS, payload: res.data });
        } catch (error) {
            console.error('Error in delSurveys:', error);
        }
    }
}
