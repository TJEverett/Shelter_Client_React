import { combineReducers } from "redux";
import animalArrayReducer from "./animal-array-reducer";
import animalObjectReducer from "./animal-object-reducer";
import authReducer from "./auth-reducer";
import errorReducer from "./error-reducer";
import loadingReducer from "./loading-reducer";

const rootReducer = combineReducers({
  animalArray: animalArrayReducer, // animalArray = (array)
  animalObject: animalObjectReducer, // animalObject = (object)
  auth: authReducer, // auth = {token: (string), timeRemaining: (int)}
  error: errorReducer, // error = (string)
  isLoading: loadingReducer // isLoading = (bool)
});

export default rootReducer;