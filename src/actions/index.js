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

//Random Async
export const loopAt = (action, delay) => {
  return (dispatch) => {
    const event = setInterval(() => {
      dispatch(action)
    }, delay);
    return event
  }
}
export const delayAt = (action, delay) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(action);
    }, delay);
  }
}

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
          .then((response) => {
            if(response.status === 200){
              dispatch(delayAt(errorSave("Login Successful"), 1000)); //respond through error message
              return response.json();
            } else {
              throw new Error(response.status);
            }
          })
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
            "Content-type": "application/json",
            "Authorization": "Bearer " + authToken
          },
          body: JSON.stringify(params)
        };
        url = ApiUrl + "/login/new";
        fetch(url, options)
          .then((response) => dispatch(errorSave("Account Created"))) //respond through error message
          .catch((error) => {
            dispatch(errorSave(error)) //error report
          });
        break;
      case "delete":
        options = {
          method: "DELETE",
          headers: {
            "Accept": "application/json, text/plain",
            "Content-type": "application/json",
            "Authorization": `Bearer ${authToken}`,
          },
          body: JSON.stringify(params)
        };
        url = ApiUrl + "/login/delete";
        fetch(url, options)
          .then((response) => dispatch(errorSave("Account Deleted"))) //respond through error message
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
    let params = {};
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
          params.isKitten = "true";
        }else if(dataObject.animalAge === "over"){
          params.isKitten = "false";
        }
        if(dataObject.animalGender !== "any"){
          params.gender = dataObject.animalGender;
        }
        url = ApiUrl + "/cats?" + new URLSearchParams(params);
        break;
      case "dog":
        if (dataObject.animalAge === "under") {
          params.isPuppy = true;
        } else if (dataObject.animalAge === "over") {
          params.isPuppy = false;
        }
        if (dataObject.animalGender !== "any") {
          params.gender = dataObject.animalGender;
        }
        url = ApiUrl + "/dogs?" + new URLSearchParams(params);
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
    const animalId = dataObject.catId;
    let options;
    let url;

    switch (type) {
      case "post":
        options = {
          method: "POST",
          headers: {
            "Accept": "application/json, text/plain",
            "Content-type": "application/json",
            "Authorization": `Bearer ${authToken}`,
          },
          body: JSON.stringify(dataObject)
        };
        url = ApiUrl + "/cats";
        fetch(url, options)
          .then((response) => {
            if (response.status === 200) {
              dispatch(errorSave("Animal Added to Database")) //respond through error message
            } else {
              throw new Error(response.status);
            }
          })
          .catch((error) => {
            dispatch(errorSave(error)); //error report
          });
        break;
      case "put":
        options = {
          method: "PUT",
          headers: {
            "Accept": "application/json, text/plain",
            "Content-type": "application/json",
            "Authorization": `Bearer ${authToken}`,
          },
          body: JSON.stringify(dataObject)
        };
        url = ApiUrl + "/cats/" + animalId;
        fetch(url, options)
          .then((response) => {
            if (response.status === 200) {
              dispatch(animalObjectSave(dataObject)); //Save animal that was passed to API
              dispatch(errorSave("Animal Updated In Database")); //respond through error message
            } else {
              throw new Error(response.status);
            }
          })
          .catch((error) => {
            dispatch(errorSave(error)); //error report
          });
        break;
      case "delete":
        options = {
          method: "DELETE",
          headers: {
            "Accept": "application/json, text/plain",
            "Content-type": "application/json",
            "Authorization": `Bearer ${authToken}`,
          },
        };
        url = ApiUrl + "/cats/" + animalId;
        fetch(url, options)
          .then((response) => {
            if(response.status === 200){
              dispatch(errorSave("Animal Deleted From Database")); //respond through error message
              dispatch(delayAt(animalObjectClear(), 500)); //clear animal selection
            } else {
              throw new Error(response.status);
            }
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
    const animalId = dataObject.dogId;
    let options;
    let url;

    switch (type) {
      case "post":
        options = {
          method: "POST",
          headers: {
            "Accept": "application/json, text/plain",
            "Content-type": "application/json",
            "Authorization": `Bearer ${authToken}`,
          },
          body: JSON.stringify(dataObject)
        };
        url = ApiUrl + "/dogs";
        fetch(url, options)
          .then((response) => {
            if (response.status === 200) {
              dispatch(errorSave("Animal Added to Database")) //respond through error message
            } else {
              throw new Error(response.status);
            }
          })
          .catch((error) => {
            dispatch(errorSave(error)); //error report
          });
        break;
      case "put":
        options = {
          method: "PUT",
          headers: {
            "Accept": "application/json, text/plain",
            "Content-type": "application/json",
            "Authorization": `Bearer ${authToken}`,
          },
          body: JSON.stringify(dataObject)
        };
        url = ApiUrl + "/dogs/" + animalId;
        fetch(url, options)
          .then((response) => {
            if (response.status === 200) {
              dispatch(animalObjectSave(dataObject)); //Save animal that was passed to API
              dispatch(errorSave("Animal Updated In Database")) //respond through error message
            } else {
              throw new Error(response.status);
            }
          })
          .catch((error) => {
            dispatch(errorSave(error)); //error report
          });
        break;
      case "delete":
        options = {
          method: "DELETE",
          headers: {
            "Accept": "application/json, text/plain",
            "Content-type": "application/json",
            "Authorization": `Bearer ${authToken}`,
          },
        };
        url = ApiUrl + "/dogs/" + animalId;
        fetch(url, options)
          .then((response) => {
            if(response.status === 200){
              dispatch(errorSave("Animal Deleted From Database")); //respond through error message
              dispatch(delayAt(animalObjectClear(), 500)); //clear animal selection
            } else {
              throw new Error(response.status);
            }
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