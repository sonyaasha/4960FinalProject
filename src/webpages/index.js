import React from 'react'
import {
    Routes,
    Route,
    HashRouter
} from "react-router-dom";
import { createHashHistory } from 'history';
import Home from './home';
import User from './user';
import Event from './event';
import UserList from './UserList';
import Limits from './Limits';
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
                <Route path="/userList" element={<UserList />} />
                <Route path="/user/:id" element={<User/>} />   
                <Route path="/event/:eventId" element={<Event/>} />  
                <Route path="/editEvent/:eventId" element={<EditEvent/>} />  
                <Route path="/eventList" element={<EventList/>} />       
                <Route path="/limits" element={<Limits/>} /> 
                <Route path="/createEvent" element={<CreateEvent/>} />          
            </Routes>
        </HashRouter>
    );
};
export default Webpages;