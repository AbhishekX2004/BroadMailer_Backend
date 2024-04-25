import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';

// Depricated
// import { withRouter } from "react-router-dom";  // used to pass history of routing or we can say it teaches some arbitory component how to route and navigate
import { useNavigate } from 'react-router-dom';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey }) => {    // destructureing pops {we get formValues from the mapStateToProps function}
    const navigate = useNavigate();
    const reviewFields = () => {
        return formFields.map(({ name, label }, i) => (
            <div key={i}>
                <label style={{fontSize:'16px'}}>{label}</label>
                <div style={{fontSize:'14px'}}>
                    {formValues[name]}
                </div>
            </div>
        ));
    };
    
    return (
        <div>
            <h4>
                Please review the Details
            </h4>
            <div style={{margin:'30px 0'}}>
                {reviewFields()}
            </div>
            <div style={{margin: '10px 20px'}}>
                <button className='yellow darken-4 btn' onClick={onCancel}>
                    Edit
                    <i className='material-icons right'>edit</i>
                </button>
                <button className='green btn right' 
                    onClick={() => submitSurvey(formValues, navigate)}
                >
                    Send
                    <i className='material-icons right' style={{marginLeft:'5px'}}>send</i>
                    <i className='material-icons right'>email</i>
                </button>
            </div>
        </div>
    );
}

function mapStateToProps(state){

    // uncomment to see the state
    // console.log(state);
    
    return { formValues: state.form.surveyForm.values };

}

export default connect(mapStateToProps, actions)(SurveyFormReview);