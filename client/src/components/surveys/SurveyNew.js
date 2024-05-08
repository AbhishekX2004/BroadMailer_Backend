import React, { Component } from "react";
import { connect } from 'react-redux';
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import { reduxForm } from "redux-form";


function mapStateToProps(state) {
    return { auth: state.auth };
}

class SurveyNew extends Component {
    state = { showFormReview: false };

    renderContent() {
        if (!this.props.auth) {
            return <h4 className="center customColor1">Please log in to view this page.</h4>;
        }
        if (this.props.auth.credits === 0) {
            return (
                <div className="center customColor1">
                    <h4> You Dont have enough credits to send a Survey</h4>
                    <p> <b>Hint:</b> Add some credits first. </p>
                </div>
            )
        }
        if (this.state.showFormReview) {
            return <SurveyFormReview onCancel={() => {
                this.setState({ showFormReview: false })
            }} />;
        }
        return <SurveyForm onSurveySubmit={() => {
            this.setState({ showFormReview: true })
        }} />;
    }

    render() {
        return (
            <div>
                <div className="center">
                    <span style={{ color: 'red' }}>
                        <i className="material-icons" style={{ paddingTop: '5px', verticalAlign: 'middle' }}>warning</i>
                        <b>Warning: </b>
                    </span>
                    <span className="customColor2">The profanity filter is always watching for threats and abusive/offensive language.</span>
                </div>

                <div>
                    {this.renderContent()}
                </div>
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