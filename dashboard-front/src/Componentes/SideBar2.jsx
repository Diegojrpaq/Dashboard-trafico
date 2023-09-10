import React, { useContext } from 'react';
import '../Css/Sidebar2.css'
import { dataLogisticContext } from '../App';
import Logo from '../assets/img/logo.png'

export default function SideBar2() {


  return (
    <>
      <div className="sidebar d-none d-md-block">
        {/*  <!-- Contenido del sidebar --> */}

        <img src={Logo} alt="" className='img-fluid mb-4' />
        <p>Contenido del sidebar</p>

           
        <ul>

        </ul>
      </div>

    </>
  );
};