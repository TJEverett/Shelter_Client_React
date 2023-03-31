import * as c from "../actions/ActionTypes";

export default (state = {}, action) => {
  switch (action.type){
    case c.ANIMAL_OBJECT_CLEAR:
      return {};
    case c.ANIMAL_OBJECT_SAVE:
      return action.animalObject;
    default:
      return state;
  }
}