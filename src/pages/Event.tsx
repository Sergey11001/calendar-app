import React, {useEffect, useState} from 'react';
import {Button, Layout, Modal, Row} from "antd";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IEvent} from "../models/IEvent";

const Event = () => {
    const [modalIsVisible, setModalIsVisible] = useState(false)
    const {fetchGuests, createEvent, fetchEvents} = useActions()
    const {guests, events} = useTypedSelector(state => state.eventReducer)
    const {user} = useTypedSelector(state => state.authReducer)
    const submitForm = (event:IEvent) => {
        createEvent(event)
        setModalIsVisible(false)
    }
    const handleOk = () => {
        setModalIsVisible(false);
    };

    const handleCancel = () => {
        setModalIsVisible(false);
    };

    useEffect(() => {
        fetchGuests()
    }, [])

    useEffect(() => {
        fetchEvents(user.username)
    }, [])

    return (
        <Layout>
            <EventCalendar events={events} />
            <Row justify='center'>
                <Button style={{marginBottom:30, marginTop:20}} onClick={() => setModalIsVisible(true)}>Добавить событие</Button>
            </Row>
            <Modal title="Basic Modal" open={modalIsVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <EventForm guests={guests} submitForm={submitForm}/>
            </Modal>
        </Layout>
    );
};

export default Event;