import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import './Adminfarmerdetails.css'; // Import CSS for styling

function Adminfarmerdetails() {
    const [farmers, setFarmers] = useState([]);

    useEffect(() => {
        async function fetchFarmers() {
            try {
                const response = await axios.get('http://localhost:6900/api/sathish/farmer');
                setFarmers(response.data);
                console.log('Fetched Farmers Data:', response.data);
            } catch (error) {
                console.error('Error fetching farmers:', error);
            }
        }

        fetchFarmers();
    }, []);

    return (
        <div>
            <AdminNavbar/>
            <div className="table-container">
            <br/>
                <h2 style={{textAlign:'center'}}>FARMER DETAILS</h2>
                <br/>
                <br/>
               
                <table className="farmer-table">
                    <thead>
                        <tr>
                            <th><strong>PROFILE IMAGE</strong></th>
                            <th><strong>NAME</strong></th>
                            <th><strong>CITY</strong></th>
                            <th><strong>PHONE NUMBER</strong></th>
                            <th><strong>EMAIL ID</strong></th>
                            <th><strong>PASSWORD</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                        {farmers.map(farmer => (
                            <tr key={farmer.id}>
                                <td>
                                    {farmer.image && (
                                        <img src={`data:image/jpeg;base64,${farmer.image}`} alt="Farmer" className="profile-image" />
                                    )}
                                </td>
                                <td>{farmer.name}</td>
                                <td>{farmer.city}</td>
                                <td>{farmer.phonenum}</td>
                                <td>{farmer.emailid}</td>
                                <td>{farmer.password}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Adminfarmerdetails;
