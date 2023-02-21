import {EventActionsEnum, EventsActions, EventState} from "./types";

const initialState = {
    guests:[],
    events:[]
}


const eventReducer = (state = initialState, action: EventsActions): EventState => {
    switch (action.type) {
        case EventActionsEnum.SET_EVENTS:
            return {
                ...state,
                events: action.payload
            }
        case EventActionsEnum.SET_GUESTS:
            return {
                ...state,
                guests: action.payload
            }
        default:
            return state
    }
}

export default eventReducer