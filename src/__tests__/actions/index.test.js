import * as actions from "../../actions/index";
import * as c from "../../actions/ActionTypes";

describe("API Response Action Creators", () => {
  test("authSave should create AUTH_SAVE action", () => {
    const token = "123abc";
    expect(actions.authSave(token)).toEqual({
      type: c.AUTH_SAVE,
      token
    });
  });

  test("authDecrement should create AUTH_DECREMENT action", () => {
    expect(actions.authDecrement()).toEqual({
      type: c.AUTH_DECREMENT
    });
  });

  test("authClear should create AUTH_CLEAR action", () => {
    expect(actions.authClear()).toEqual({
      type: c.AUTH_CLEAR
    });
  });

  test("errorSave should create ERROR_SAVE action", () => {
    const error = "error message";
    expect(actions.errorSave(error)).toEqual({
      type: c.ERROR_SAVE,
      error
    });
  });

  test("errorClear should create ERROR_CLEAR action", () => {
    expect(actions.errorClear()).toEqual({
      type: c.ERROR_CLEAR
    });
  });

  test("animalArraySave should create ANIMAL_ARRAY_SAVE action", () => {
    const animalArray = [{ id: "1", name: "cat" }, { id: "3", name: "dog" }];
    expect(actions.animalArraySave(animalArray)).toEqual({
      type: c.ANIMAL_ARRAY_SAVE,
      animalArray
    });
  });

  test("animalArrayClear should create ANIMAL_ARRAY_CLEAR action", () => {
    expect(actions.animalArrayClear()).toEqual({
      type: c.ANIMAL_ARRAY_CLEAR
    });
  });

  test("animalObjectSave should create ANIMAL_OBJECT_SAVE action", () => {
    const animalObject = { id: "1", name: "cat" };
    expect(actions.animalObjectSave(animalObject)).toEqual({
      type: c.ANIMAL_OBJECT_SAVE,
      animalObject
    });
  });

  test("animalObjectClear should create ANIMAL_OBJECT_CLEAR action", () => {
    expect(actions.animalObjectClear()).toEqual({
      type: c.ANIMAL_OBJECT_CLEAR
    });
  });

  test("loadingTrigger should create LOADING_TRIGGER action", () => {
    expect(actions.loadingTrigger()).toEqual({
      type: c.LOADING_TRIGGER
    });
  });

})