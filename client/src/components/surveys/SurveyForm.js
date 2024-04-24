import React, {Component} from "react";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";

// Field helps to render any time of traditional html form elements
import { reduxForm, Field } from 'redux-form';

const FIELDS = [
    { label: "Survey Title", name: "title" },
    { label: "Subject of the Survey Mail", name: "subject" },
    { label: "Body of the Email", name: "body" },
    { label: "Recipients List", name: "emails" }
];

class SurveyForm extends Component{
    renderFields() {
        return FIELDS.map(({ name, label }, i) => (
            <Field key={i} type="text" name={name} label={label} component={SurveyField} />
        ));
    }


    render(){
        return(
            <div>
                {/* // Basic of field 
                <form onSubmit={this.props.handleSubmit(values => console.log(values))} >
                    <Field 
                        type="text"             // type specifies the type of input field that will be rendered { text | password | number | email | checkbox | radio | date | file }
                        name="surveyTitle"      // the name is the key name under which the data is stored in redux store automatically
                        component= {"input"}    // component -> input | select | textarea | or some custom React component
                    />
                    <button type="submit">Submit</button>
                </form> */}

                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>

                    {this.renderFields()}
                    
                    <Link to= "/surveys" className="red btn-small left white-text waves-effect waves-light" type="submit" style={{ margin: '10px 0 0 20px' }} >
                        Cancel
                        <i className="material-icons left">fast_rewind</i>
                    </Link>

                    <button className="teal btn-small right white-text waves-effect waves-light" type="submit" style={{ margin: '10px 20px 0 0' }} >
                        Next
                        <i className="material-icons right">fast_forward</i>
                    </button>
                </form>

            </div>
        )
    }
}

// validate function
function validate(values) {     // values is the object containing all the values coming from the form
    const errors = {};  // error object
    
    //check for invalid mails { kept on top else it will overwirte the empty field error }
    errors.emails = validateEmails(values.emails || "");
    
    // check if the field is not empty
    FIELDS.forEach(({ name, label }) => {
        if (!values[name]) {
            errors[name] = `${label} must be provided.`;
        }
    });

    return errors;      // if redux form gets empty error object it assumes everything is correct
    // if errors has a key with the name same as the field name Redux form will send the error sends it to the form 
}

// reduxForm is vary similar to connect function of redux with the difference that 
// instead of taking multiple parameters it takes less parameter that is the form
export default reduxForm({
    validate: validate,     // the fuction that runs automatically when a user tries to submit the form
    form: 'surveyForm'
})(SurveyForm);