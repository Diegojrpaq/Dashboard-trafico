import React, { useContext } from 'react';
import '../Css/Sidebar2.css'
import { Accordion, Card } from 'react-bootstrap';
import { dataLogisticContext } from '../App';
import Logo from '../assets/img/logo.png'
import SHeaderList from './SHeaderList';
import SListItem from './SListItem';

export default function SideBar2() {


  return (
    <>
      <div className="sidebar d-none d-md-block">
        {/*  <!-- Contenido del sidebar --> */}

        <div className="sidebar-header">
          <img src={Logo} alt="" className='img-fluid mb-4' />
          <h3>Dashboard</h3>
        </div>
        <SHeaderList title="Origenes" icon='bi bi-geo' idcollapse='2'>
          <SListItem icon='bi bi-geo-alt mx-1'>Guadalajara</SListItem>
          <SListItem icon='bi bi-geo-alt mx-1'>Mexico</SListItem>
          <SListItem icon='bi bi-geo-alt mx-1'>Queretaro</SListItem>
          <SListItem icon='bi bi-geo-alt mx-1'>Celaya</SListItem>
          <SListItem icon='bi bi-geo-alt mx-1'>Irapuato</SListItem>
          <SListItem icon='bi bi-geo-alt mx-1'>Aguascalientes</SListItem>
          <SListItem icon='bi bi-geo-alt mx-1'>CD. Obregon</SListItem>
        </SHeaderList>
        <SHeaderList title="Ventas" icon='bi bi-coin' idcollapse='4'>
          <SListItem>hello</SListItem>
          <SListItem>hello</SListItem>
          <SListItem>hello</SListItem>
          <SListItem>hello</SListItem>
          <SListItem>hello</SListItem>
          <SListItem>hello</SListItem>
          <SListItem>hello</SListItem>
        </SHeaderList>
        <SHeaderList title="Sucursales" icon='bi bi-airplane' idcollapse='5'>
          <SListItem>hello</SListItem>
          <SListItem>hello</SListItem>
          <SListItem>hello</SListItem>
          <SListItem>hello</SListItem>
          <SListItem>hello</SListItem>
          <SListItem>hello</SListItem>
          <SListItem>hello</SListItem>
        </SHeaderList>
       {/*  <div>
          <a
            href="#collapseExample2"
            className='btn-collapse'
            data-bs-toggle="collapse"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample2"
          >Destinos</a>
        </div>
        <div className="collapse" id="collapseExample2">
          <ul>
            <li className='btn-collapse'><a href="#" >
              Item</a></li>
            <li className='btn-collapse'><a href="#" >
              Item</a></li>
            <li className='btn-collapse'><a href="#" >
              Item</a></li>
          </ul>
        </div> */}
      </div>
    </>
  );
};