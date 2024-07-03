// src/AddCustomer.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const AddCustomer = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [alternateNo, setAlternateNo] = useState('');
  const [advanceAmount, setAdvanceAmount] = useState('');
  const [latLong, setLatLong] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          address,
          phoneNo,
          alternateNo,
          advanceAmount,
          latLong,
        }),
      });
      const data = await response.json();
      console.log('Customer added:', data);
      // Clear form fields after successful submission
      setFirstName('');
      setLastName('');
      setAddress('');
      setPhoneNo('');
      setAlternateNo('');
      setAdvanceAmount('');
      setLatLong('');
      // Handle success, show success message
      alert(`Customer added successfully:\nID: ${data.id}\nFirst Name: ${data.firstName}\nLast Name: ${data.lastName}`);
      navigate('/'); // Redirect to home page after successful submission
    } catch (error) {
      console.error('Error adding customer:', error);
      // Handle error, show error message
      alert('Failed to add customer. Please try again.');
    }
  };

 
  return (
    <Container className="mt-5">
      <h2>Add Customer</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name *</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name *</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address *</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="phoneNo">
              <Form.Label>Phone No *</Form.Label>
              <Form.Control
                type="text"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="alternateNo">
              <Form.Label>Alternate No</Form.Label>
              <Form.Control
                type="text"
                value={alternateNo}
                onChange={(e) => setAlternateNo(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="advanceAmount">
              <Form.Label>Advance Amount *</Form.Label>
              <Form.Control
                type="text"
                value={advanceAmount}
                onChange={(e) => setAdvanceAmount(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="latLong">
              <Form.Label>Lat Long</Form.Label>
              <Form.Control
                type="text"
                value={latLong}
                onChange={(e) => setLatLong(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </Container>
  );
};

export default AddCustomer;