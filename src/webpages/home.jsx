import React from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
return(

        <div className="container-fluid">
               <div className="row page-titles">
                    <div className="col-md-5 align-self-center">
                    <h3 className="text-themecolor">Home</h3>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-12 m-t-30">
                        <h4 className="m-b-0">Welcome to the Event.CO App</h4>
                        <p className="text-muted m-t-0 font-12">Using this app you're able to view current events as well as create your own!</p>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">View Event List</h3>
                                <p className="card-text">By clicking below you can view all the available events within our app.</p>
                                <Link className="btn btn-success" to={`/eventList`}>{`Events List`}</Link> 
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h3 className="card-title">Create Your Own Event</h3>
                                <p className="card-text">Enter the details of your event to save it in our database.</p>
                                <Link className="btn btn-primary" to={`/createEvent`}>{`Create New Event`}</Link> 
                            </div>
                        </div>
                    </div>
                </div>

               
        </div>
    );
}
export default Home;