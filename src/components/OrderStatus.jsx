import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../components/ui/select"

import { Button } from "../components/ui/button";
import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const OrderStatus = () => {
      const [loading,setLoading]= useState('')
      const [tableDatafetch, setTableDatafetch] = useState([]);
    const [brokerName4, setBrokerName4] = React.useState(null);
    const [exchange, setExchange] = React.useState(null);
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }




    
      const handleSelectIndex = (value) => {
         if (value === "Complete") {
      // fetchSymbols(brokerName4, value)
        setExchange(value)


    }
  }
  return (
    <>
     <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Order Book" className='text-white' {...a11yProps(0)} />
          <Tab label="Open Position"className='text-white' {...a11yProps(1)} />
          <Tab label="Close Position"className='text-white' {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Order Book
        {/* Render the Select component only when the "Order Book" tab is selected */}
        <div className='flex flex-wrap items-center justify-around gap-4'>
          {value === 0 && (
            <Select onValueChange={(value) => handleSelectIndex(value)}>
              <SelectTrigger className="w-40 max-xs:w-20 bg-blue-800 text-white hover:bg-blue-700">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-blue-300">
                <SelectItem
                  value="Complete"
                  className="hover:bg-blue-100 hover:text-blue-800 focus:bg-blue-200"
                >
                  Complete
                </SelectItem>
                <SelectItem
                  value="NFO"
                  className="hover:bg-blue-100 hover:text-blue-800 focus:bg-blue-200"
                >
                  Reject
                </SelectItem>
                <SelectItem
                  value="Open"
                  className="hover:bg-blue-100 hover:text-blue-800 focus:bg-blue-200"
                >
                  Open
                </SelectItem>
                <SelectItem
                  value="Cancelled"
                  className="hover:bg-blue-100 hover:text-blue-800 focus:bg-blue-200"
                >
                  Cancelled
                </SelectItem>
              </SelectContent>
            </Select>
          )}
          <div className="overflow-x-auto h-72 w-full rounded-lg">
  {loading ? (
    <p className="text-center text-white">Loading...</p> // Loading message
  ) : tableDatafetch.length === 0 ? (
    <table className="table-auto border-collapse border text-gray-400 border-gray-300 w-full overflow-hidden">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 px-4 py-2 text-gray-700">Column 1</th>
          <th className="border border-gray-300 px-4 py-2 text-gray-700">Column 2</th>
          <th className="border border-gray-300 px-4 py-2 text-gray-700">Column 3</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, index) => (
          <tr key={index} className="text-center">
            <td className="border border-gray-300 px-4 py-2 text-gray-400">-</td>
            <td className="border border-gray-300 px-4 py-2 text-gray-400">-</td>
            <td className="border border-gray-300 px-4 py-2 text-gray-400">-</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <table className="table-auto border-collapse border border-gray-300 w-full overflow-hidden">
      <thead>
        <tr className="bg-gray-200">
          {Object.keys(tableDatafetch[0]).map((key) => (
            <th key={key} className="border border-gray-300 px-4 py-2">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableDatafetch.map((row) => (
          <tr key={row.id} className="text-center">
            {Object.values(row).map((value, index) => (
              <td key={index} className="border border-white-300 text-gray-400 px-4 py-2">
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Open Position
        {/* Render the Select component only when the "Open Position" tab is selected */}

      <div className="overflow-x-auto h-72 w-full rounded-lg">
  {loading ? (
    <p className="text-center text-white">Loading...</p> // Loading message
  ) : tableDatafetch.length === 0 ? (
    <table className="table-auto border-collapse border text-gray-400 border-gray-300 w-full overflow-hidden">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 px-4 py-2 text-gray-700">Column 1</th>
          <th className="border border-gray-300 px-4 py-2 text-gray-700">Column 2</th>
          <th className="border border-gray-300 px-4 py-2 text-gray-700">Column 3</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, index) => (
          <tr key={index} className="text-center">
            <td className="border border-gray-300 px-4 py-2 text-gray-400">-</td>
            <td className="border border-gray-300 px-4 py-2 text-gray-400">-</td>
            <td className="border border-gray-300 px-4 py-2 text-gray-400">-</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <table className="table-auto border-collapse border border-gray-300 w-full overflow-hidden">
      <thead>
        <tr className="bg-gray-200">
          {Object.keys(tableDatafetch[0]).map((key) => (
            <th key={key} className="border border-gray-300 px-4 py-2">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableDatafetch.map((row) => (
          <tr key={row.id} className="text-center">
            {Object.values(row).map((value, index) => (
              <td key={index} className="border border-white-300 text-gray-400 px-4 py-2">
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
    
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Close Position

        <div className="overflow-x-auto h-72 w-full rounded-lg">
  {loading ? (
    <p className="text-center text-white">Loading...</p> // Loading message
  ) : tableDatafetch.length === 0 ? (
    <table className="table-auto border-collapse border text-gray-400 border-gray-300 w-full overflow-hidden">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 px-4 py-2 text-gray-700">Column 1</th>
          <th className="border border-gray-300 px-4 py-2 text-gray-700">Column 2</th>
          <th className="border border-gray-300 px-4 py-2 text-gray-700">Column 3</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, index) => (
          <tr key={index} className="text-center">
            <td className="border border-gray-300 px-4 py-2 text-gray-400">-</td>
            <td className="border border-gray-300 px-4 py-2 text-gray-400">-</td>
            <td className="border border-gray-300 px-4 py-2 text-gray-400">-</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <table className="table-auto border-collapse border border-gray-300 w-full overflow-hidden">
      <thead>
        <tr className="bg-gray-200">
          {Object.keys(tableDatafetch[0]).map((key) => (
            <th key={key} className="border border-gray-300 px-4 py-2">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableDatafetch.map((row) => (
          <tr key={row.id} className="text-center">
            {Object.values(row).map((value, index) => (
              <td key={index} className="border border-white-300 text-gray-400 px-4 py-2">
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>
      </CustomTabPanel>
    </Box>
    </>
  )
}

export default OrderStatus