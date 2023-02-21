import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes, RoutesNames} from "../routes";
import {useTypedSelector} from "../hooks/useTypedSelector";

const AppRouter = () => {
    const isAuth = useTypedSelector(state => state.authReducer.isAuth)

    return isAuth ?
        <Routes>
            {
                privateRoutes.map(route => (
                    <Route {...route} key={route.path}/>
                ))
            }
            <Route path="*"  element={<Navigate to={RoutesNames.EVENT} />}/>
        </Routes>
        :
        <Routes>
            {
                publicRoutes.map(route => (
                    <Route {...route} key={route.path}/>
                ))
            }
            <Route path="*" element={<Navigate to={RoutesNames.LOGIN} />}/>
        </Routes>

};

export default AppRouter;