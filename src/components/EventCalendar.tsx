import React, {FC} from 'react';
import {IEvent} from "../models/IEvent";
import {Calendar} from "antd";
import {Moment} from "moment";
import {formDate} from "../utils/date";

interface EventCalendarProps{
    events:IEvent[]
}


const EventCalendar: FC<EventCalendarProps> = ({events}) => {
    const dateCellRender = (value:any) => {
        const formattedDate = formDate(value.toDate())
        const currentDayEvents = events.filter(ev => ev.date === formattedDate)
        return (
            <div>
                {
                    currentDayEvents.map((ev,index) => (
                        <div key={index}>{ev.description}</div>
                    ))
                }
            </div>
        )
    }
    return (
        <Calendar
            dateCellRender={dateCellRender}
        />
    );
};

export default EventCalendar;