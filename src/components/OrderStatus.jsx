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

const OrderStatus = () => {
    const [brokerName4, setBrokerName4] = React.useState(null);
    const [exchange, setExchange] = React.useState(null);



    
      const handleSelectIndex = (value) => {
         if (value === "Complete") {
      // fetchSymbols(brokerName4, value)
        setExchange(value)


    }
  }
  return (
    <>
    <div className=' flex flex-wrap items-center justify-around gap-4'>
     <Select
           onValueChange= {(value) => handleSelectIndex(value)}

         >
           <SelectTrigger className="w-40 max-xs:w-20 bg-blue-800 text-white hover:bg-blue-700">
             <SelectValue placeholder=" Select Status" />
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

         <Button>Open Position</Button>
         <Button>Close Position</Button>
        
        </div>
        </>
  )
}

export default OrderStatus