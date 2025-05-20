import {React, useState} from 'react'

import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Flex } from '@mantine/core';




const Funds = () => {
    const [selected, setSelected] = useState([])



  const paginationModel = { page: 0, pageSize: 5 };


const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  const columns = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];
  return (
    
    <>
    <h1 className="text-5xl ">Funds</h1>
     <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            className='text-black overflow-x-scroll scrollbar-hide'
            rows={rows} // Use filtereddata as rows
            // getRowId={(row) => row.orderid}
            columns={columns}
            
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]} // Enable page size options
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
    
    </>

  )
}

export default Funds