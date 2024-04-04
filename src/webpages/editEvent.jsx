import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { _ACCESS_TOKEN } from '../shared/constants'
const EditEvent = () => {
    // const { eventName } = useParams();
    const { eventId } = useParams(); 
    const [event, setEvent] = useState([]); 

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);
    // const isLoaded = true;
    // const [event, setEvent] = useState([]);

    useEffect(() => {
       // console.log(`-- useEffect --`, _ACCESS_TOKEN )
       // console.warn("useEffect");
       fetch("http://localhost:8082/sobjects/MyEvent__c/" + eventId, 
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${_ACCESS_TOKEN}`, 
            }
        })
            .then(res => res.json())
            .then(
                (data) => {
                    // console.log(data);
                    setEvent(data);
                    setIsLoaded(true);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [eventId])
    
    const editEvent = (data) => {
        const {Name, Organizer_Email__c} = data;
        setIsLoaded(false);
        // PATCH request
        fetch("http://localhost:8082/sobjects/MyEvent__c/" + eventId, 
        {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${_ACCESS_TOKEN}`,
                'Content-Type': 'application/json', 
            }
        })
            .then(
                (data) => {
                    console.log(data);
                    setIsLoaded(true);
                    alert(`Event ${Name} edited`);
                },
                (error) => {
                    console.warn(error);
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    const deleteEvent = (data) => {
        setIsLoaded(false);
        // DELETE request
        fetch("http://localhost:8082/sobjects/MyEvent__c/" + eventId, 
        {
            method: "DELETE",
            body: JSON.stringify({}),
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${_ACCESS_TOKEN}`,
                'Content-Type': 'application/json', 
            }
        })
            .then(
                (data) => {
                    console.log(data);
                    setIsLoaded(true);
                    alert(`Event Deleted`);
                },
                (error) => {
                    console.warn(error);
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    const saveChanges = (e) => { 
        console.log(`-- submitForm.eventName --`,  event.Name);
        // console.log(`-- submitForm.email --`,  email);
        // console.log(`-- submitForm.streetAddress --`,  streetAddress);
        // console.log(`-- submitForm.city --`,  city);
        // console.log(`-- submitForm.state --`,  state);
        // console.log(`-- submitForm.date --`,  date);
        // console.log(`-- submitForm.time --`,  time);
        editEvent({
            "Name": event.Name,
            "Organizer_Email__c": event.Organizer_Email__c,
            "City__c": event.City__c,
            "Description__c": event.Description__c,
            "State__c": event.State__c,
            "Street_Address__c": event.Street_Address__c,
            "Date__c": event.Date__c,
            "Time__c": event.Time__c
        })
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        // console.log(`-- submitForm.eventName --`,  eventName);
        // console.log(`-- submitForm.email --`,  email);
        // console.log(`-- submitForm.streetAddress --`,  streetAddress);
        // console.log(`-- submitForm.city --`,  city);
        // console.log(`-- submitForm.state --`,  state);
        // console.log(`-- submitForm.date --`,  date);
        // console.log(`-- submitForm.time --`,  time);
        return (
            <>
            <div className="container-fluid">
               <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h3 className="text-themecolor">Edit {event.Name}</h3>
                </div>
                <div className="col-md-7 align-self-center">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={`/eventList`}>{`Event List`}</Link> </li>
                        <li className="breadcrumb-item active">{event.Name}</li>
                    </ol>
                </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Edit {event.Name}</h4>
                        <h6 className="card-subtitle">Modify the details of your {event.Name} event in the form fields below.</h6>
                        <div className="form-material m-t-40" method='POST'> 
                            <div className="form-group">
                                <label>Event Name</label>
                                <input type="text" 
                                    name="eventName" 
                                    defaultValue={event.Name}
                                    className="form-control form-control-line" 
                                    placeholder={event.Name}
                                    onChange={(e) => {
                                        const target = e.target;
                                        const value = target.value;
                                        event.Name = value;
                                        setEvent(event);
                                    }}
                                /> </div>
                            <div className="form-group">
                                <label>Description</label>
                                <input type="text" 
                                    name="description" 
                                    defaultValue={event.Description__c}
                                    className="form-control form-control-line" 
                                    placeholder="Enter Description" 
                                    onChange={(e) => {
                                        const target = e.target;
                                        const value = target.value;
                                        event.Description__c = value;
                                        setEvent(event);
                                       
                                    }}
                                /> </div>
                            <div className="form-group">
                                <label>Contact Email <span className="help"> e.g. "example@gmail.com"</span></label>
                                <input type="email" 
                                id="example-email2" 
                                name="email" 
                                defaultValue={event.Organizer_Email__c}
                                className="form-control" 
                                placeholder="Enter Email" 
                                onChange={(e) => {
                                    const target = e.target;
                                    const value = target.value;
                                    event.Organizer_Email__c = value;
                                    setEvent(event);
                                   
                                }}
                                /></div>
                            <div className="form-group">
                                <label>Street Address</label>
                                <input type="text" 
                                name="streetAddress"
                                defaultValue={event.Street_Address__c}
                                className="form-control" 
                                placeholder="Street Address" 
                                onChange={(e) => {
                                    const target = e.target;
                                    const value = target.value;
                                    event.Street_Address__c = value;
                                    setEvent(event);
                                   
                                }}
                                /> </div>
                            <div className="form-group">
                                <label>City</label>
                                <input type="text" 
                                name="city"
                                defaultValue={event.City__c}
                                className="form-control" 
                                placeholder="City Name" 
                                onChange={(e) => {
                                    const target = e.target;
                                    const value = target.value;
                                    event.City__c = value;
                                    setEvent(event);
                                }}
                                />  </div>
                            <div className="form-group">
                                <label>State</label>
                                <input type="text" 
                                name="state"
                                defaultValue={event.State__c}
                                className="form-control" 
                                placeholder="State Name" 
                                onChange={(e) => {
                                    const target = e.target;
                                    const value = target.value;
                                    event.State__c = value;
                                    setEvent(event);
                                }}
                                /> </div>
                            <div className="form-group">
                                <label>Date <span className="help"> e.g. "1/11/24"</span> </label>
                                <input type="text" 
                                name="date"
                                defaultValue={event.Date__c}
                                className="form-control" 
                                placeholder="Date" 
                                onChange={(e) => {
                                    const target = e.target;
                                    const value = target.value;
                                    event.Date__c = value;
                                    setEvent(event);
                                }}
                                />  </div>
                            <div className="form-group">
                                <label>Time <span className="help"> e.g. "2:00 PM"</span></label>
                                <input type="text" 
                                name="time"
                                defaultValue={event.Time__c}
                                className="form-control" 
                                placeholder="Time" 
                                onChange={(e) => {
                                    const target = e.target;
                                    const value = target.value;
                                    event.Time__c = value;
                                    setEvent(event);
                                }}
                                />   
                                <button type="submit" className="btn btn-success waves-effect waves-light m-r-10" 
                                    onClick={(e) => { 
                                        saveChanges(e);
                                        }}>Save Changes</button>
                                <button type="submit" className="btn btn-primary waves-effect waves-light m-r-10" 
                                    onClick={(e) => { 
                                        deleteEvent(e);
                                        }}>Delete</button>
                                </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    }
}
export default EditEvent;