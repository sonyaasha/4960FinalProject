import React, {useState, useEffect}  from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { _ACCESS_TOKEN } from '../shared/constants'
const Event = () => { 
    const { eventId } = useParams(); 
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [event, setEvent] = useState([]); 
    useEffect(() => {
        fetch("http://localhost:8082/sobjects/MyEvent__c/" + eventId, 
        {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${_ACCESS_TOKEN}`, 
            }
        })
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data);
                    setEvent(data);
                    setIsLoaded(true);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [eventId])
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    if (!isLoaded) {
        return <div>Loading...</div>;
    }  
    
    if (event) {
        return (
            <>
            <div className="container-fluid">
               <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h3 className="text-themecolor">{event.Name}</h3>
                </div>
                <div className="col-md-7 align-self-center">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={`/eventList`}>{`Event List`}</Link> </li>
                        <li className="breadcrumb-item active">{event.Name}</li>
                    </ol>
                </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        {event.Date__c} at {event.Time__c}
                    </div>
                    <div className="card-body">
                        <h4 className="card-title">{event.Name}</h4>
                        <p className="card-text">{event.Description__c}</p>
                        <p className="card-text">{event.Organizer_Email__c}</p>
                    </div>
                    <div className="card-footer text-muted">
                        Join us here {event.Street_Address__c}, {event.City__c}, {event.State__c}
                    </div>
                </div>
                    <Link className="btn btn-primary" to={`/editEvent/${eventId}`}>{`Edit ${event.Name}`}</Link> 
            </div>
            </>
        );
    }
}
export default Event;