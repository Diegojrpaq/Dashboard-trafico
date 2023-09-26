import React, { useContext, useEffect, useState } from 'react';
import '../Css/Sidebar2.css'
import { destinosListContext, globalData } from '../App';
import Logo from '../assets/img/logo.png'
import SHeaderList from './SHeaderList';
import SListItem from './SListItem';
import { useParams } from 'react-router-dom';

export default function SideBar2() {

  const {sessionUserState} = useContext(globalData)
  const sessionUser=sessionUserState.User;
  const {setDestinosList} = useContext(globalData)
  console.log(sessionUser)
  const [destinosList, setDestinoList] = useState(null)

  const urlApiNextpack = '/trafico/get_destinos/'+ sessionUser.id;
  console.log(urlApiNextpack)
  
  useEffect(() => {
    console.log("entramos al efect")
    const peticiones = async () => {
      await fetch(urlApiNextpack)
        .then((resp) => {
          return resp.json();
        }).then((data) => {
          if (data) {
            console.log(data)
            setDestinoList(data.Destinos)
            setDestinosList(data.Destinos)
            //     Swal.fire(
              //   'Good job!',
                // 'Se recibio la informacion correctamente Nextpack',
                 //'success'
               //) 

          }
        }).catch(
          () => console.log('Error al cargar los destinos')
        )
    }

    peticiones();

  }, []);









  return (
    <>
      <div className="sidebar d-none d-md-block">
        {/*  <!-- Contenido del sidebar --> */}
        <div className="sidebar-header">
          <img src={Logo} alt="" className='img-fluid mb-4' />
          <h3>Dashboard</h3>
        </div>
        <SHeaderList title="Origenes" icon='bi bi-geo' idcollapse='2'>
          {
          /* destinosList.map((destino)=>{
              return(
                <SListItem icon='bi bi-geo-alt mx-1' key={destino.id} url= {'/trafico/'+ destino.id}>{destino.nombre}</SListItem>
              )
            }) */
           destinosList ? destinosList.map((destino)=>{
              return(
                <SListItem icon='bi bi-geo-alt mx-1' key={destino.id} url= {'/trafico/'+ destino.id}>{destino.destino}</SListItem>
              )
            }): console.log("cargando...")
          }
        {/*   <SListItem icon='bi bi-geo-alt mx-1' url={'/trafico/' + id_destino}>Guadalajara</SListItem>
          <SListItem icon='bi bi-geo-alt mx-1' url='/ventas/2'>Mexico</SListItem>
          <SListItem icon='bi bi-geo-alt mx-1' url='/trafico'>Queretaro</SListItem>
          <SListItem icon='bi bi-geo-alt mx-1'>Celaya</SListItem>
          <SListItem icon='bi bi-geo-alt mx-1'>Irapuato</SListItem>
          <SListItem icon='bi bi-geo-alt mx-1'>Aguascalientes</SListItem>
          <SListItem icon='bi bi-geo-alt mx-1'>CD. Obregon</SListItem> */}
        </SHeaderList>
        <SHeaderList title= 'ventas' idcollapse='3'>
        <SListItem icon= 'bi bi-curso-fill' url='/planeacion'>Planeacion</SListItem>
        <SListItem icon= 'bi bi-curso-fill' url='/rutasxllegar'>Rutas por Llegar</SListItem>
        <SListItem icon= 'bi bi-curso-fill' url='/rutasactivas'>Rutas Activas</SListItem>
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