import React from 'react';
import { Outlet } from 'react-router-dom';
import ColNav from './ColNav';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion"


const Layout = () => {

  const dummyLogs = [
  { id: 1, message: 'User logged in successfully', timestamp: '2025-05-13 19:45:32' },
  { id: 2, message: 'API request failed: Invalid token', timestamp: '2025-05-13 19:46:10' },
  { id: 3, message: 'Database connection established', timestamp: '2025-05-13 19:46:45' },
  { id: 3, message: 'Database connection established', timestamp: '2025-05-13 19:46:45' },
  { id: 3, message: 'Database connection established', timestamp: '2025-05-13 19:46:45' },
  { id: 3, message: 'Database connection established', timestamp: '2025-05-13 19:46:45' },
  { id: 3, message: 'Database connection established', timestamp: '2025-05-13 19:46:45' },



 
];


  return (
    <div className="bg-blue-300/15 text-black h-screen w-screen overflow-hidden flex flex-row">
      {/* Fixed Navigation Bar */}
      <ColNav />
      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        <div className="flex flex-col flex-1 h-screen py-6 max-xs:pt-14 overflow-auto">
          <Outlet />
        </div>
<Accordion type="single" collapsible className='bg-gray-300 rounded-md '>
  <AccordionItem value="item-1">
    <AccordionTrigger className=" text-black px-3">Active LOGS(press here)</AccordionTrigger>
    <AccordionContent className=" text-black px-3 overflow-scroll h-44 scrollbar-hide">
      <ul >
        {dummyLogs.map((log) => (
          <li key={log.id}>[{log.timestamp}] {log.message}</li> // Adjust based on your data structure
        ))}
      </ul>
    </AccordionContent>
  </AccordionItem>
</Accordion>
      </div>
    </div>
  );
};

export default Layout;