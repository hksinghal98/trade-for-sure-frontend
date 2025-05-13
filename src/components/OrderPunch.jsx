import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../components/ui/select"

import { Label } from '../components/ui/label';
import { Input } from './ui/input';
import { handleexchangerequest } from "../utility/Api";
import { Check, ChevronsUpDown } from "lucide-react"
import { FixedSizeList } from "react-window"; 

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../components/ui/command"

// import addbrokerbox from './addbrokerbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "../components/ui/dialog";
import { useNavigate } from "react-router-dom";
  
import debounce from "lodash.debounce";







     

const OrderPunch = () => {

    
    const [placeorderopen, setPlaceOrderOpen] = useState(false)
    const [dialogTheme, setDialogTheme] = useState("")
    const [brokerName4, setBrokerName4] = useState(""); 
    const [loading,setLoading]= useState('')
    const [Comboopen, setComboOpen] = useState(false)
    const [selectsymbol,setselectsymbol]=useState('')
    const [Symbol,setsymbol]= useState([])
    const [brokers, setBrokers] = useState([])
    const [ordertype, setOrdertype] = useState("")
    const [product, setProduct] = useState("")
    const [side, setside] = useState("");
     // State for Buy/Sell
  const [brokerName, setBrokerName] = useState("");
  const [orderType, setOrderType] = useState("");
    const [Loginopen, setLoginOpen] = useState(false)
    const [brokerName2, setBrokerName2] = useState("");
    
  
     
     
     const [price, setPrice] = useState("")
     const [quantity, setQuantity] = useState("")
    
     const [isIndexEnabled, setIsIndexEnabled] = useState(false);
     
     const handlePlaceOrder = () => {
    // Logic to handle placing the order
    console.log({
      side,
      brokerName,
      price,
      quantity,
      product,
      orderType,
    });
    alert("Order placed successfully!");
  };
     const handleSelectChange = (value) => {
        if (value === "Buy") {
          setDialogTheme("bg-green-300"); // Greenish theme for Buy
          setPlaceOrderOpen(true);
          setside('BUY')
        } else if (value === "Sell") {
          setDialogTheme("bg-red-300"); // Reddish theme for Sell
          setPlaceOrderOpen(true);
          setside('SELL')

        }
      };
          const handleSearch = debounce((value) => {
      
               setQuery(value);
            if (value) {
               setselectsymbol(value); 
            fetchSymbols(brokerName4, exchange,instrument,value); 
      }
          
      
              }, 600); 

              
               const handlelogin = async () => {
                      const payload = JSON.stringify({brokerName2 });
                      const type = "POST"
                      const endpoint= "loginbroker"
                      handleexchangerequest(type, payload, endpoint,true)
                  .then(response => {
                  console.log(response) 
                  
                  window.location.reload()
                  })
                  
                      };

      
  return (
    <>
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center  gap-4">
             <Select onValueChange={(value) => setBrokerName4(value)}>
                    <SelectTrigger className="w-40 max-xs:w-20 bg-blue-800 text-white hover:bg-blue-700">
                      <SelectValue placeholder="Add account" />
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

                  <Dialog open={Loginopen} onOpenChange={setLoginOpen}>
                        <DialogTrigger asChild>
                          <Button onClick={() => setLoginOpen(true)}>Broker Login</Button>
                        </DialogTrigger>
                  
                        <DialogContent className=" bg-zinc-400 w-2/5">
                          <DialogHeader>
                            <DialogTitle>Broker Login</DialogTitle>
                            <DialogDescription>
                              Broker Login
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex gap-2 items-center justify-between w-full">
                          <Label htmlFor="broker-name" className=' mr-2'>Select Broker</Label>
                                  <Select onValueChange={(value) => setBrokerName2(value)}>
                    <SelectTrigger className="w-[180px] bg-stone-700 text-white hover:bg-stone-600">
                      <SelectValue placeholder="Market" / >
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
                                  <Button className = " bg-green-700 hover:bg-green-900" onClick={()=>handlelogin()}> LogIn</Button>
                  
                  
                  
                        </DialogContent>
                      </Dialog>
  

        </div>
        </div>
        <div className="flex flex-col items-center gap-6 p-6 bg-transparent text-white min-h-screen">
      <h1 className="text-3xl font-bold text-blue-800">Order Punch</h1>

      {/* Buy/Sell Radio Buttons */}
      <div className="flex gap-6">
        <Label className="flex items-center gap-2">
          <input
            type="radio"
            name="side"
            value="BUY"
            checked={side === "BUY"}
            onChange={(e) => setside(e.target.value)}
            className="w-4 h-4"
          />
          <span className="text-lg text-green-600">Buy</span>
        </Label>
        <Label className="flex items-center gap-2">
          <input
            type="radio"
            name="side"
            value="SELL"
            checked={side === "SELL"}
            onChange={(e) => setside(e.target.value)}
            className="w-4 h-4"
          />
          <span className="text-lg text-red-600">Sell</span>
        </Label>
      </div>

      <div className="flex flex-col gap-2 w-full max-w-md">
        <Label className="text-lg text-gray-700">Broker</Label>
        <Input
          type="text"
          value={brokerName}
          onChange={(e) => setBrokerName(e.target.value)}
          placeholder="Enter broker name"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Entry Price */}
      <div className="flex flex-col gap-2 w-full max-w-md">
        <Label className="text-lg text-gray-700">Entry Price</Label>
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex flex-col gap-2 w-full max-w-md">
        <Label className="text-lg text-gray-700">Quantity</Label>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter quantity"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Product */}
      <div className="flex flex-col gap-2 w-full max-w-md">
        <Label className="text-lg text-gray-700">Product</Label>
        <select
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Product</option>
          <option value="INTRADAY">Intraday</option>
          <option value="CARRYFORWARD">Carry Forward</option>
          <option value="DELIVERY">Delivery</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 w-full max-w-md">
        <Label className="text-lg text-gray-700">Order Type</Label>
        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Order Type</option>
          <option value="MARKET">Market</option>
          <option value="LIMIT">Limit</option>
        </select>
      </div>

      {/* Place Order Button */}
      <Button
        onClick={handlePlaceOrder}
        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
      >
        Place Order
      </Button>
    </div>
    
    </>
  )
}

export default OrderPunch