import { combineReducers } from "redux";
import { Auth } from "../reducer/reducer";

const rootReducer = combineReducers({
  Auth:Auth
});

export default rootReducer;