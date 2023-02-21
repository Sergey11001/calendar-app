import React, {FC, useEffect, useState} from 'react';
import {Button, DatePicker, Form, Input, Row, Select} from "antd";
import {rules} from "../utils/rules";
import {IUser} from "../models/IUser";
import {IEvent} from "../models/IEvent";
import {Moment} from "moment";
import {formDate} from "../utils/date";
import {useTypedSelector} from "../hooks/useTypedSelector";

interface EventFormProps {
    guests: IUser[],
    submitForm: (event: IEvent) => void
}


const EventForm: FC<EventFormProps> = ({guests, submitForm}) => {
    const [event, setEvent] = useState<IEvent>({
        author: '',
        date: '',
        description: '',
        guest: ''
    })
    const {user} = useTypedSelector(state => state.authReducer)
    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({...event, date: formDate(date.toDate())})
        }
    }
    const submit = () => {
        submitForm({...event, author: user.username})
    }

    return (
        <Form onFinish={submit}>
            <Form.Item
                label="Описание события"
                name="description"
                rules={rules.required()}
            >
                <Input value={event.description} onChange={(e) => setEvent({...event, description: e.target.value})}/>
            </Form.Item>
            <Form.Item
                label="Дата события"
                name="date"
                rules={[...rules.required(), rules.isDateAfter("Эта дата уже прошла")]}
            >
                <DatePicker
                    onChange={(date) => selectDate(date as Moment)}
                />
            </Form.Item>
            <Form.Item
                label="Человек"
                name="guest"
                rules={rules.required()}
            >
                <Select onChange={(guest) => setEvent({...event, guest})}>
                    {guests.map(guest => (
                        <Select.Option value={guest.username} key={guest.username}>
                            {guest.username}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item>
                <Row justify='end'>
                    <Button type="primary" htmlType="submit">
                        Создать
                    </Button>
                </Row>
            </Form.Item>
        </Form>
    );
};

export default EventForm;