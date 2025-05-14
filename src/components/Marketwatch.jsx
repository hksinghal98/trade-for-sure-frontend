import React, { useEffect, useState } from "react"; // Ensure useState is imported
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../components/ui/select"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { Command, CommandInput, CommandList, CommandItem, CommandEmpty, CommandGroup } from "../components/ui/command"
import { Input } from "../components/ui/input"
import debounce from "lodash.debounce";
import { handleexchangerequest } from "../utility/Api";
import { Check, ChevronsUpDown } from "lucide-react"


const Marketwatch = () => {
    const [brokerName4, setBrokerName4] = useState(""); 
    const [Comboopen, setComboOpen] = useState(false);
    const [isIndexEnabled, setIsIndexEnabled] = useState(false);
    const [selectsymbol, setselectsymbol] = useState('');
    const [brokers, setBrokers] = useState([]);
    const [loading, setLoading] = useState('');
    const [tableDatafetch, setTableDatafetch] = useState([]);
    const [symbolCount, setSymbolCount] = useState(0); // Track the number of symbols added
         const[exchange,setExchange]= useState("")
         const [query, setQuery] = useState("");
        const [Symbol,setsymbol]= useState([])
        const [token,setToken]= useState([])
        const [data,setdata]= useState([])



       const  handletoken = (index)=>{

        setToken(data['Token'][index])


        }
    
     const [instrument, setInstrument] = useState('EQ');


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


        useEffect(() => {
        fetchBrokers();
    
      }, []);
    
 const fetchSymbols = async (broker, exchange,instrument,symbol) => {
        setLoading(true);
        try {
          const queryParams = `Broker=${broker}&exchange=${exchange}&instrument=${instrument}&name=${symbol}`;
          const response = await handleexchangerequest("GET", queryParams, "symbols",false);
          if (response) {
            setdata(response)
            const removeDuplicatsymbol = [...new Set(response.TradingSymbol)];

            setsymbol(removeDuplicatsymbol);
            console.log("Symbols fetched successfully:", removeDuplicatsymbol);
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
    
const handleSelectIndex = (value) => {
     if (brokerName4) {
  // fetchSymbols(brokerName4, value)
    setExchange(value)
  // ;

} else {
  alert("Please select a broker first");
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

 const handleAddSymbol = ()=>{
    if (symbolCount >= 50) {
        alert("You cannot add more than 50 symbols.");
        return;
    }
         const payload = JSON.stringify({
          brokerName4,
          exchange,
          instrument,
          selectsymbol,
          token
        


        });
        const type = "POST"
        const endpoint= "watchlist"
        handleexchangerequest(type, payload, endpoint,true)
    .then(response => {
    console.log(response) 
    setSymbolCount(response); // Increment the symbol count
    
    window.location.reload()
    })
    
    }
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

const handleSearch = debounce((value) => {

       setQuery(value);
    if (value) {
       setselectsymbol(value); 
    fetchSymbols(brokerName4, exchange,instrument,value); 
}

      }, 600); // Wait 300ms before executing the search



return (
<>
<div>
 <div className='flex gap-5 flex-wrap pt-3 items-center'>
<div className='flex justify-between flex-wrap gap-2'>
                        <div className='flex gap-2 flex-wrap'>
                          <div className='flex flex-col gap-2'>
                            <Label className =" text-white text-base">Broker</Label>
                            <Select onValueChange={(value) => setBrokerName4(value)}>
                            <SelectTrigger className="w-40 max-xs:w-20 bg-blue-800 text-white hover:bg-blue-700">
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
                            <div className='flex flex-col gap-2'>
                            <Label className =" text-white text-base">Exchange</Label>
                            <Select
              onValueChange= {(value) => handleSelectIndex(value)}
            >
              <SelectTrigger className="w-40 max-xs:w-20 bg-blue-800 text-white hover:bg-blue-700">
                <SelectValue placeholder="Exchange" />
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
                        <div className='flex gap-2'>
                            
                <div className='flex gap-2 items-end'>
                            <div className='flex flex-col gap-2'>
                            <Label className =" text-white text-base">Symbol</Label>
                            <Popover open={Comboopen} onOpenChange={setComboOpen}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={Comboopen}
                                  className="w-48 max-xs:w-20 justify-between bg-blue-700 text-white hover:bg-blue-600"
                                >
                                  {selectsymbol || "Select Symbol"}
                                  {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput  onValueChange={handleSearch} 
                                       
                                    placeholder="Search symbol..." />
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
                                              handletoken(index)
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
                            <Button
                                className={`bg-green-800 text-white hover:bg-green-700 w-44 max-xs:w-20 ${
                                    symbolCount >= 50 ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                                onClick={handleAddSymbol}
                                disabled={symbolCount >= 50} // Disable button if symbol count exceeds 50
                            >
                                Add Symbol
                            </Button>
                        </div>
                            
                        </div>
                        
                        </div>
                        
                        </div>
                        <div className="container mx-auto mt-5 bg-slate-800 p-4 rounded-lg">

  <div className="overflow-x-auto h-72 w-full rounded-lg">
{loading ? (
<p className="text-center text-white">Loading...</p> // Loading message
) : tableDatafetch.length === 0 ? (
<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th scope="col" className="px-6 py-3">Column 1</th>
      <th scope="col" className="px-6 py-3">Column 2</th>
      <th scope="col" className="px-6 py-3">Column 3</th>
      <th scope="col" className="px-6 py-3">Buy</th>
      <th scope="col" className="px-6 py-3">Sell</th>
      <th scope="col" className="px-6 py-3">Delete</th>
    </tr>
  </thead>
  <tbody>
    {[...Array(5)].map((_, index) => (
      <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">-</td>
        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">-</td>
        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">-</td>
<td scope="row" className="px-3 py-2 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white">
          <Button className="bg-green-800  text-white hover:bg-green-700">Buy</Button>
        </td>
        <td scope="row" className="px-3 py-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <Button className="bg-red-800 text-white hover:bg-red-700">Sell</Button>
        </td>
        <td scope="row" className="px-3 py-2 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <Button className="bg-red-800 text-white hover:bg-red-700">Delete</Button>    
        </td>
      </tr>
    ))}
  </tbody>
</table>
) : (
<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
      {Object.keys(tableDatafetch[0]).map((key) => (
        <th key={key} scope="col" className="px-6 py-3">
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </th>
        
      ))}
      <th scope="col" className="px-6 py-3">Buy</th>
      <th scope="col" className="px-6 py-3">Sell</th>
      <th scope="col" className="px-6 py-3">Delete</th>
    </tr>
  </thead>
  <tbody>
    {tableDatafetch.map((row) => (
      <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        {Object.values(row).map((value, index) => (
          <td key={index} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {value}
          </td>
        ))}

        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <Button className="bg-green-800 text-white hover:bg-green-700">Buy</Button>
        </td>
        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <Button className="bg-red-800 text-white hover:bg-red-700">Sell</Button>
        </td>
        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <Button className="bg-red-800 text-white hover:bg-red-700">Delete</Button>    
        </td>
      </tr>
    ))}
  </tbody>
</table>
)}
</div>
</div>
</div>
                        
                        </>
)
}

export default Marketwatch