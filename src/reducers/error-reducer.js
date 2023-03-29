import * as c from "../actions/ActionTypes"

export default (state = null, action) => {
  switch(action.type){
    case c.ERROR_CLEAR:
      return null;
    case c.ERROR_SAVE:
      return action.error;
    default:
      return state;
  }
}