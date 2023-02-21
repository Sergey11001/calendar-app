import React from 'react';
import {Layout, Menu, Row} from "antd";
import {useNavigate} from "react-router-dom";
import {RoutesNames} from "../routes";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {AuthActions} from "../redux/auth/actions";
import {useActions} from "../hooks/useActions";

const NavBar = () => {
    const navigate = useNavigate()
    const {user} = useTypedSelector(state => state.authReducer)
    const {logout} = useActions()
    const isAuth = useTypedSelector(state => state.authReducer.isAuth)
    const logoutHandle = () => {
        logout()
        navigate(RoutesNames.LOGIN)
    }

    return (
        <Layout.Header>
            <Row justify="end" style={{color:"white"}}>
                    {
                        isAuth ?
                            <>
                                <div style={{color:"white"}}>{user.username}</div>
                                <Menu theme={"dark"} selectable={false}>
                                    <Menu.Item key={1} onClick={() => logoutHandle()}>Выйти</Menu.Item>
                                </Menu>
                            </>
                            :
                            <Menu theme={"dark"} selectable={false}>
                                <Menu.Item key={1} onClick={() => navigate(RoutesNames.LOGIN)}>Логин</Menu.Item>
                            </Menu>
                    }
            </Row>
        </Layout.Header>
    );
};

export default NavBar;