import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux/store";
import {bindActionCreators} from "redux";
import {actionCreators} from "../redux/actionCreators";

export const useActions = () => {
    const dispatch = useDispatch<AppDispatch>()
    return bindActionCreators(actionCreators, dispatch)
}