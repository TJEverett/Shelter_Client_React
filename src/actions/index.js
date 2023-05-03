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
      username: userInfo.username,
      password: userInfo.password
    };
    let options;
    let url;

    switch (type) {
      case "login":
        console.log(JSON.stringify(params));
        options = {
          method: "POST",
          headers: {
            "Accept": "application/json, text/plain",
            "Content-type": "application/json"
          },
          body: JSON.stringify(params)
        };
        url = ApiUrl + "/login/login";
        dispatch(loadingTrigger());
        fetch(url, options)
          .then(response => response.json())
          .then(
            (jsonifiedResponse) => {
              dispatch(authSave(jsonifiedResponse.token)); // save auth token
            })
          .catch((error) => {
            dispatch(errorSave(error)) //error report
          });
        break;
      case "new":
        options = {
          method: "POST",
          headers: {
            "Accept": "application/json, text/plain",
            "Content-type": "application/json"
          },
          Authorization: "Bearer " + authToken,
          body: JSON.stringify(params)
        };
        url = ApiUrl + "/login/new";
        fetch(url, options)
          .then(response => response.json())
          .then(errorSave("Account Created")) //respond through error message
          .catch((error) => {
            dispatch(errorSave(error)) //error report
          });
        break;
      case "delete":
        options = {
          method: "DELETE",
          headers: {
            "Accept": "application/json, text/plain",
            "Content-type": "application/json"
          },
          Authorization: "Bearer " + authToken,
          body: JSON.stringify(params)
        };
        url = ApiUrl + "/login/delete";
        fetch(url, options)
          .then(response => response.json())
          .then(errorSave("Account Deleted")) //respond through error message
          .catch((error) => {
            dispatch(errorSave(error)) //error report
          });
        break;
      default:
        break;
    }
  }
}

export const ApiArrayCall = (type, dataObject) => {
  return (dispatch) => {
    let options = {
      method: "GET",
      headers: {
        "Accept": "application/json, text/plain",
        "Content-type": "application/json"
      }
    };
    let url = ApiUrl;

    switch (type) {
      case "cat":
        if(dataObject.animalAge === "under"){
          options.isKitten = true;
        }else if(dataObject.animalAge === "over"){
          options.isKitten = false;
        }
        if(dataObject.animalGender !== "any"){
          options.gender = dataObject.animalGender;
        }
        url = ApiUrl + "/cats";
        break;
      case "dog":
        if (dataObject.animalAge === "under") {
          options.isPuppy = true;
        } else if (dataObject.animalAge === "over") {
          options.isPuppy = false;
        }
        if (dataObject.animalGender !== "any") {
          options.gender = dataObject.animalGender;
        }
        url = ApiUrl + "/dogs";
        break;
      default:
        break;
    }
    dispatch(loadingTrigger());
    fetch(url, options)
      .then(response => response.json())
      .then(
        (jsonifiedResponse) => {
          dispatch(animalArraySave(jsonifiedResponse)); // save animal array
        })
      .catch((error) => {
        dispatch(errorSave(error)) //error report
      });
  }
}

export const ApiObjectCall = (type, animalId) => {
  return (dispatch) => {
    let options = {
      method: "Get",
      headers: {
        "Accept": "application/json, text/plain",
        "Content-type": "application/json"
      },
    };
    let url = ApiUrl;

    switch (type) {
      case "cat":
        url = ApiUrl + "/cats/" + animalId;
        break;
      case "dog":
        url = ApiUrl + "/dogs/" + animalId;
        break;
      default:
        break;
    }
    dispatch(loadingTrigger());
    fetch(url, options)
      .then(response => response.json())
      .then(
        (jsonifiedResponse) => {
          dispatch(animalObjectSave(jsonifiedResponse)); // save animal object
        })
      .catch((error) => {
        dispatch(errorSave(error)) //error report
      });
  }
}

export const ApiCatsCall = (type, dataObject) => {
  return (dispatch, getState) => {
    const authToken = getState().auth.token;
    const animalId = dataObject.id;
    let options;
    let url;

    switch (type) {
      case "post":
        options = {
          method: "POST",
          headers: {
            "Accept": "application/json, text/plain",
            "Content-type": "application/json"
          },
          Authorization: "Bearer " + authToken,
          body: JSON.stringify(dataObject)
        };
        url = ApiUrl + "/cats";
        fetch(url, options)
          .then(response => response.json())
          .then(errorSave("Animal Added to Database")) //respond through error message
          .catch((error) => {
            dispatch(errorSave(error)); //error report
          });
        break;
      case "put":
        options = {
          method: "PUT",
          headers: {
            "Accept": "application/json, text/plain",
            "Content-type": "application/json"
          },
          Authorization: "Bearer " + authToken,
          body: JSON.stringify(dataObject)
        };
        url = ApiUrl + "/cats/" + animalId;
        fetch(url, options)
          .then(response => response.json())
          .then(errorSave("Animal Updated")) //respond through error message
          .catch((error) => {
            dispatch(errorSave(error)); //error report
          });
        break;
      case "delete":
        options = {
          method: "DELETE",
          headers: {
            "Accept": "application/json, text/plain",
            "Content-type": "application/json"
          },
          Authorization: "Bearer " + authToken
        };
        url = ApiUrl + "/cats/" + animalId;
        fetch(url, options)
          .then(response => response.json())
          .then(() => {
            dispatch(animalObjectClear()); //clear animal selection
          })
          .catch((error) => {
            dispatch(errorSave(error)); //error report
          });
        break;
      default:
        break;
    }
  }
}

export const ApiDogsCall = (type, dataObject) => {
  return (dispatch, getState) => {
    const authToken = getState().auth.token;
    const animalId = dataObject.id;
    let options;
    let url;

    switch (type) {
      case "post":
        options = {
          method: "POST",
          headers: {
            "Accept": "application/json, text/plain",
            "Content-type": "application/json"
          },
          Authorization: "Bearer " + authToken,
          body: JSON.stringify(dataObject)
        };
        url = ApiUrl + "/dogs";
        fetch(url, options)
          .then(response => response.json())
          .then(errorSave("Animal Added to Database")) //respond through error message
          .catch((error) => {
            dispatch(errorSave(error)); //error report
          });
        break;
      case "put":
        options = {
          method: "PUT",
          headers: {
            "Accept": "application/json, text/plain",
            "Content-type": "application/json"
          },
          Authorization: "Bearer " + authToken,
          body: JSON.stringify(dataObject)
        };
        url = ApiUrl + "/dogs/" + animalId;
        fetch(url, options)
          .then(response => response.json())
          .then(errorSave("Animal Updated")) //respond through error message
          .catch((error) => {
            dispatch(errorSave(error)); //error report
          });
        break;
      case "delete":
        options = {
          method: "DELETE",
          headers: {
            "Accept": "application/json, text/plain",
            "Content-type": "application/json"
          },
          Authorization: "Bearer " + authToken
        };
        url = ApiUrl + "/dogs/" + animalId;
        fetch(url, options)
          .then(response => response.json())
          .then(() => {
            dispatch(animalObjectClear()); //clear animal selection
          })
          .catch((error) => {
            dispatch(errorSave(error)); //error report
          });
        break;
      default:
        break;
    }
  }
}