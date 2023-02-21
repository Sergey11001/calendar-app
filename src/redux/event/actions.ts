import {IUser} from "../../models/IUser";
import {EventActionsEnum, SetEventsAction, SetGuestsAction} from "./types";
import {IEvent} from "../../models/IEvent";
import {AppDispatch} from "../store";
import UserService from "../../api/UserService";

export const EventActionsCreator = {
    setGuests: (guests: IUser[]): SetGuestsAction => ({
        type:EventActionsEnum.SET_GUESTS,
        payload:guests
    }),
    setEvents: (events: IEvent[]): SetEventsAction => ({
        type:EventActionsEnum.SET_EVENTS,
        payload:events
    }),
    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try{
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEvent[]
            dispatch(EventActionsCreator.setEvents([...json, event]))
            localStorage.setItem('events', JSON.stringify([...json, event]))
        }
        catch (e){
            console.log(e)
        }
    },
    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            const {data} = await UserService.getUsers()
            dispatch(EventActionsCreator.setGuests(data))

        }
        catch (e){
            console.log(e)
        }
    },
    fetchEvents: (username:string) => (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEvent[]
            const currentUserEvents = json.filter(event => event.author==username || event.guest==username)
            dispatch(EventActionsCreator.setEvents(currentUserEvents))

        }
        catch (e){
            console.log(e)
        }
    }
}