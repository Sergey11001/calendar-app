import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk"
import authReducer from "./auth/reducers";
import eventReducer from "./event/reducers";

const rootReducer = combineReducers({
    authReducer,
    eventReducer
})
const store = createStore(rootReducer, applyMiddleware(thunk))

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch