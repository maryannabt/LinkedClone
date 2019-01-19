import { combineReducers } from "redux";
import loginReducer from "./Login/LoginReducer/Login.reducer";

const rootReducer = combineReducers({
  loginData: loginReducer
});

export default rootReducer;
