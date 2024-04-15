import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import * as React from 'react';
import { HoroscopoContextProvider } from "./context/HoroscopoContextProvider.tsx";
import { Home } from "./Components/Home/Home.tsx";
import { Navbar } from "./Components/Navbar/Navbar.tsx";
import { DetailsHoroscopo } from "./Components/DetailsHoroscopo/DetailsHoroscopo.tsx";
import { Error } from "./Components/Error/Error.tsx";
import { Footer } from "./Components/Footer/Footer.tsx";
import './App.css'

function App() {

  return (
    <>
      <HoroscopoContextProvider>
        <BrowserRouter>
          <Link to="/"><h1 className="bg-primary p-4 text-black">Horóscopo</h1></Link>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<Home />} />
            <Route path="/:id" element={<DetailsHoroscopo />} /> 
            <Route path="*" element={<Error id={2} code={404}  />} />

          </Routes>
          <Footer />
        </BrowserRouter>
      </HoroscopoContextProvider>
    </>
  )
}

export default App
