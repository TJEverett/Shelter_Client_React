import animalObjectReducer from "../../reducers/animal-object-reducer";
import * as c from "../../actions/ActionTypes";

describe("animalObjectReducer", () => {

  const defaultState = {};
  let action;
  let testState;

  test("should successfully return the default state if no action is passed into it", () => {
    expect(animalObjectReducer(defaultState, { type: null })).toEqual({});
  });
  
  test("ANIMAL_OBJECT_SAVE should return the animal object", () => {
    action = {
      type: c.ANIMAL_OBJECT_SAVE,
      animalObject: { id: "1", name: "cat" }
    };
    
    expect(animalObjectReducer(defaultState, action)).toEqual({ id: "1", name: "cat" });
  });
  
  test("ANIMAL_OBJECT_CLEAR should return an empty object", () => {
    action = {
      type: c.ANIMAL_OBJECT_CLEAR
    };
    testState = { id: "1", name: "cat" };
  
    expect(animalObjectReducer(testState, action)).toEqual({});
  });
  
});