
import './App.css';
import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerVoucherForm from './components/CustomerVoucherForm';
import AddCustomer from './components/AddCustomer'; // ✅ الاسم الصحيح هنا

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/addcustomer" element={<AddCustomer />} /> {/* ✅ مسار معدل */}
        <Route path="/vouchers" element={<CustomerVoucherForm />} />
        <Route path="/" element={<CustomerVoucherForm />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
