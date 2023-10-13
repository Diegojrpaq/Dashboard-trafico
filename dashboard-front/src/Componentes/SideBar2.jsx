import React, { useContext, useEffect, useState } from 'react';
import '../Css/Sidebar2.css'
import { destinosListContext, globalData } from '../App';
import Logo from '../assets/img/logo.png'
import SHeaderList from './SHeaderList';
import SListItem from './SListItem';
import { useParams } from 'react-router-dom';

export default function SideBar2() {

  const { destinosListState} = useContext(globalData)
  const destinosList=destinosListState


console.log(destinosList)





  return (
    <>
      <div className="sidebar d-none d-md-block">
        {/*  <!-- Contenido del sidebar --> */}
        <div className="sidebar-header">
          <img src={Logo} alt="" className='img-fluid mb-4' />
          <h3>Dashboard</h3>
        </div>
        <SHeaderList title="Trafico" icon='bi bi-globe-americas' idcollapse='1'>
          <SHeaderList title="Planeacion de Rutas" icon='bi bi-map' idcollapse='2'>
            {
              destinosList && destinosList.map((destino) => {
                
                return ( 
                  destino.rutas_configuradas &&
                  <>
                  <SHeaderList title={destino.nombre} icon='bi bi-geo-alt mx-1' idcollapse={destino.id+100}>
                    {destino.rutas_configuradas.map((ruta)=>{
                      return <SListItem icon='bi bi-bus-front mx-1' key={ruta.id+'suc'} url={'/trafico/planeacion/' + destino.id+'/'+ruta.id_ruta}>{ruta.nombre_ruta}</SListItem>
                    })}
                  </SHeaderList>
                  </>
                )
              })
            }
          </SHeaderList>
          <SHeaderList title="Viajes Activos" icon='bi bi-geo-alt-fill' idcollapse='3'>
            {
              destinosList && destinosList.map((destino) => {
                return (
                  <SListItem icon='bi bi-geo-alt mx-1' key={destino.id} url={'/trafico/viajesactivos/' + destino.id}>{destino.nombre}</SListItem>
                )
              })
            }
          </SHeaderList>
      {/*     <SHeaderList title="Viajes por Llegar" icon='bi bi-geo-alt-fill' idcollapse='4'>
            {
              destinosList && destinosList.map((destino) => {
                return (
                  <SListItem icon='bi bi-geo-alt mx-1' key={destino.id} url={'/trafico/viajesxllegar/' + destino.id}>{destino.destino}</SListItem>
                )
              })
            }
          </SHeaderList> */}
          {/*   <SListItem icon='bi bi-geo-alt mx-1' url={'/trafico/' + id_destino}>Guadalajara</SListItem>
          <SListItem icon='bi bi-geo-alt mx-1' url='/ventas/2'>Mexico</SListItem>
          <SListItem icon='bi bi-geo-alt mx-1' url='/trafico'>Queretaro</SListItem>
          <SListItem icon='bi bi-geo-alt mx-1'>Celaya</SListItem>
          <SListItem icon='bi bi-geo-alt mx-1'>Irapuato</SListItem>
          <SListItem icon='bi bi-geo-alt mx-1'>Aguascalientes</SListItem>
          <SListItem icon='bi bi-geo-alt mx-1'>CD. Obregon</SListItem> */}
        </SHeaderList>

        {/*   <SHeaderList title="Ventas" icon='bi bi-coin' idcollapse='4'>
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
        </SHeaderList> */}
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