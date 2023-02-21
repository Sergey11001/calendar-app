import React, {useState} from 'react';
import {Button, Form, Input} from "antd";
import {rules} from "../utils/rules";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login} = useActions()
    const {error, isLoading} = useTypedSelector(state => state.authReducer)
    const submit = () => {
        login(username, password)
    }

    return (
        <Form
            onFinish={submit}
        >
            {
                error &&
                <div style={{color:"red"}}>{error}</div>
            }
            <Form.Item
                label="Логин"
                name="username"
                rules={rules.required("Введите логин")}
            >
                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Item>
            <Form.Item
                label="Пароль"
                name="password"
                rules={rules.required("Введите пароль")}
            >
                <Input value={password} onChange={(e) => setPassword(e.target.value)} type={'password'}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;