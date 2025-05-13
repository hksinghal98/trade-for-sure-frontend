import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { handleexchangerequest } from "../utility/Api";
import { Check, ChevronsUpDown } from "lucide-react";
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
} from "../components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "../components/ui/dialog";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

const OrderPunch = () => {
  const [placeorderopen, setPlaceOrderOpen] = useState(false);
  const [dialogTheme, setDialogTheme] = useState("");
  const [brokerName4, setBrokerName4] = useState("");
  const [loading, setLoading] = useState("");
  const [Comboopen, setComboOpen] = useState(false);
  const [selectsymbol, setselectsymbol] = useState("");
  const [Symbol, setsymbol] = useState([]);
  const [brokers, setBrokers] = useState([]);
  const [ordertype, setOrdertype] = useState("");
  const [product, setProduct] = useState("");
  const [side, setside] = useState("");
  const [brokerName, setBrokerName] = useState("");
  const [orderType, setOrderType] = useState("");
  const [Loginopen, setLoginOpen] = useState(false);
  const [brokerName2, setBrokerName2] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isIndexEnabled, setIsIndexEnabled] = useState(true);
  const [tableDatafetch, setTableDatafetch] = useState([]);
  const[exchange,setExchange]= useState("")
  


  const dummyLogs = [
  { id: 1, message: 'User logged in successfully', timestamp: '2025-05-13 19:45:32' },
  { id: 2, message: 'API request failed: Invalid token', timestamp: '2025-05-13 19:46:10' },
  { id: 3, message: 'Database connection established', timestamp: '2025-05-13 19:46:45' },
  { id: 4, message: 'File uploaded to server', timestamp: '2025-05-13 19:47:22' },
  { id: 5, message: 'User updated profile', timestamp: '2025-05-13 19:48:01' },
  { id: 6, message: 'Scheduled task started', timestamp: '2025-05-13 19:49:15' },
  { id: 7, message: 'Payment processed successfully', timestamp: '2025-05-13 19:50:00' },
];

  const fetchTableData = async () => {
    setLoading(true);
    try {
      const type = "GET";
      const endpoint = "position"; // Replace with your API endpoint
      const payload = "type=all"; // Example payload
      const response = await handleexchangerequest(type, payload, endpoint, true);
      if (response) {
        setTableDatafetch(response);
      } else {
        console.error("Failed to fetch table data");
      }
    } catch (error) {
      console.error("Error fetching table data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

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
      setside("BUY");
    } else if (value === "Sell") {
      setDialogTheme("bg-red-300"); // Reddish theme for Sell
      setPlaceOrderOpen(true);
      setside("SELL");
    }
  };

  const handleSearch = debounce((value) => {
    setQuery(value);
    if (value) {
      setselectsymbol(value);
      fetchSymbols(brokerName4, exchange, instrument, value);
    }
  }, 600);

  const handlelogin = async () => {
    const payload = JSON.stringify({ brokerName2 });
    const type = "POST";
    const endpoint = "loginbroker";
    handleexchangerequest(type, payload, endpoint, true).then((response) => {
      console.log(response);
      window.location.reload();
    });
  };

  
      const handleSelectIndex = (value) => {
        console.log(value);
         if (brokerName4) {
      // fetchSymbols(brokerName4, value)
        setExchange(value)

      // ;

    } 

    // Enable "Select Index" only for "NFO" or "BFO"
    if (value === "NFO" || value === "BFO") {
      setIsIndexEnabled(true);
    } else {
      setIsIndexEnabled(false);
    }
  }
  const alertsymbol = (value) => {

    
    if (brokerName4) {  
      setInstrument(value)

      // fetchSymbols(brokerName4, value);
    } else {
      alert("Please select a broker first");
    }
  }

  

  return (
    <>
    <div className="flex flex-col h-screen">
      
      <div className="flex items-center gap-6 p-6 pt-0 bg-transparent text-white">
        <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Select onValueChange={(value) => setBrokerName4(value)}>
            <SelectTrigger className="w-40 max-xs:w-20 bg-blue-800 text-white hover:bg-blue-700">
              <SelectValue placeholder="Select Account" />
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
              <Button onClick={() => setLoginOpen(true)}>Login</Button>
            </DialogTrigger>

            <DialogContent className="bg-zinc-400 w-2/5">
              <DialogHeader>
                <DialogTitle>Login</DialogTitle>
              </DialogHeader>
              <div className="flex gap-2 items-center justify-between w-full">
                <Label htmlFor="broker-name" className="mr-2">

                  
                  Select Broker
                </Label>
                <Select onValueChange={(value) => setBrokerName2(value)}>
                  <SelectTrigger className="w-[180px] bg-stone-700 text-white hover:bg-stone-600">
                    <SelectValue placeholder="Market" />
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
              <Button
                className="bg-green-700 hover:bg-green-900"
                onClick={() => handlelogin()}
              >
                LogIn
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
        

        {/* Buy/Sell Radio Buttons */}

        <div
          className={`flex outline-1 outline w-3/4 items-center justify-center p-4 rounded-lg ${
            side === "BUY"
              ? "outline-green-500 shadow-green-500/75 shadow-xl"
              : side === "SELL"
              ? "outline-red-500 shadow-xl shadow-red-500"
              : "outline-white"
          }`}
        >
          
          <div className="flex flex-col gap-2 w-full items-center justify-center">
            <h1 className="text-3xl font-bold text-slate-300">Order Punch</h1>
            <div className="flex gap-3 w-full ite">
              
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

              <div className="flex flex-col gap-2 w-full items-center ">
                  <Label className="text-lg text-white text-center">Exchange</Label>
                <div className="flex gap-6">
                  <Label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="exchange"
                      value="NFO"
                      defaultChecked
                      // checked={exchange === "NFO"}
                      onChange={(e) => handleSelectIndex(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-lg text-white">NFO</span>
                  </Label>
                  <div className="flex gap-6">
                    <Label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="exchange"
                        
                        value="NSE"
                        // checked={exchange === "NSE"}
                        onChange={(e) => handleSelectIndex(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-lg text-white">NSE</span>
                    </Label>
                    <Label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="exchange"
                        value="BSE"
                        // checked={exchange === "BSE"}
                        onChange={(e) => handleSelectIndex(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-lg text-white">BSE</span>
                    </Label>
                    <Label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="exchange"
                        value="BFO"
                        // checked={exchange === "BFO"}
                        onChange={(e) => handleSelectIndex(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-lg text-white">BFO</span>
                    </Label>
                    <Label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="exchange"
                        value="MCX"
                        // checked={exchange === "MCX"}
                        onChange={(e) => handleSelectIndex(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-lg text-white">MCX</span>
                    </Label>
                  </div>
                </div>
              </div>

              {/* Entry Price */}
              <div className='flex flex-col gap-2'>
                                          <Label className =" text-white text-base">Type</Label>
                                          <Select
                            onValueChange={(value) => {
                              alertsymbol(value);
                            }}
                            disabled={!isIndexEnabled} // Disable when `isIndexEnabled` is false
                          >
                            <SelectTrigger
                              className={`w-[130px] ${
                                isIndexEnabled
                                  ? "bg-blue-800 text-white hover:bg-blue-700"
                                  : "bg-gray-400 text-gray-600 cursor-not-allowed"
                              }`}
                            >
                              <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-blue-300">
                              
                              <SelectItem
                                value="FUTSTK"
                                className="hover:bg-blue-100 hover:text-blue-800 focus:bg-blue-200"
                              >
                                FUTSTK
                              </SelectItem>
                              <SelectItem
                                value="FUTIDX"
                                className="hover:bg-blue-100 hover:text-blue-800 focus:bg-blue-200"
                              >
                                FUTIDX
                              </SelectItem>
                              <SelectItem
                                value="OPTIDX"
                                className="hover:bg-blue-100 hover:text-blue-800 focus:bg-blue-200"
                              >
                                OPTIDX
                              </SelectItem>
                              <SelectItem
                                value="OPTSTK"
                                className="hover:bg-blue-100 hover:text-blue-800 focus:bg-blue-200"
                              >
                                OPTSTK
                              </SelectItem>
                            </SelectContent>
                          </Select>
                                          </div>
              
            </div>
            <div className="flex gap-2 w-full items-center ">
              <div className="flex flex-col gap-2 w-full ">
                <Label className="text-lg text-white">Quantity</Label>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() =>
                      setQuantity((prev) => Math.max(0, Number(prev) - 1))
                    } // Convert to number before decrementing
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    -
                  </Button>
                  {/* Quantity Input */}
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))} // Ensure the value is a number
                    placeholder="Enter quantity"
                    className="w-full p-2 border border-gray-300 rounded-md text-center"
                  />
                  {/* Increment Button */}
                  <Button
                    onClick={() => setQuantity((prev) => Number(prev) + 1)} // Convert to number before incrementing
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-white text-base">Symbol</Label>
                <Popover open={Comboopen} onOpenChange={setComboOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={Comboopen}
                      className="max-xs:w-20 justify-between bg-stone-700 text-white hover:bg-stone-600"
                    >
                      {selectsymbol || "Select Symbol"}
                      {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        onValueChange={handleSearch}
                        placeholder="Search symbol..."
                      />
                      <CommandList>
                        <CommandEmpty>No symbol found.</CommandEmpty>
                        <CommandGroup>
                          <CommandItem
                            value="select-symbol"
                            onChange={(e) => setselectsymbol(e)}
                          >
                            Select Symbol
                          </CommandItem>
                          {Symbol.length > 0 ? (
                            Symbol.map((symbol, index) => (
                              <CommandItem
                                key={index}
                                value={symbol}
                                onSelect={() => {
                                  setselectsymbol(symbol);
                                  setComboOpen(false);
                                }}
                              >
                                <Check
                                  className={`mr-2 h-4 w-4 ${
                                    selectsymbol === symbol
                                      ? "opacity-100"
                                      : "opacity-0"
                                  }`}
                                />
                                {symbol}
                              </CommandItem>
                            ))
                          ) : (
                            <CommandItem disabled>
                              {loading
                                ? "Loading symbols..."
                                : "No symbols available"}
                            </CommandItem>
                          )}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col gap-2 w-full ">
                <Label className="text-lg text-white">Entry Price</Label>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              

            </div>

            <div className="flex gap-2 w-full ">
              <div className="flex flex-col gap-2 w-full ">
              {/* Product */}
                <Label className="text-lg text-white">Product</Label>
                <div className="flex gap-6">
                  <Label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="product"
                      value="INTRADAY"
                      checked={product === "INTRADAY"}
                      onChange={(e) => setProduct(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-lg text-white">Intraday</span>
                  </Label>
                  <div className="flex gap-6">
                    <Label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="product"
                        value="Carryforwad"
                        checked={product === "Carryforwad"}
                        onChange={(e) => setProduct(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-lg text-white">Carry Forward</span>
                    </Label>
                    <Label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="product"
                        value="DELIVERY"
                        checked={product === "DELIVERY"}
                        onChange={(e) => setProduct(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-lg text-white">Delivery</span>
                    </Label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full ">
                <Label className="text-lg text-white">Order Type</Label>
                <div className="flex gap-6">
                  <Label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="orderType"
                      value="LIMIT"
                      checked={orderType === "LIMIT"}
                      onChange={(e) => setOrderType(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-lg text-white">Limit</span>
                  </Label>
                  <Label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="orderType"
                      value="MARKET"
                      checked={orderType === "MARKET"}
                      onChange={(e) => setOrderType(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-lg text-white">Market</span>
                  </Label>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <div className="flex gap-4 w-full justify-end">
              <Button
                onClick={handlePlaceOrder}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
              >
                Submit
              </Button>
              <Button className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700">
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      
      <div className="overflow-x-auto h-56 text-black w-full rounded-lg bg-white p-4">
        <ul>
        {dummyLogs.map((log) => (
          <li key={log.id}>[{log.timestamp}] {log.message}</li> // Adjust based on your data structure
        ))}
      </ul>
      </div>
        </div>
      
    </>
  );
};

export default OrderPunch;