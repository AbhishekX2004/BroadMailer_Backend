import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as reduxForm } from 'redux-form';
import surveysReducer from './surveysReducer';

export default combineReducers({
    auth: authReducer,          // this connects the authReducer to the special key 'auth'
    form: reduxForm,            // this connects the reducer {from reducer} to the special key 'form'
    surveys: surveysReducer,    // this connect the surveyReducer to the special key 'surveys'
});
