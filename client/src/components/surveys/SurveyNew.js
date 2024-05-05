import React, {Component} from "react";
import { connect } from 'react-redux';
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import { reduxForm } from "redux-form";


function mapStateToProps(state) {
    return { auth: state.auth };
}

class SurveyNew extends Component{
    state = { showFormReview: false};

    renderContent(){
        if (!this.props.auth) {
            return <h4>Please log in to view this page.</h4>;
        }
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

// Connect the component to Redux
SurveyNew = connect(mapStateToProps)(SurveyNew);

// adding the reduxForm with the same form name flushes the values user entered in the form previously whenever he/she revisits
export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);

// Do the same in combined manner

// Connect the component to Redux and add reduxForm
// export default connect(mapStateToProps)(
//     reduxForm({ form: 'surveyForm' })(SurveyNew)
// );