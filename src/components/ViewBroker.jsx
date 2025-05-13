import React, { useState } from "react";
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

const ViewBroker = () => {
  const [brokerName, setBrokerName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [vendorCode, setVendorCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [brokerName1, setBrokerName1] = useState("");
  const [brokers, setBrokers] = useState([])
      const [loading,setLoading]= useState('')
  
  
  

  const handleAddBroker = () => {
    const payload = {
      brokerName,
      apiKey,
      apiSecret,
      authToken,
      vendorCode,
      accountNumber,
      password,
    };

    console.log("Broker Details Submitted:", payload);
    alert("Broker added successfully!");
    // Add API call logic here to save the broker details
  };

  const fetchBrokers = async () => {
          try {
        const response = await handleexchangerequest("GET", 'Broker=all', "symbols",false); // Replace with your API endpoint
        if (response) {
          setBrokers(response); // Assuming response.data contains the broker list
        } else {
          console.error("Failed to fetch brokers");
        }
      } catch (error) {
        console.error("Error fetching brokers:", error);
      }
    };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Add Broker</h1>
      <form className="flex flex-col gap-4">
         <div className="flex items-center gap-4">
                      <Label htmlFor="broker-name" className="w-1/3 text-lg text-gray-700">
                        Select Broker
                      </Label>
    <Select onValueChange={(value) => setBrokerName1(value)}>
                                <SelectTrigger className="w-2/3 max-xs:w-20 bg-white  hover:bg-gray-300">
                                  <SelectValue placeholder="Broker" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border border-blue-300">
                                  {brokers && brokers.length > 0 ? (
                                    brokers.map((broker, index) => (
                                      <SelectItem
                                        key={index}
                                        value={broker.NAME}
                                        className="hover:bg-blue-100 hover:text-blue-800 focus:bg-blue-200"
                                      >
                                        {broker.NAME}
                                      </SelectItem>
                                    ))
                                  ) : (
                                    <SelectItem value="loading" disabled>
                                      {loading ? "Loading brokers..." : "No brokers available"}
                                    </SelectItem>
                                  )}
                                  
                                </SelectContent>
                              </Select>
                    </div>
        {/* Broker Name */}
        <div className="flex items-center gap-4">
          <Label htmlFor="broker-name" className="w-1/3 text-lg text-gray-700">
            Broker Name
          </Label>
          <Input
            id="broker-name"
            type="text"
            placeholder="Enter broker name"
            value={brokerName}
            onChange={(e) => setBrokerName(e.target.value)}
            className="w-2/3 p-2 border border-gray-300 rounded-md"
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
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-2/3 p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* API Secret */}
        <div className="flex items-center gap-4">
          <Label htmlFor="api-secret" className="w-1/3 text-lg text-gray-700">
            API Secret
          </Label>
          <Input
            id="api-secret"
            type="password"
            placeholder="Enter API secret"
            value={apiSecret}
            onChange={(e) => setApiSecret(e.target.value)}
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
            value={authToken}
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
            value={vendorCode}
            onChange={(e) => setVendorCode(e.target.value)}
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
            onClick={handleAddBroker}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Broker
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ViewBroker;