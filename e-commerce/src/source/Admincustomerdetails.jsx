import React, { useEffect, useState } from 'react';
import { Table, Container } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';

function Admincustomerdetails() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:6900/api/sathish/customer')
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error fetching customer data:', error));
  }, []);

  return (
    <div>
      <AdminNavbar />
      <Container fluid>
        <h1 className="mt-4" style={{textAlign:'center'}}><strong>CUSTOMER DETAILS</strong></h1>
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>EMAIL ID </th>
              <th>PASSWORD</th>
              <th>PHONE NUMBER</th>
              {/* Add more columns as per your data structure */}
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.emailid}</td>
                <td>{customer.password}</td>
                <td>{customer.phonenum}</td>
                {/* Add more cells as per your data structure */}
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Admincustomerdetails;
