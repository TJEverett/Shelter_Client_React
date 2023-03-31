import * as c from "../actions/ActionTypes";

export default (state = false, action) => {
  switch (action.type){
    case c.LOADING_TRIGGER:
      return true;
    case c.AUTH_SAVE:
    case c.ANIMAL_ARRAY_SAVE:
    case c.ANIMAL_OBJECT_SAVE:
    case c.ERROR_SAVE:
      return false;
    default:
      return state;
  }
}