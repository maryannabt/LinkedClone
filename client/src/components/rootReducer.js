import { combineReducers } from "redux";
import loginReducer from "./Login/LoginReducer/Login.reducer";
import feedReducer from "./MainRail/FeedReducer/Feed.reducer";

const rootReducer = combineReducers({
  loginData: loginReducer,
  feedData: feedReducer
});

export default rootReducer;
