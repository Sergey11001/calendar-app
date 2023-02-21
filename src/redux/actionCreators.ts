import {AuthActionsCreator} from "./auth/actions";
import {EventActionsCreator} from "./event/actions";

export const actionCreators = {
    ...AuthActionsCreator,
    ...EventActionsCreator
}