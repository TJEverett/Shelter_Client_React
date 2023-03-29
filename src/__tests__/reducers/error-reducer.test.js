import errorReducer from "../../reducers/error-reducer"
import * as c from "../../actions/ActionTypes"

describe("errorReducer", () => {

  const defaultState = null;
  let action;
  let testState;

  test("should successfully return the default state if no action is passed into it", () => {
    expect(errorReducer(defaultState, {type: null})).toEqual(null);
  });

  test("ERROR_SAVE should save the error message as state", () => {
    action = {
      type: c.ERROR_SAVE,
      error: "error message"
    };

    expect(errorReducer(defaultState, action)).toEqual("error message");
  });

  test("ERROR_CLEAR should turn state null", () => {
    action = {
      type: c.ERROR_CLEAR,
    };
    testState = "error message";

    expect(errorReducer(testState, action)).toEqual(null);
  });

});