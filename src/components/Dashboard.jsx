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
  



const Dashboard = () => {
    const navigate = useNavigate();

    const [AddBropen, setAddBrOpen] = useState(false)
    const [Loginopen, setLoginOpen] = useState(false)
    const [Logoutopen, setLogoutOpen] = useState(false)
    const [placeorderopen, setPlaceOrderOpen] = useState(false)
    const [dialogTheme, setDialogTheme] = useState("");
    const [apiKey, setApiKey] = useState(""); // State for API Key
    const [apiSecret, setApiSecret] = useState(""); // State for API Secret
    const [redirectUrl, setRedirectUrl] = useState("");
    const [brokerName1, setBrokerName1] = useState("");
    const [brokerName2, setBrokerName2] = useState("");
    const [brokerName3, setBrokerName3] = useState(""); // State for Broker Name
    const [brokerName4, setBrokerName4] = useState(""); // State for Broker Name

    const [apiSecretLogin,setApiSecretLogin] = useState(""); // State for API Secret
    const [redirectUrlLogin,setRedirectUrlLogin] = useState(""); // State for API Secret
    const [tableDatafetch, setTableDatafetch] = useState([]);
    const [totp, setTotp] = useState('');
    const [login, setLogin] = useState('');
    const [Password, setPassword] = useState('');
    const [loading,setLoading]= useState('')
    const [Comboopen, setComboOpen] = useState(false)
    const [selectsymbol,setselectsymbol]=useState('')
    const [Symbol,setsymbol]= useState([])
     const [brokers, setBrokers] = useState([])




    
    
    const handleopen = () => setAddBrOpen(true)
    
    
    
    const handleplaceorder = ()=>{
         const payload = JSON.stringify({
          brokerName4,
          Symbol,
          order,
          brokerName1,

        });
        const type = "POST"
        const endpoint= "placeorder"
        handleexchangerequest(type, payload, endpoint)
    .then(response => {
    console.log(response) 
    
    window.location.reload()
    })
    
    }

    const handleSelectChange = (value) => {
        if (value === "Buy") {
          setDialogTheme("bg-green-300"); // Greenish theme for Buy
          setPlaceOrderOpen(true);
        } else if (value === "Sell") {
          setDialogTheme("bg-red-300"); // Reddish theme for Sell
          setPlaceOrderOpen(true);
        }
      };

      useEffect(() => {
        const handleKeyPress = (event) => {
          if (event.key === "F1") {
            event.preventDefault(); // Prevent default browser behavior (help menu)
            setDialogTheme("bg-green-300"); // Set theme for Buy
            setPlaceOrderOpen(true); // Open the Buy dialog
          }
            else if (event.key === "F2") {
                event.preventDefault(); // Prevent default browser behavior (help menu)
                setDialogTheme("bg-red-300"); // Set theme for Sell
                setPlaceOrderOpen(true); // Open the Sell dialog
            }
        };
    
        window.addEventListener("keydown", handleKeyPress);
        return () => {
          window.removeEventListener("keydown", handleKeyPress);
        };
      }, []);


      const fetchBrokers = async () => {
        try {
      const response = await handleexchangerequest("GET", 'Broker=all', "symbol"); // Replace with your API endpoint
      if (response) {
        setBrokers(response); // Assuming response.data contains the broker list
      } else {
        console.error("Failed to fetch brokers");
      }
    } catch (error) {
      console.error("Error fetching brokers:", error);
    }
  };

  // Fetch brokers on component mount
 

      const dashlogout =()=>{
        localStorage.clear()
        navigate('/')
      }


      const data1 = [
        { id: 1, name: "John Doe", age: 28, email: "john.doe@example.com" },
        { id: 2, name: "Jane Smith", age: 34, email: "jane.smith@example.com" },
        { id: 3, name: "Alice Johnson", age: 25, email: "alice.johnson@example.com" },
        { id: 4, name: "Bob Brown", age: 42, email: "bob.brown@example.com" },
        { id: 5, name: "Charlie Davis", age: 30, email: "charlie.davis@example.com" },
        { id: 6, name: "Emily Wilson", age: 29, email: "emily.wilson@example.com" },
        { id: 7, name: "Frank Miller", age: 37, email: "frank.miller@example.com" },
        { id: 8, name: "Grace Lee", age: 31, email: "grace.lee@example.com" },
        { id: 9, name: "Henry White", age: 45, email: "henry.white@example.com" },
        { id: 10, name: "Isabella Green", age: 27, email: "isabella.green@example.com" },
        { id: 11, name: "Jack Black", age: 33, email: "jack.black@example.com" },
        { id: 12, name: "Laura Brown", age: 26, email: "laura.brown@example.com" },
      ];
    
      const data2 = [
        { id: 1, name: "Michael Scott", age: 40, email: "michael.scott@example.com", country: "USA" },
        { id: 2, name: "Dwight Schrute", age: 38, email: "dwight.schrute@example.com", country: "USA" },
        { id: 3, name: "Jim Halpert", age: 35, email: "jim.halpert@example.com", country: "USA" },
        { id: 4, name: "Pam Beesly", age: 32, email: "pam.beesly@example.com", country: "USA" },
        { id: 5, name: "Ryan Howard", age: 29, email: "ryan.howard@example.com", country: "USA" },
        { id: 6, name: "Kelly Kapoor", age: 28, email: "kelly.kapoor@example.com", country: "India" },
        { id: 7, name: "Stanley Hudson", age: 50, email: "stanley.hudson@example.com", country: "USA" },
        { id: 8, name: "Kevin Malone", age: 45, email: "kevin.malone@example.com", country: "USA" },
      ];
    
      const data3 = [
        { id: 1, name: "Tony Stark", age: 48 },
        { id: 2, name: "Steve Rogers", age: 101 },
        { id: 3, name: "Natasha Romanoff", age: 35 },
        { id: 4, name: "Bruce Banner", age: 49 },
        { id: 5, name: "Thor Odinson", age: 1500 },
        { id: 6, name: "Clint Barton", age: 41 },
        { id: 7, name: "Wanda Maximoff", age: 29 },
        { id: 8, name: "Peter Parker", age: 18 },
        { id: 9, name: "Stephen Strange", age: 45 },
        { id: 10, name: "Carol Danvers", age: 38 },
      ];

    const brokerlist=[
    {"NAME":"ANGEL"},
    {"NAME":"SHOONYA"},
    {"NAME":"DHAN"},
    {"NAME":"FYERS"},
    {"NAME":"MOTILAL"},
    {"NAME":"ANANDRATHI"},
    {"NAME":"GROWW"},
    {"NAME":"ZERODHA"},
    {"NAME":"SAMCO"},
    {"NAME":"FLATTRADE"},
    {"NAME":"BIGUL"},
    {"NAME":"STOXKART"}

    
]
    const [tableData, setTableData] = useState(data1);

    const handleLogoutBroker = async () => {
      const payload = JSON.stringify({
        brokerName: brokerName3,
      });
      const type = "POST";
      const endpoint = "/api/logout-broker";
      
      handleexchangerequest(type, payload, endpoint)
      .then(response => {
        console.log(response);
        if(response) {
          alert("Broker logout successful!");
          setLogoutOpen(false); // Close the dialog
        } else {
          alert("Failed to logout. Please try again.");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
    };
        const handleLoginBroker = async () => {
      const payload = JSON.stringify({
        apiSecret: apiSecretLogin,
        redirectUrl: redirectUrlLogin,
        brokerName: brokerName2,
      });
      const type = "POST";
      const endpoint = "/api/login-broker";
      
      handleexchangerequest(type, payload, endpoint)
      .then(response => {
        console.log(response);
        if(response) {
          alert("Broker login successful!");
          setLoginOpen(false); 
        } else {
          alert("Failed to login. Please try again.");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
    };


    const handleexchange = async () => {
        const payload = JSON.stringify({
          apiKey,
          apiSecret,
          redirectUrl,
          brokerName1,

        });
        const type = "POST"
        const endpoint= "broker"
        handleexchangerequest(type, payload, endpoint)
    .then(response => {
    console.log(response) 
    
    window.location.reload()
    })
    
        };

 const handlelogin = async () => {
        const payload = JSON.stringify({
          brokerName2,
       

        });
        const type = "POST"
        const endpoint= "loginbroker"
        handleexchangerequest(type, payload, endpoint)
    .then(response => {
    console.log(response) 
    
    window.location.reload()
    })
    
        };



const handlelogout = async () => {
        const payload = JSON.stringify({
          brokerName3,
       

        });
        const type = "POST"
        const endpoint= "logoutbroker"
        handleexchangerequest(type, payload, endpoint)
    .then(response => {
    console.log(response) 
    
    window.location.reload()
    })
    
        };


const handleorders= async (x) => {
     
        const type = "GET"
        const endpoint= "position"
        const payload= "type="+x
        handleexchangerequest(type, payload, endpoint)
        .then(response => {
          console.log(response) 
        setTableDatafetch(response);
    // alert("Data fetched successfully!");
    })
 };

      const fetchSymbols = async (broker, exchange) => {
        setLoading(true);
        try {
          const queryParams = `broker=${broker}&exchange=${exchange}`;
          const response = await handleexchangerequest("GET", queryParams, "symbols");
          if (response) {
            setsymbol(response);
            console.log("Symbols fetched successfully:", response);
          } else {
            console.error("Failed to fetch symbols");
          }
        } catch (error) {
          console.error("Error fetching symbols:", error);
        } finally {
          setLoading(false);
        }
      };

      // Fetch brokers on component mount
      useEffect(() => {
        fetchBrokers();
    
      }, []);
    
  return (
    <>
    <div className="container-fluid bg-slate-700 h-screen flex flex-col gap-4">
        <div className='flex gap-5 flex-wrap pt-3 items-center'>
        <Dialog open={AddBropen} onOpenChange={setAddBrOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setAddBrOpen(true)}>Add Broker</Button>
      </DialogTrigger>

      <DialogContent className=" bg-zinc-400 w-2/5">
        <DialogHeader>
          <DialogTitle>Add Broker</DialogTitle>
          <DialogDescription>
            Enter the broker details below:
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 items-center justify-between w-full">
        <Label htmlFor="broker-name" className=' mr-2'>Select Broker</Label>
    <Select onValueChange ={(value) => setBrokerName1(value)}>
  <SelectTrigger className="w-[180px] bg-stone-700 text-white hover:bg-stone-600" 
  >
    <SelectValue placeholder="Broker Name" / >
  </SelectTrigger>
  <SelectContent className="bg-white border border-blue-300">
    {brokers && brokers.length > 0 ? (
      brokers.map((broker, index) => (
    <SelectItem
      value={broker.NAME}

      className="hover:bg-blue-100 hover:text-blue-800 focus:bg-blue-200"
    >
      {broker.NAME}
    </SelectItem>
      ))
    ):(
    <SelectItem
      className="hover:bg-blue-100 hover:text-blue-800 focus:bg-blue-200"
    >
      {loading ? "Loading brokers..." : "No brokers available"}
    </SelectItem>
    )}
  </SelectContent>
</Select>
        </div>
        <div className="flex gap-2 items-center justify-between w-full">
        <Label htmlFor="broker-name" className=' mr-2'>API Key</Label>
        <input
          type="text"
          placeholder="API Key"
          className="border p-1 rounded items-center placeholder:text-sm"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        </div>
        <div className="flex gap-2 items-center justify-between w-full">
        <Label htmlFor="broker-name" className=' mr-2'>API Secret</Label>
        <input
          type="Password"
          placeholder="API Secret"
          className="border p-1 rounded items-center placeholder:text-sm"
          value={apiSecret}
        onChange={(e) => setApiSecret(e.target.value)}
        />
        </div>
       
 
        <div className="flex gap-2 items-center justify-between w-full">
        <Label htmlFor="broker-name" className=' mr-2'>TOTP Token</Label>
        <input
          type="text"
          placeholder="TOTP Token"
          className="border p-1 rounded items-center placeholder:text-sm"
          value={totp}
        onChange={(e) => setTotp(e.target.value)}
        />
        </div>

        <div className="flex gap-2 items-center justify-between w-full">
        <Label htmlFor="broker-name" className=' mr-2'>LOGIN ID</Label>
        <input
          type="text"
          placeholder="LOGIN ID"
          className="border p-1 rounded items-center placeholder:text-sm"
          value={login}
        onChange={(e) => setLogin(e.target.value)}
        />
        </div>

        <div className="flex gap-2 items-center justify-between w-full">
        <Label htmlFor="broker-name" className=' mr-2'>Password</Label>
        <input
          type="Password"
          placeholder="Password"
          className="border p-1 rounded items-center placeholder:text-sm"
          value={Password}
        onChange={(e) => setPassword(e.target.value)}
        />
        </div>


       

        <Button className = " bg-green-700 hover:bg-green-900"  onClick={()=>handleexchange()}> Save</Button>





      </DialogContent>
    </Dialog>
        



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
                <Button className = " bg-green-700 hover:bg-green-900" onClick={handlelogin}> LogIn</Button>



      </DialogContent>
    </Dialog>
    <Dialog open={Logoutopen} onOpenChange={setLogoutOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setLogoutOpen(true)}>Broker Logout</Button>
      </DialogTrigger>

      <DialogContent className=" bg-zinc-400 w-2/5">
        <DialogHeader>
          <DialogTitle>Broker Logout</DialogTitle>
          <DialogDescription>
            Broker Logout
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 items-center justify-between w-full">
        <Label htmlFor="broker-name" className=' mr-2'>Select Broker</Label>
        <Select onValueChange={(value) => setBrokerName3(value)}>
  <SelectTrigger className="w-[180px] bg-stone-700 text-white hover:bg-stone-600"
  
  >
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
        
        <Button className = " bg-green-700 hover:bg-green-900" onClick={()=>handlelogout()}> LogOut</Button>



      </DialogContent>
    </Dialog>


    <Dialog open={placeorderopen} onOpenChange={setPlaceOrderOpen} className = "">
      
      
      <DialogTrigger asChild>
      <Select  onValueChange={handleSelectChange}>
  <SelectTrigger className="w-[180px] bg-blue-800 text-white hover:bg-blue-700">
    <SelectValue placeholder="Place Order" />
  </SelectTrigger>
  <SelectContent className="bg-white border border-blue-300">
  

    <SelectItem
      value="Buy"
      className="hover:bg-blue-100 hover:text-blue-800 focus:bg-blue-200"
    >
      Buy ( Press F1 )
    </SelectItem>
    <SelectItem
      value="Sell"
      className="hover:bg-blue-100 hover:text-blue-800 focus:bg-blue-200"
    >
      Sell ( Press F2 )
    </SelectItem>
    
  </SelectContent>
</Select>
      </DialogTrigger>

      <DialogContent className={`w-2/5 ${dialogTheme}`}>
        <DialogHeader>
          <DialogTitle>Place Order</DialogTitle>
          <DialogDescription className='text-base text-black'>
          {dialogTheme === "bg-green-300"? "You are placing a Buy order."
                    : "You are placing a Sell order."}
          </DialogDescription>
        </DialogHeader>
        <div className=' flex items-center justify-center'>
        <div className='flex flex-col justify-between flex-wrap gap-4 pt-3 items-center border-2 border-blue-500 rounded-lg bg-slate-800 p-4'>
            <p className='text-2xl font-bold text-white '>Place Order</p>
            <div className='flex justify-between flex-wrap gap-2'>
            <div className='flex gap-2'>
              <div className='flex flex-col gap-2'>
                <Label className =" text-white text-base">Broker</Label>
                <Select>
                <SelectTrigger className="w-[180px] bg-blue-800 text-white hover:bg-blue-700">
                  <SelectValue placeholder="" />
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
                <div className='flex flex-col gap-2'>
                <Label className =" text-white text-base">Exchange</Label>
                <Select onValueChange={(value) => {
                   if (brokerName4) {
                    fetchSymbols(brokerName4, value);
                  } else {
                    alert("Please select a broker first");
                  }
                }}
                >
                <SelectTrigger className="w-[180px] bg-blue-800 text-white hover:bg-blue-700">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-blue-300">
                  <SelectItem
                    value="NSE"
                    className="hover:bg-blue-100 hover:text-blue-800 focus:bg-blue-200"
                  >
                    NSE
                  </SelectItem>
                  <SelectItem
                    value="NFO"
                    className="hover:bg-blue-100 hover:text-blue-800 focus:bg-blue-200"
                  >
                    NFO
                  </SelectItem>
                  <SelectItem
                    value="BSE"
                    className="hover:bg-blue-100 hover:text-blue-800 focus:bg-blue-200"
                  >
                    BSE
                  </SelectItem>
                  <SelectItem
                    value="BFO"
                    className="hover:bg-blue-100 hover:text-blue-800 focus:bg-blue-200"
                  >
                    BFO
                  </SelectItem>
                 
                  
                </SelectContent>
              </Select>
                </div>

                

              </div>
            <div className='flex gap-2'>
                <div className='flex flex-col gap-2'>
                <Label className =" text-white text-base">Symbol</Label>
                <Popover open={Comboopen} onOpenChange={setComboOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={Comboopen}
                      className="w-[200px] justify-between bg-blue-700 text-white hover:bg-blue-600"
                    >
                      {selectsymbol || "Select Symbol"}
                      {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput  placeholder="Search symbol..." />
                      <CommandList>
                        <CommandEmpty>No symbol found.</CommandEmpty>
                        <CommandGroup>
                          <CommandItem value="select-symbol" onChange={(e) => setselectsymbol(e)}>
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
                                    selectsymbol === symbol ? "opacity-100" : "opacity-0"
                                  }`}
                                />
                                {symbol}
                              </CommandItem>
                            ))
                          ) : (
                            <CommandItem disabled>
                              {loading ? "Loading symbols..." : "No symbols available"}
                            </CommandItem>
                          )}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                </div>
            </div>
            <div className=' flex flex-col gap-2'>
                <Label className =" text-white text-base">Entry Price</Label>
                <Input type='number' className='bg-blue-800'/>
            </div>
            <div className='flex flex-col gap-2'>
                <Label className =" text-white text-base">Quantity</Label>
                <Input type='number' className='bg-blue-800'/>
            </div>

            <div className='flex gap-2'>
                <div className='flex flex-col gap-2'>
                <Label className =" text-white text-base">Product</Label>
                <Select>
  <SelectTrigger className="w-[180px] bg-blue-800 text-white hover:bg-blue-700">
    <SelectValue placeholder="MIS" />
  </SelectTrigger>
  <SelectContent className="bg-white border border-blue-300">
    <SelectItem
      value="INTRADAY"
      className="hover:bg-blue-100 hover:text-blue-800 focus:bg-blue-200"
    >   
      INTRADAY
    </SelectItem>
    <SelectItem
      value="CARRYFORWARD"
      className="hover:bg-blue-100 hover:text-blue-800 focus:bg-blue-200"
    >
      CARRYFORWARD
    </SelectItem>
    <SelectItem
      value="DELIVERY"
      className="hover:bg-blue-100 hover:text-blue-800 focus:bg-blue-200"
    >
      DELIVERY
    </SelectItem>
  </SelectContent>
</Select>
                </div>
            </div>
            <div className='flex gap-2'>
                <div className='flex flex-col gap-2'>
                <Label className =" text-white text-base">Order Type</Label>
                <Select>
  <SelectTrigger className="w-[180px] bg-blue-800 text-white hover:bg-blue-700">
    <SelectValue placeholder="" />
  </SelectTrigger>
  <SelectContent className="bg-white border border-blue-300">
    <SelectItem
      value="Market"
      className="hover:bg-blue-100 hover:text-blue-800 focus:bg-blue-200"
    >
      Market
    </SelectItem>
    <SelectItem
      value="LIMIT"
      className="hover:bg-blue-100 hover:text-blue-800 focus:bg-blue-200"
    >
      LIMIT
    </SelectItem>
    </SelectContent>
      </Select>
</div>
                </div>
            </div>

            <Button  onClick={()=>handleplaceorder()} className = " bg-green-700 hover:bg-green-900"> Place Order</Button>
        </div>
        </div>
        



      </DialogContent>
    </Dialog>
    <Button onClick={() => dashlogout()} className ="  bg-blue-600 text-white hover:bg-blue-700">Dashboard LogOut</Button>

        </div>

        <div className="container mx-auto mt-5 bg-slate-800 p-4 rounded-lg">
      <div className="flex flex-wrap gap-4 mb-4">
        <Button
          className="w-28 text-sm bg-blue-500 hover:bg-blue-700 text-white"
          onClick={() => handleorders('open')}>
          Open Order
        </Button>



        
        <Button
          className="w-28 text-sm bg-green-500 hover:bg-green-700 text-white"
          onClick={() => handleorders('close')}
        >
          Close Order
        </Button>
              </div>
      <div className="overflow-x-auto h-72 w-full rounded-lg">
  {loading ? (
    <p className="text-center text-white">Loading...</p> // Loading message
  ) : tableDatafetch.length === 0 ? (
    <table className="table-auto border-collapse border border-gray-300 w-full overflow-hidden">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 px-4 py-2">Column 1</th>
          <th className="border border-gray-300 px-4 py-2">Column 2</th>
          <th className="border border-gray-300 px-4 py-2">Column 3</th>
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
              <td key={index} className="border border-gray-300 px-4 py-2">
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
     {/* <div className="mt-4 text-white">
        <p>Selected Broker 1: {brokerName1 || "None"}</p>
        <p>Selected Broker 2: {brokerName2 || "None"}</p>
      </div>
         */}

    </div>
    </>
  )
}


export default Dashboard