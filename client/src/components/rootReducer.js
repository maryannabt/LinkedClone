import { combineReducers } from "redux";
import loginReducer from "./Login/LoginReducer/Login.reducer";
import feedReducer from "./MainRail/FeedReducer/Feed.reducer";
import userPageReducer from "./UserPage/UserPageReducer/UserPage.reducer";
import bottomReducer from './Bottom/BottomReducer/Bottom.reducer';

const rootReducer = combineReducers({
  loginData: loginReducer,
  feedData: feedReducer,
  userPageData: userPageReducer,
  bottomData: bottomReducer
});

export default rootReducer;
