import {ReactNode} from "react";

import Login from "../pages/Login";
import Event from "../pages/Event";

export interface IRoute {
    path: string,
    element: ReactNode
}

//для gh-pages (calendar-app)
export enum RoutesNames {
    LOGIN = "calendar-app/login",
    EVENT = "calendar-app/",
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