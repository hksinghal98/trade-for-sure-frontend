
import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../components/ui/select"


 import {handleexchangerequest}  from '../utility/Api'
const ViewBroker = () => {
  const [brokerName, setBrokerName] = useState('SHOONYA');
  const [apikey, setapikey] = useState("");
  const [secretkey, setsecretkey] = useState("");
  const [AuthToken, setAuthToken] = useState("");
  const [vendorcode, setvendorcode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [brokerName1, setBrokerName1] = useState("");
  const [brokers, setBrokers] = useState([])
  const [loading,setLoading]= useState('')
  const [tableDatafetch, setTableDatafetch] = useState([]);
  
    useEffect(() => {
      // Dummy data for testing
      const dummyData = [
        {
          brokerName: "Broker A",
          apikey: "API_KEY_A",
          secretkey: "API_SECRET_A",
          AuthToken: "AUTH_TOKEN_A",
          vendorcode: "VENDOR_A",
          accountNumber: "123456",
          password: "passwordA",
        },
        {
          brokerName: "Broker B",
          apikey: "API_KEY_B",
          secretkey: "API_SECRET_B",
          AuthToken: "AUTH_TOKEN_B",
          vendorcode: "VENDOR_B",
          accountNumber: "654321",
          password: "passwordB",
        },
        {
          brokerName: "Broker C",
          apikey: "API_KEY_C",
          secretkey: "API_SECRET_C",
          AuthToken: "AUTH_TOKEN_C",
          vendorcode: "VENDOR_C",
          accountNumber: "789012",
          password: "passwordC",
        },
      ];
  
      // Set dummy data to tableDatafetch
      setTableDatafetch(dummyData);
      setLoading(false); // Set loading to false since data is already loaded
    }, []);
  
  
  
  

  

  const handleAddBroker = () => {
    const payload = JSON.stringify({
      brokerName,
      apikey,
      secretkey,
      AuthToken,
      vendorcode,
      accountNumber,
      password,
    });
    
      const type = "POST"
        const endpoint= "broker"
        handleexchangerequest(type, payload, endpoint,true)
    .then(response => {
    console.log(response) 
    
    window.location.reload()
    })
  






  
 
    // Add API call logic here to save the broker details
  };
const handlelogin = async (brokerid) => {
        const payload = JSON.stringify({brokerid });
        const type = "POST"
        const endpoint= "loginbroker"
        handleexchangerequest(type, payload, endpoint,true)
    .then(response => {
    console.log(response) 
    
    window.location.reload()
    })
  }


  
  

   const handleadelete=(brokerid)=>{

     const payload = JSON.stringify({brokerid });
        const type = "DELETE"
        const endpoint= "broker"
        handleexchangerequest(type, payload, endpoint,true)
    .then(response => {
    console.log(response) 
    
    window.location.reload()
    })

  }
  const handleactivebroker=(brokerid)=>{

     const payload = JSON.stringify({brokerid });
        const type = "PUT"
        const endpoint= "broker"
        handleexchangerequest(type, payload, endpoint,true)
    .then(response => {
    console.log(response) 
    
    window.location.reload()
    })

  }


  const handleOpen = (rowIndex) => {
    const row = tableDatafetch[rowIndex];
    setSelectedRow(rowIndex);
    setBrokerName(row.brokerName || "");
    setapikey(row.apikey || "");
    setsecretkey(row.secretkey || "");
    setAuthToken(row.AuthToken || "");
    setvendorcode(row.vendorcode || "");
    setAccountNumber(row.accountNumber || "");
    setPassword(row.password || "");
    setIsOpen(true);
  };

 

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Add Broker</h1>
      <form className="flex flex-col gap-4">
         <div className="flex items-center gap-4">
                      <Label htmlFor="broker-name" className="w-1/3 text-lg text-gray-700">
                        Broker Name
                      </Label>
                      <Input
            id="vendor-code"
            type="text"
            
            placeholder="Enter Vendor Code"
            value={"SHOONYA"}
            className="w-2/3 p-2 border border-gray-300 rounded-md pointer-events-none"
          />
                    </div>
                                  
        {/* API Key */}
        <div className="flex items-center gap-4">
          <Label htmlFor="api-key" className="w-1/3 text-lg text-gray-700">
            API Key
          </Label>
          <Input
            id="api-key"
            type="text"
            placeholder="Enter API key"
            value={apikey}
            onChange={(e) => setapikey(e.target.value)}
            className="w-2/3 p-2 border border-gray-300 rounded-md"
          />
        </div>


        {/* Auth Token */}
        <div className="flex items-center gap-4">
          <Label htmlFor="auth-token" className="w-1/3 text-lg text-gray-700">
            Auth Token
          </Label>
          <Input
            id="auth-token"
            type="text"
            placeholder="Enter Auth Token"
            value={AuthToken}
            onChange={(e) => setAuthToken(e.target.value)}
            className="w-2/3 p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Vendor Code */}
        <div className="flex items-center gap-4">
          <Label htmlFor="vendor-code" className="w-1/3 text-lg text-gray-700">
            Vendor Code
          </Label>
          <Input
            id="vendor-code"
            type="text"
            placeholder="Enter Vendor Code"
            value={vendorcode}
            onChange={(e) => setvendorcode(e.target.value)}
            className="w-2/3 p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Account Number */}
        <div className="flex items-center gap-4">
          <Label htmlFor="account-number" className="w-1/3 text-lg text-gray-700">
            Account Number
          </Label>
          <Input
            id="account-number"
            type="text"
            placeholder="Enter Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-2/3 p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Password */}
        <div className="flex items-center gap-4">
          <Label htmlFor="password" className="w-1/3 text-lg text-gray-700">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-2/3 p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={()=>handleAddBroker()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Broker
          </Button>
        </div>
      </form>

      <div className="overflow-x-auto h-72 w-full rounded-lg">
                {loading ? (
                  <p className="text-center text-white">Loading...</p>
                ) : tableDatafetch.length === 0 ? (
                  <p className="text-center text-white">No data available</p>
                ) : (
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        {tableDatafetch[0] &&
                          Object.keys(tableDatafetch[0]).map((key) => (
                            <th key={key} scope="col" className="px-6 py-3">
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </th>
                          ))}
                        <th className="px-6 py-3">Active</th>

                        <th className="px-6 py-3">Login</th>
                          
                        <th className="px-6 py-3">Edit</th>
                        <th className="px-6 py-3">Delete</th>

                      </tr>
                    </thead>
                    <tbody>
                      {tableDatafetch.map((row, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                          {Object.values(row).map((value, idx) => (
                            <td key={idx} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {value}
                            </td>
                          ))}
                          <td className="px-6 py-2 text-center">
                            <Button
                              className="bg-blue-600 text-white py-2 text-sm rounded-md hover:bg-blue-700"
                              onClick={() => handleOpen(index)}
                            >
                              Active
                            </Button>
                          </td>
                          <td className="px-6 py-2 text-center">
                            <Button
                              className="bg-blue-600 text-white py-2 text-sm rounded-md hover:bg-blue-700"
                              onClick={() => handleOpen(index)}
                            >
                              Login
                            </Button>
                          </td>
                          <td className="px-6 py-2 text-center">
                            <Button
                              className="bg-blue-600 text-white py-2 text-sm rounded-md hover:bg-blue-700"
                              onClick={() => handleOpen(index)}
                            >
                              Edit
                            </Button>
                          </td>
                          <td className="px-6 py-2 text-center">
                            <Button
                              className="bg-blue-600 text-white py-2 text-sm rounded-md hover:bg-blue-700"
                              onClick={() => handleOpen(index)}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
    </div>
  );
};

export default ViewBroker;