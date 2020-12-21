/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchSurveys} from "../../actions";

class SurveyList extends Component {

  componentDidMount(){
    this.props.fetchSurveys();
  }

  renderSurveys(){
    console.log("We made it into renderSurveys function.")
    return this.props.surveys.map(survey => {  
      return(
        <div className="card grey lighten-3" key={survey._id}>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>
              {survey.body}
            </p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a className="orange-text">Yes: {survey.yes}</a>
            <a className="orange-text">No: {survey.no}</a>
          </div>
        </div>
      );
    });
  }

  render(){
    return (
      <div>
        {this.renderSurveys()}
      </div>
    );
  }
}

function mapStateToProps({surveys}){
  return{surveys};
}

export default connect(mapStateToProps, {fetchSurveys})(SurveyList);