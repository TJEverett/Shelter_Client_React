import authReducer from "../../reducers/auth-reducer";
import * as c from "../../actions/ActionTypes";

describe("authReducer", () => {

  const defaultState = {
    token: null,
    timeRemaining: null
  };
  let action;
  let testState;

  test("should successfully return the default stater if no action is passed into it", () => {
    expect(authReducer(defaultState, {type: null})).toEqual({
      token: null,
      timeRemaining: null
    });
  });

  test("AUTH_SAVE should save auth token and set remaining time to 179", () => {
    action = {
      type: c.AUTH_SAVE,
      token: "123abc",
    };

    expect(authReducer(defaultState, action)).toEqual({
      token: "123abc",
      timeRemaining: 179
    });
  });

  test("AUTH_DECREMENT should decrement time remaining by 1", () => {
    action = {
      type: c.AUTH_DECREMENT
    };
    testState = {
      token: "123abc",
      timeRemaining: 179
    };

    expect(authReducer(testState, action)).toEqual({
      token: "123abc",
      timeRemaining: 178
    });
  });

  test("AUTH_DECREMENT should clear token and time remaining instead when time remaining would be 0", () => {
    action = {
      type: c.AUTH_DECREMENT
    };
    testState = {
      token: "123abc",
      timeRemaining: 1
    };

    expect(authReducer(testState, action)).toEqual({
      token: null,
      timeRemaining: null
    });
  });

  test("AUTH_DECREMENT should do nothing if time remaining is null", () => {
    action = {
      type: c.AUTH_DECREMENT
    };

    expect(authReducer(defaultState, action)).toEqual({
      token: null,
      timeRemaining: null
    });
  });

  test("AUTH_CLEAR should set token and remaining time to null", () => {
    action = {
      type: c.AUTH_CLEAR
    };
    testState = {
      token: "123abc",
      timeRemaining: 179
    };

    expect(authReducer(testState, action)).toEqual({
      token: null,
      timeRemaining: null
    });
  });

});