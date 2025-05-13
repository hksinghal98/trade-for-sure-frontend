import React from 'react'
import { useState } from 'react';

const AddBroker = () => {

      const [tableDatafetch, setTableDatafetch] = useState([]);
      const [loading, setLoading] = useState(true);

      const handleorders= async (x) => {
           
              const type = "GET"
              const endpoint= "position"
              const payload= "type="+x
              handleexchangerequest(type, payload, endpoint,true)
              .then(response => {
                console.log(response) 
              setTableDatafetch(response);
          // alert("Data fetched successfully!");
          })
       };
  return (
    <>
    <div className="overflow-x-auto h-72 w-full  rounded-lg">
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
</>
  )
}

export default AddBroker