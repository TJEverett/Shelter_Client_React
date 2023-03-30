import animalArrayReducer from "../../reducers/animal-array-reducer";
import * as c from "../../actions/ActionTypes";

describe("animalArrayReducer", () => {

  const defaultState = [];
  let action;
  let testState;

  test("should successfully return the default state if no action is passed into it", () => {
    expect(animalArrayReducer(defaultState, {type: null})).toEqual([]);
  });

  test("ANIMAL_ARRAY_SAVE should return the animal array", () => {
    action = {
      type: c.ANIMAL_ARRAY_SAVE,
      animalArray: [{id: "1", name: "cat"}, {id: "3", name: "dog"}]
    };
    
    expect(animalArrayReducer(defaultState, action)).toEqual([{ id: "1", name: "cat" }, { id: "3", name: "dog" }]);
  });

  test("ANIMAL_ARRAY_CLEAR should return empty array", () => {
    action = {
      type: c.ANIMAL_ARRAY_CLEAR
    };
    testState = [{ id: "1", name: "cat" }, { id: "3", name: "dog" }];

    expect(animalArrayReducer(testState, action)).toEqual([]);
  });

});