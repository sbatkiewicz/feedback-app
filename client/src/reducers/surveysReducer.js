
export default function surveyReducer(state = [], action) {
  switch (action.type) {
      case "fetch_surveys":
          return action.payload;
      default: 
      console.log("Default state reached, no state data sent.");
          return state;
  }
}