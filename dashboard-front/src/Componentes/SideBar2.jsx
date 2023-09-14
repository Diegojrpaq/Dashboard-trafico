import React, { useContext } from 'react';
import '../Css/Sidebar2.css'
import { Accordion, Card } from 'react-bootstrap';
import { dataLogisticContext } from '../App';
import Logo from '../assets/img/logo.png'

export default function SideBar2() {


  return (
    <>
      <div className="sidebar d-none d-md-block">
        {/*  <!-- Contenido del sidebar --> */}

        <img src={Logo} alt="" className='img-fluid mb-4' />
        <p>Contenido del sidebar</p>
        <p>
          <a
            href="#collapseExample"
            className='btn-collapse'
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
          >Destinos</a>
        </p>
        <div class="collapse" id="collapseExample">
         <ul>
          <li><a href="#" className=' btn-collapse'>
            Item</a></li>
          <li><a href="#" className='btn btn-collapse'>
            Item</a></li>
          <li><a href="#" className='btn btn-collapse'>
            Item</a></li>
         </ul>
        </div>
        <p>
          <a
            href="#collapseExample2"
            className='btn-collapse'
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample2"
          >Destinos</a>
        </p>
        <div class="collapse" id="collapseExample2">
         <ul>
          <li className='btn-collapse'><a href="#" >
            Item</a></li>
          <li className='btn-collapse'><a href="#" >
            Item</a></li>
          <li className='btn-collapse'><a href="#" >
            Item</a></li>
         </ul>
        </div>
      </div>
    </>
  );
};