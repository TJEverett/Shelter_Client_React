import { createStore } from "redux";
import * as c from "../../actions/ActionTypes"
import rootReducer from "../../reducers/index";
import animalArrayReducer from "../../reducers/animal-array-reducer";
import animalObjectReducer from "../../reducers/animal-object-reducer";
import authReducer from "../../reducers/auth-reducer";
import errorReducer from "../../reducers/error-reducer";
import loadingReducer from "../../reducers/loading-reducer";

describe("rootReducer", () => {

  let store = createStore(rootReducer);
  let action;

  test("should return default state if no action type is recognized", () => {
    expect(rootReducer({}, {type: null})).toEqual({
      animalArray: [],
      animalObject: {},
      auth: {timeRemaining: null, token: null},
      error: null,
      isLoading: false
    });
  });

  test("check that initial state of animalArrayReducer matches root reducer", () => {
    expect(store.getState().animalArray).toEqual(animalArrayReducer(undefined, {type: null}));
  });
  
  test("check that initial state of animalObjectReducer matches root reducer", () => {
    expect(store.getState().animalObject).toEqual(animalObjectReducer(undefined, { type: null }));
  });

  test("check that initial state of authReducer matches root reducer", () => {
    expect(store.getState().auth).toEqual(authReducer(undefined, { type: null }));
  });

  test("check that initial state of errorReducer matches root reducer", () => {
    expect(store.getState().error).toEqual(errorReducer(undefined, { type: null }));
  });

  test("check that initial state of loadingReducer matches root reducer", () => {
    expect(store.getState().isLoading).toEqual(loadingReducer(undefined, { type: null }));
  });

  test("check that ANIMAL_ARRAY_SAVE action works for animalArrayReducer and root reducer", () => {
    action = {
      type: c.ANIMAL_ARRAY_SAVE,
      animalArray: [{ id: "1", name: "cat" }, { id: "3", name: "dog" }]
    };
    store.dispatch(action);
    expect(store.getState().animalArray).toEqual(animalArrayReducer([], action));
  });

  test("check that ANIMAL_OBJECT_SAVE action works for animalObjectReducer and root reducer", () => {
    action = {
      type: c.ANIMAL_OBJECT_SAVE,
      animalObject: { id: "1", name: "cat" }
    };
    store.dispatch(action);
    expect(store.getState().animalObject).toEqual(animalObjectReducer({}, action));
  });

  test("check that AUTH_SAVE action works for authReducer and root reducer", () => {
    action = {
      type: c.AUTH_SAVE,
      token: "123abc",
    };
    store.dispatch(action);
    expect(store.getState().auth).toEqual(authReducer({token: null, timeRemaining: null}, action));
  });

  test("check that ERROR_SAVE action works for errorReducer and root reducer", () => {
    action = {
      type: c.ERROR_SAVE,
      error: "error message"
    };
    store.dispatch(action);
    expect(store.getState().error).toEqual(errorReducer(null, action));
  });

  test("check that LOADING_TRIGGER action works for loadingReducer and root reducer", () => {
    action = {
      type: c.LOADING_TRIGGER
    };
    store.dispatch(action);
    expect(store.getState().isLoading).toEqual(loadingReducer(false, action));
  });

});
// animalArray = (array)
// animalObject = (object)
// auth = {token: (string), timeRemaining: (int)}
// error = (string)
// isLoading = (bool)