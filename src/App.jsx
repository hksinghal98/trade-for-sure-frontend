import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import LoginPage from './components/login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';

import OrderStatus from './components/OrderStatus'; // New Component
import OrderPunch from './components/OrderPunch'; // New Component
import AddBroker from './components/AddBroker';
import ViewBroker from './components/ViewBroker';
import Marketwatch from './components/Marketwatch';
import Angel from './components/Angelbroker';

function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<LoginPage />} />
          
          {/* Protected Routes with Layout */}
          <Route element={<Layout />}>
            <Route path="/home" element={<Marketwatch />} />
            
            {/* Add more protected routes here */}

            <Route path="/Instrument" element={<Dashboard />} />
            
              <Route path="/OrderStatus" element={<OrderStatus />} />
              <Route path="/OrderPunch" element={<OrderPunch />} />
            
            {/* <Route path="/Settings" element={<AddBroker />} /> */}
            <Route path="/ViewBroker" element={<ViewBroker defaultBrokerName="Shoonya" />} />
            <Route path="/ViewAngel" element={<Angel />} />
          </Route>
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;