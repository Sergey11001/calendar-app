import {IUser} from "../../models/IUser";
import {AuthActionsEnum, SetAuthAction, SetErrorAction, SetLoadingAction, SetUserAction} from "./types";
import axios from "axios";
import {AppDispatch} from "../store";
import UserService from "../../api/UserService";

export const AuthActionsCreator = {
    setUser: (user: IUser): SetUserAction => ({
        type: AuthActionsEnum.SET_USER,
        payload: user
    }),
    setAuth: (auth: boolean): SetAuthAction => ({
        type: AuthActionsEnum.SET_AUTH,
        payload: auth
    }),
    setLoading: (loading: boolean): SetLoadingAction => ({
        type: AuthActionsEnum.SET_LOADING,
        payload: loading
    }),
    setError: (error: string): SetErrorAction => ({
        type: AuthActionsEnum.SET_ERROR,
        payload: error
    }),
    login: (username: string, password: string) => async (dispatch: AppDispatch): Promise<void> => {
        dispatch(AuthActionsCreator.setLoading(true))
        setTimeout(async () => {
            try {
                const {data} = await UserService.getUsers()
                const currentUser = data.find(user => user.username === username && user.password === password)
                if (currentUser) {
                    localStorage.setItem('auth', 'true')
                    localStorage.setItem('username', username)
                    dispatch(AuthActionsCreator.setAuth(true))
                    dispatch(AuthActionsCreator.setUser({username, password}))
                } else {
                    dispatch(AuthActionsCreator.setError('Неверный логин или пароль'))
                }
            } catch (e) {
                dispatch(AuthActionsCreator.setError("Ошибка при логине"))
            } finally {
                dispatch(AuthActionsCreator.setLoading(false))
            }

        }, 1000)
    },
    logout: () => (dispatch: AppDispatch):void => {
        localStorage.removeItem('auth')
        localStorage.removeItem('username')
        dispatch(AuthActionsCreator.setAuth(false))
        dispatch(AuthActionsCreator.setUser({} as IUser))
    }
}

export class AuthActions {
}