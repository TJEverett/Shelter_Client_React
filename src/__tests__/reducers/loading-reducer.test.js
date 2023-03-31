import loadingReducer from "../../reducers/loading-reducer";
import * as c from "../../actions/ActionTypes";

describe("loadingReducer", () => {

  const defaultState = false;
  let action;
  let testState;

  test("should successfully return the default state if no action is passed into it", () => {
    expect(loadingReducer(defaultState, {type: null})).toEqual(false);
  });

  test("LOADING_TRIGGER should return state as true", () => {
    action = { type: c.LOADING_TRIGGER };
    expect(loadingReducer(defaultState, action)).toEqual(true);
  });

  test("AUTH_SAVE should return state as false", () => {
    action = { type: c.AUTH_SAVE }
    testState = true;
    expect(loadingReducer(testState, action)).toEqual(false);
  });

  test("ANIMAL_ARRAY_SAVE should return state as false", () => {
    action = { type: c.ANIMAL_ARRAY_SAVE }
    testState = true;
    expect(loadingReducer(testState, action)).toEqual(false);
  });

  test("ANIMAL_OBJECT_SAVE should return state as false", () => {
    action = { type: c.ANIMAL_OBJECT_SAVE }
    testState = true;
    expect(loadingReducer(testState, action)).toEqual(false);
  });

  test("ERROR_SAVE should return state as false", () => {
    action = { type: c.ERROR_SAVE }
    testState = true;
    expect(loadingReducer(testState, action)).toEqual(false);
  });

});