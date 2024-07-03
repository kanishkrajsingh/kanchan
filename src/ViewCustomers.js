import React, { useEffect, useState } from 'react';
import {  Container, Row, Col } from 'react-bootstrap';

const ViewCustomers = () => {
  // State to store fetched customers
  const [customers, setCustomers] = useState([]);
  // State to store search input value
  const [searchInput, setSearchInput] = useState('');
  // State to store filtered customers
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  // State to manage current page of pagination
  const [currentPage, setCurrentPage] = useState(1);
  // State to manage entries per page
  const [entriesPerPage, setEntriesPerPage] = useState(25); // Default entries per page

  useEffect(() => {
    // Fetching customers from API on component mount
    fetch('http://localhost:3001/api/customers')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCustomers(data);
        setFilteredCustomers(data);
      })
      .catch((error) => console.error('Error fetching customers:', error));
  }, []);

  // Function to handle search input change
  const handleSearchInputChange = (e) => {
    const input = e.target.value.toLowerCase();
    setSearchInput(input);

    // Filtering customers based on search input
    const filtered = customers.filter((customer) =>
      customer.first_name.toLowerCase().includes(input) ||
      customer.last_name.toLowerCase().includes(input) ||
      customer.address.toLowerCase().includes(input) ||
      customer.phone_no.toLowerCase().includes(input)
    );
    setFilteredCustomers(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Pagination logic
  const indexOfLastCustomer = currentPage * entriesPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - entriesPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredCustomers.length / entriesPerPage);

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to handle changing entries per page
  const handleEntriesPerPageChange = (e) => {
    const newEntriesPerPage = parseInt(e.target.value, 10);
    setEntriesPerPage(newEntriesPerPage);
    setCurrentPage(1); // Reset to first page when changing entries per page
  };

  return (
    <div className="container mt-5">
      <h2>Customers List</h2>
      {customers.length === 0 ? (
        <p>No customers found</p>
      ) : (
        <div>
          {/* Search input field */}
          <Container className="mt-5">
          <Row>
          <Col md={10}>
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={handleSearchInputChange}
            className="form-control mb-3"
          />
          </Col>
          <Col md={2}>
          {/* Dropdown for entries per page */}
          <div className="mb-3">
           
            <select value={entriesPerPage} onChange={handleEntriesPerPageChange} className="form-select mx-2">
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="75">75</option>
              <option value="100">100</option>
            </select>
          </div>
          </Col>
                  </Row>
          </Container>

          {/* Table to display customers */}
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Phone No</th>
                <th>Alternate No</th>
                <th>Advance Amount</th>
                <th>Lat/Long</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapping through current customers to display in table */}
              {currentCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.first_name}</td>
                  <td>{customer.last_name}</td>
                  <td>{customer.address}</td>
                  <td>{customer.phone_no}</td>
                  <td>{customer.alternate_no}</td>
                  <td>{customer.advance_amount}</td>
                  <td>{customer.lat_long}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination controls */}
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button onClick={() => paginate(index + 1)} className="page-link">
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewCustomers;
