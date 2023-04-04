import * as c from "./ActionTypes";

export const authSave = (token) => ({
  type: c.AUTH_SAVE,
  token: token
});
export const authDecrement = () => ({
  type: c.AUTH_DECREMENT
});
export const authClear = () => ({
  type: c.AUTH_CLEAR
});
export const errorSave = (message) => ({
  type: c.ERROR_SAVE,
  error: message
});
export const errorClear = () => ({
  type: c.ERROR_CLEAR
});
export const animalArraySave = (animals) => ({
  type: c.ANIMAL_ARRAY_SAVE,
  animalArray: animals
});
export const animalArrayClear = () => ({
  type: c.ANIMAL_ARRAY_CLEAR
});
export const animalObjectSave = (animal) => ({
  type: c.ANIMAL_OBJECT_SAVE,
  animalObject: animal
});
export const animalObjectClear = () => ({
  type: c.ANIMAL_OBJECT_CLEAR
});
export const loadingTrigger = () => ({
  type: c.LOADING_TRIGGER
});