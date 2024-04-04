import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { _ACCESS_TOKEN } from '../shared/constants'
const CreateEvent = () => {
    // const { eventName } = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    const [eventName, setEventName] = useState(""); // useState("Default Value"); 
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    // const isLoaded = true;
    // const [event, setEvent] = useState([]);

    useEffect(() => {
       // console.log(`-- useEffect --`, _ACCESS_TOKEN )
    })
    
    const createEvent = (data) => {
        const {Name, Organizer_Email__c} = data;
        // POST request
        fetch("http://localhost:8082/sobjects/MyEvent__c", 
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${_ACCESS_TOKEN}`,
                'Content-Type': 'application/json', 
            }
        })
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data);
                    setIsLoaded(true);
                    alert(`Event ${Name} saved`);
                },
                (error) => {
                    console.warn(error);
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    const submitForm = (e) => { 
        console.log(`-- submitForm.eventName --`,  eventName);
        console.log(`-- submitForm.email --`,  email);
        console.log(`-- submitForm.streetAddress --`,  streetAddress);
        console.log(`-- submitForm.city --`,  city);
        console.log(`-- submitForm.state --`,  state);
        console.log(`-- submitForm.date --`,  date);
        console.log(`-- submitForm.time --`,  time);
        createEvent({
            "Name": eventName,
            "Organizer_Email__c": email,
            "City__c": city,
            // add description
            "State__c": state,
            "Street_Address__c": streetAddress,
            "Date__c": date,
            "Time__c": time
        })
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {

        return (
            <>
            <div className="container-fluid">
               <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h3 className="text-themecolor">Create New Event</h3>
                </div>
                <div className="col-md-7 align-self-center">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={`/`}>{`Home`}</Link></li>
                        <li className="breadcrumb-item active">Create New Event</li>
                    </ol>
                </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Create New Event</h4>
                        <h6 className="card-subtitle">Enter the details of your new event in the form fields below.</h6>
                        <div className="form-material m-t-40" method='POST'> 
                            <div className="form-group">
                                <label>Event Name</label>
                                <input type="text" 
                                    name="eventName" 
                                    value={eventName}
                                    className="form-control form-control-line" 
                                    placeholder="Enter Event Name" 
                                    onChange={(event) => {
                                        const target = event.target;
                                        const value = target.value;
                                        // const name = target.name; 
                                        setEventName(value);
                                       
                                    }}
                                /> </div>
                            <div className="form-group">
                                <label>Description</label>
                                <input type="text" 
                                    name="description" 
                                    value={description}
                                    className="form-control form-control-line" 
                                    placeholder="Enter Description" 
                                    onChange={(event) => {
                                        const target = event.target;
                                        const value = target.value;
                                        // const name = target.name; 
                                        setDescription(value);
                                       
                                    }}
                                /> </div>
                            <div className="form-group">
                                <label>Contact Email <span className="help"> e.g. "example@gmail.com"</span></label>
                                <input type="email" 
                                id="example-email2" 
                                name="email" 
                                value={email}
                                className="form-control" 
                                placeholder="Enter Email" 
                                onChange={(event) => {
                                    const target = event.target;
                                    const value = target.value;
                                    // const name = target.name; 
                                    setEmail(value);
                                   
                                }}
                                /></div>
                            <div className="form-group">
                                <label>Street Address</label>
                                <input type="text" 
                                name="streetAddress"
                                value={streetAddress}
                                className="form-control" 
                                placeholder="Street Address" 
                                onChange={(event) => {
                                    const target = event.target;
                                    const value = target.value;
                                    // const name = target.name; 
                                    setStreetAddress(value);
                                   
                                }}
                                /> </div>
                            <div className="form-group">
                                <label>City</label>
                                <input type="text" 
                                name="city"
                                value={city}
                                className="form-control" 
                                placeholder="City Name" 
                                onChange={(event) => {
                                    const target = event.target;
                                    const value = target.value;
                                    // const name = target.name; 
                                    setCity(value);
                                   
                                }}
                                />  </div>
                            <div className="form-group">
                                <label>State</label>
                                <input type="text" 
                                name="state"
                                value={state}
                                className="form-control" 
                                placeholder="State Name" 
                                onChange={(event) => {
                                    const target = event.target;
                                    const value = target.value;
                                    // const name = target.name; 
                                    setState(value);
                                   
                                }}
                                /> </div>
                            <div className="form-group">
                                <label>Date <span className="help"> e.g. "1/11/24"</span> </label>
                                <input type="text" 
                                name="date"
                                value={date}
                                className="form-control" 
                                placeholder="Date" 
                                onChange={(event) => {
                                    const target = event.target;
                                    const value = target.value;
                                    // const name = target.name; 
                                    setDate(value);
                                   
                                }}
                                />  </div>
                            <div className="form-group">
                                <label>Time <span className="help"> e.g. "2:00 PM"</span></label>
                                <input type="text" 
                                name="time"
                                value={time}
                                className="form-control" 
                                placeholder="Time" 
                                onChange={(event) => {
                                    const target = event.target;
                                    const value = target.value;
                                    // const name = target.name; 
                                    setTime(value);
                                   
                                }}
                                />   </div>
                            <button type="submit" className="btn btn-primary waves-effect waves-light m-r-10" 
                            onClick={(e) => { 
                                 submitForm(e);
                            }}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    }
}
export default CreateEvent;