import React, {Component} from "react";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import { reduxForm } from "redux-form";

class SurveyNew extends Component{
    state = { showFormReview: false};

    renderContent(){
        if(this.state.showFormReview){
            return <SurveyFormReview onCancel = {() => {
                this.setState({ showFormReview: false })
            }}/>;
        }
        return <SurveyForm onSurveySubmit = {() => {
            this.setState({showFormReview: true})
        }} />;
    }

    render(){
        return(
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

// adding the reduxForm with the same form name flushes the values user entered in the form previously whenever he/she revisits
export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);