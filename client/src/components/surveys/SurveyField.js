import React from "react";

function surveyField({ input, label, meta:{ error, touched } }) {   // destructuring from props
    return (
        <div>
            <label>{label}</label>
            <input {...input} className = "customColor2" style={{marginBottom: "5px"}} />
            <div className="red-text" style={{marginBottom: "5px"}}>
                {
                    // meta.error  // this is the error sent by redux form and will be displayed by default
                    // meta.touched // tells if the user ever clicked on the field
                    touched && error    // the " and " operation checks if touched then show error
                }
            </div>
        </div>
    )
}

export default surveyField;