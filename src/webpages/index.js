import React from 'react'
import {
    Routes,
    Route,
    HashRouter
} from "react-router-dom";
import { createHashHistory } from 'history';
import Home from './home';
import Event from './event';
import EventList from './EventList';
import CreateEvent from './createEvent';
import EditEvent from './editEvent'


const hashHistory = createHashHistory();
const Webpages = (props) => {
    return (
        <HashRouter history={hashHistory}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/event/:eventId" element={<Event/>} />  
                <Route path="/editEvent/:eventId" element={<EditEvent/>} />  
                <Route path="/eventList" element={<EventList/>} /> 
                <Route path="/createEvent" element={<CreateEvent/>} />          
            </Routes>
        </HashRouter>
    );
};
export default Webpages;