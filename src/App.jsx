import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './components/login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider } from "@mantine/core";
import Dashboard from './components/Dashboard'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <MantineProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/home" element={<Dashboard/>} />
  
        </Routes>
      </Router>
    </MantineProvider>
    </>
  )
}

export default App

// import { useEffect } from "react";

// const App = () => {
//   useEffect(() => {
//     const handleKeyPress = (event) => {
//       if (event.key === "F1") {
//         event.preventDefault(); // Prevent default browser behavior (help menu)
//         window.open("https://cricbuzz.com/", "_blank"); // Open a page
//       }
//     };

//     window.addEventListener("keydown", handleKeyPress);
//     return () => {
//       window.removeEventListener("keydown", handleKeyPress);
//     };
//   }, []);

//   return <h1>Press F1 to Open a Page</h1>;
// };

// export default App;