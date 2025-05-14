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

const ViewBroker = ({ defaultBrokerName = "Shoonya" }) => {
  const [brokerName, setBrokerName] = useState(defaultBrokerName); // Set default broker name
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [vendorCode, setVendorCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [tableDatafetch, setTableDatafetch] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Dummy data for testing
    const dummyData = [
      {
        brokerId: 1,
        brokerName: `${defaultBrokerName} A`,
        apiKey: "API_KEY_A",
        apiSecret: "API_SECRET_A",
        authToken: "AUTH_TOKEN_A",
        vendorCode: "VENDOR_A",
        accountNumber: "123456",
        password: "passwordA",
      },
      {
        brokerId: 2,
        brokerName: `${defaultBrokerName} B`,
        apiKey: "API_KEY_B",
        apiSecret: "API_SECRET_B",
        authToken: "AUTH_TOKEN_B",
        vendorCode: "VENDOR_B",
        accountNumber: "654321",
        password: "passwordB",
      },
    ];

    setTableDatafetch(dummyData);
    setLoading(false);
  }, [defaultBrokerName]);

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
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md max-w-7xl">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Add {defaultBrokerName} Broker</h1>
      <form className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Label htmlFor="broker-name" className="w-1/3 text-lg text-gray-700">
            Broker Name
          </Label>
          <Input
            id="broker-name"
            type="text"
            value={brokerName}
            readOnly
            className="w-2/3 p-2 border border-gray-300 rounded-md bg-gray-200 pointer-events-none"
          />
        </div>
        {/* Other input fields */}
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

      <div className="container mx-auto mt-6 p-6 bg-gray-100 rounded-lg shadow-md max-w-6xl">
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-center text-gray-700">Loading...</p>
          ) : tableDatafetch.length === 0 ? (
            <p className="text-center text-gray-700">No data available</p>
          ) : (
            <table className="min-w-full table-auto">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {Object.keys(tableDatafetch[0]).map((key) => (
                    <th key={key} className="px-6 py-3">
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
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    {Object.values(row).map((value, idx) => (
                      <td key={idx} className="px-6 py-4">
                        {value}
                      </td>
                       ))}
                    <td className="px-6 py-4 text-center">
                      <Button
                        className="bg-blue-600 text-white py-2 text-sm rounded-md hover:bg-blue-700"
                        onClick={() => handleActive(index)}
                      >
                        Active
                      </Button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button
                        className="bg-blue-600 text-white py-2 text-sm rounded-md hover:bg-blue-700"
                        onClick={() => handleLogin(index)}
                      >
                        Login
                      </Button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button
                        className="bg-blue-600 text-white py-2 text-sm rounded-md hover:bg-blue-700"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </Button>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button
                        className="bg-blue-600 text-white py-2 text-sm rounded-md hover:bg-blue-700"
                        onClick={() => handleDelete(index)}
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
    </div>
  );
};

export default ViewBroker;