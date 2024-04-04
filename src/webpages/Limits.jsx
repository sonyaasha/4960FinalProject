import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { _ACCESS_TOKEN } from '../shared/constants'
const Limits = () => { 
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8082/limits", 
        { 
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${_ACCESS_TOKEN}`, 
            }
        }) 
            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data)
                    setIsLoaded(true);
                    setUsers(data);
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
                <h1>Limits</h1>
                <Link to={`/`}>{`Home`}</Link>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            <Link to={`/user/${user.id}`}>{user.name}</Link>
                        </li>
                    ))}
                </ul>
            </>
        );
    }
}
export default Limits;