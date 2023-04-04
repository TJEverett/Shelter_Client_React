import * as c from "./ActionTypes";

//Action Creators
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

//API Calls
const ApiUrl = "http://localhost:5000/api";

export const ApiAuthCall = (type, userInfo) => {
  return (dispatch, getState) => {
    const authToken = getState().auth.token;
    const params = {
      "username": userInfo.username,
      "password": userInfo.password
    };
    let options;
    let url;

    switch (type) {
      case "login":
        options = {
          method: "POST",
          body: JSON.stringify(params)
        };
        url = ApiUrl + "/login/login";
        fetch(url, options)
          .then(response => response.json())
          .then(
            (jsonifiedResponse) => {
              dispatch(authSave(jsonifiedResponse.token)); // save auth token
            })
          .catch((error) => {
            dispatch(error) //error report
          });
        break;
      case "new":
        options = {
          method: "POST",
          Authorization: "Bearer " + authToken,
          body: JSON.stringify(params)
        };
        url = ApiUrl + "/login/login";
        fetch(url, options)
          .then(response => response.json())
          .then()
          .catch((error) => {
            dispatch(error) //error report
          });
        break;
      case "delete":
        options = {
          method: "DELETE",
          Authorization: "Bearer " + authToken,
          body: JSON.stringify(params)
        };
        url = ApiUrl + "/login/login";
        fetch(url, options)
          .then(response => response.json())
          .then()
          .catch((error) => {
            dispatch(error) //error report
          });
        break;
    }
  }
}