
export default function surveyReducer(state = [], action) {
  switch (action.type) {
      case "fetch_surveys":
        console.log("Payload sent!");
        console.log("Action Payload is as follows: " + action.payload);
          return action.payload;
      default: 
      console.log("Default state reached, no state data sent.");
          return state;
  }
}