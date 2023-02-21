import {ReactNode} from "react";

import Login from "../pages/Login";
import Event from "../pages/Event";

export interface IRoute {
    path: string,
    element: ReactNode
}

export enum RoutesNames {
    LOGIN = "/login",
    EVENT = "/",
}

export const publicRoutes: IRoute[] = [
    {
        path: RoutesNames.LOGIN,
        element: <Login/>
    }
]

export const privateRoutes: IRoute[] = [
    {
        path: RoutesNames.EVENT,
        element: <Event/>
    }
]