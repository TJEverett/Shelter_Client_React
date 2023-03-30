import * as c from "../actions/ActionTypes"

export default (state = [], action) => {
  switch(action.type){
    case c.ANIMAL_ARRAY_CLEAR:
      return [];
    case c.ANIMAL_ARRAY_SAVE:
      return action.animalArray;
    default:
      return state;
  }
}