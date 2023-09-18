import React from 'react'
import '../Css/MainContainer.css'
import GraficaBarrasPruebaTopher from './GraficaBarrasPruebaTopher'
import Spinner from 'react-bootstrap/Spinner';
import { Accordion, Table } from 'react-bootstrap';
import GraficaBarrasPrueba from './GraficaBarrasPrueba';
import  Trafico  from './Trafico'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
export default function MainContainer() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Trafico/:id' element={<Trafico />} />
      </Routes>
    </BrowserRouter>
    
  )
}
