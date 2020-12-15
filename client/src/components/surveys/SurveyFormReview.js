import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom";
import formFields from "./formFields";
import * as actions from "../../actions";

const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {
  const reviewFields = _.map(formFields, ({name, label}) =>{
    return(
      <div key={name}>
        <label><h5>{label}</h5></label>
        <div>
          {formValues[name]}
        </div>
      </div>
    );
  });

  return(
    <div>
      <h4>Please confirm your entries</h4>
      {reviewFields}
      <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>Back</button>
      <button className="green white-text right btn-flat" onClick={() => submitSurvey(formValues, history)}>Send Survey  <span>&#9993;</span></button>
    </div>
  )
}

function mapStateToProps(state){
  return {formValues: state.form.surveyForm.values};
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));