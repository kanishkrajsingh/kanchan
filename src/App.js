// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddCustomer from './AddCustomer';
import ViewCustomers from './ViewCustomers'; // You'll need to create this component
import Orders from './Orders'; // You'll need to create this component

const Home = () => (
  <div className="container text-center mt-5">
    <h1>Welcome to Kanchan</h1>
    <Link to="/add-customer">
      <button className="btn btn-primary m-2">Add Customers</button>
    </Link>
    <Link to="/view-customers">
      <button className="btn btn-primary m-2">View Customers</button>
    </Link>
    <Link to="/orders">
      <button className="btn btn-primary m-2">Orders</button>
    </Link>
  </div>
);


    
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-customer" element={<AddCustomer />} />
      <Route path="/view-customers" element={<ViewCustomers />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  </Router>
);

export default App;
