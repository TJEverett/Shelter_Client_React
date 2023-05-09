import * as c from "../actions/ActionTypes";

const defaultState = {
  token: null,
  timeRemaining: null
};

export default (state = defaultState, action) => {
  switch(action.type){
    case c.AUTH_DECREMENT:
      switch(state.timeRemaining){
        case null:
          return state;
        case 1:
          return defaultState
        default:
          return Object.assign({}, state, {
            timeRemaining: (state.timeRemaining - 1)
          });
      }
    case c.AUTH_CLEAR:
      return defaultState;
    case c.AUTH_SAVE:
      switch(action.token){
        case null:
          return defaultState;
        case undefined:
          return defaultState;
        default:
          return {
            token: action.token,
            timeRemaining: 179
          };
      }
    default:
      return state;
  }
}