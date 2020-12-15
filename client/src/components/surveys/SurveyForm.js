import React, {Component} from "react";
import {Link} from "react-router-dom";
import _ from "lodash";
import {reduxForm, Field} from "redux-form";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails"
import formFields from "./formFields";

class SurveyForm extends Component{
  renderFields(){
    return _.map(formFields, ({label, name}) => {
      return <Field key={name} component={SurveyField} type="text" label={label} name={name}/>
    });
  }

  render(){
    return(
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat left white-text">Cancel</Link>
          <button type="submit" className="teal btn-flat right white-text">Next  <span>&#10003;</span></button>
        </form>
      </div>
    ); 
  }
}

function validate(values){
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");

  _.each(formFields, ({name, noValueError}) => {
    if(!values[name]){
      errors[name] = noValueError; // Redux Form will know to send this as a prop to the associated Field component.
    }
  });
  return errors;
}

export default reduxForm({
  validate: validate,
  form: "surveyForm",
  destroyOnUnmount: false
  
})(SurveyForm);