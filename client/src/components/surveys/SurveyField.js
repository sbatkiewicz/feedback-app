import React from "react";
//import {reduxForm, Field} from "redux-form";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({input, label, meta: {error, touched}}) => { //es6 double desctructuring. 
  return(
    <div>
    <label>{label}</label>
      <input {...input} style={{marginBottom: "5px"}}/>
      <div className="red-text" style={{marginBottom: "20px"}}>
        {touched && error}
      </div>
       
    </div>
  ); 
};
