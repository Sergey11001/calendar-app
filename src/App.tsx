import React, {useEffect} from 'react';
import AppRouter from "./components/AppRouter";
import {Layout} from "antd";
import NavBar from "./components/NavBar";
import {useActions} from "./hooks/useActions";
import {IUser} from "./models/IUser";

function App() {
    const {setAuth, setUser} = useActions()
    useEffect(() => {
        if(localStorage.getItem('auth')){
            setAuth(true)
            setUser({username: localStorage.getItem('username' || '') } as IUser)
        }
    },[])
    return (
        <div className="wrapper">
            <Layout>
                <NavBar />
                <Layout.Content>
                    <AppRouter />
                </Layout.Content>
            </Layout>

        </div>
    );
}

export default App;
