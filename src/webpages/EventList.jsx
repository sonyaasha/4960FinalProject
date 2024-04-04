import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { _ACCESS_TOKEN } from '../shared/constants'
const EventList = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [events, setEvents] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8082/queryAll/?q=SELECT+Name%2CDate__c%2CCity__c%2CState__c+from+MyEvent__c+WHERE+IsDeleted+%3D+false",  
        { 
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${_ACCESS_TOKEN}`, 
            }
        })
            .then(res => res.json())
            .then(
                (data) => {
                    // const {records, done, totalSize } = data;
                    const {records} = data;
                    setIsLoaded(true);
                    setEvents(records);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
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
                    <h3 className="text-themecolor">Event List</h3>
                </div>
                <div className="col-md-7 align-self-center">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to={`/`}>{`Home`}</Link></li>
                        <li className="breadcrumb-item active">Event List</li>
                    </ol>
                </div>
                </div>

                <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Event Name</th>
                                                <th>City</th>
                                                <th>State</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        
                                {events.map((event, idx) => {
                                    const {url} = event.attributes? event.attributes: {};
                                    const eventId = url.split("/").pop();
                                    return (
                                        <tr key={idx}>
                                            <td><Link to={`/event/${eventId}`}>{event.Name}</Link></td>
                                            <td>{event.City__c}</td>
                                            <td>{event.State__c}</td>
                                            <td><span className="text-muted"><i className="fa fa-clock-o"></i> {event.Date__c}</span> </td>
                                        </tr>
                                    )
                                    }
                                )}
                                
                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            </div>
                
            </>
        );
    }
}
export default EventList;