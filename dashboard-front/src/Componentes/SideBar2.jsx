import React, { useContext } from 'react';
import '../Css/Sidebar2.css'
import { globalData } from '../App';
import Logo from '../assets/img/logo.png'
import SHeaderList from './SHeaderList';
import SListItem from './SListItem';


export default function SideBar2() {
  const { destinosListState, toggleSidebar, sessionUserState, destinosListXllegar, destinosPlanRuta, destConfigLlegadas, userData } = useContext(globalData);
  const destinosList = destinosListState;
  const destinosXllegar = destinosListXllegar;
  let permisos = [];
  if (sessionUserState.User.permisos != null) { // Si el usuario tiene permisos que se agreguen al arreglo permisos
    permisos = [...sessionUserState.User.permisos];
  }
  let destinosConRutas = [];
  let sucursalesConRutas = [];
  destinosPlanRuta.map((destino) => {
    //Obtener los destinos que sus sucursales tengan rutas configuradas
    for (let i = 0; i < destino.sucursales.length; i++) {
      const sucursal = destino.sucursales[i];
      if (sucursal.rutas_configuradas != null) {
        destinosConRutas.push(destino);
        break;
      }
    }
    //Obtener las sucursales que tengan rutas
    for (let i = 0; i < destino.sucursales.length; i++) {
      const sucursal = destino.sucursales[i];
      if (sucursal.rutas_configuradas != null) {
        sucursalesConRutas.push(sucursal)
      }
    }
  })

  return (
    <>
      <div className={toggleSidebar ? "sidebar-hidden" : "sidebar d-none d-md-block"}>
        {/*  <!-- Contenido del sidebar --> */}
        <div className="sidebar-header">
          <img src={Logo} alt="" className='img-fluid mb-4' />
          <div className='col-3 d-none d-lg-flex flex-column justify-content-center align-items-end'>
            <div className='row'>
              <div className='col-1 d-flex justify-content-center align-items-center'>
                <i className="bi bi-person-circle fs-2 text-light"></i>
              </div>
              <div className='col d-none d-lg-flex flex-column justify-content-center align-items-start'>
                <span className='spanUser' style={{ "color": "white" }}>
                  {userData ? userData.nombre : ""}
                </span>
                <span className='spanPuesto'>
                  {userData ? userData.puesto : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
        <SHeaderList title="Incidencias" icon='bi bi-clipboard2-data' idcollapse='1'>

          
              <SListItem icon='bi bi-bar-chart me-4' url={'/incidencias/Dashboard'}>DashBoard</SListItem>
              <SListItem icon='bi bi-columns-gap me-4' url={'/incidencias/Tablero'}>Tablero de Incidencias</SListItem>
              <SListItem icon='bi bi-graph-up-arrow me-4' url={'/incidencias/Incidencias'}>Incidencias</SListItem>
              <SListItem icon='bi bi-gear-wide-connected me-4' url={'/incidencias/Configuraciones'}>Configuracion</SListItem>
              
{/* 
          {
            permisos?.includes(31) ?
              <SHeaderList title="Planeacion de Rutas" icon='bi bi-map' key={2} idcollapse='2'>
                {
                  destinosConRutas && destinosConRutas.map((destino, index) => {
                    return (
                      destino.sucursales &&
                      <SHeaderList title={destino.nombre} icon='bi bi-geo-alt mx-1' key={destino.id + 100 + index} idcollapse={destino.id + 100}>
                        {
                          destino?.sucursales?.map((sucursal) => {
                            if (sucursal.rutas_configuradas) {
                              return (
                                <SHeaderList title={sucursal.nombre_sucursal} icon='bi bi-shop-window mx-1' key={sucursal.id_sucursal + 200} idcollapse={sucursal.id_sucursal + 200}>
                                  {sucursal?.rutas_configuradas?.map((ruta) => {
                                    return <SListItem icon='bi bi-bus-front mx-3' key={ruta.id_ruta + 'suc'} url={'/trafico/planeacion/' + sucursal.id_sucursal + '/' + ruta.id_ruta}>{ruta.nombre_ruta}</SListItem>
                                  })}
                                </SHeaderList>
                              )
                            }
                          })
                        }
                      </SHeaderList>
                    )
                  })
                }
              </SHeaderList>
              :
              <></>
          } */}

        {/*   {
            permisos.includes(32) ?
              <SHeaderList title="Plan Llegada Destinos Por Recibir" icon='bi bi-clipboard2-check-fill' key={5} idcollapse='5'>
                {
                  destConfigLlegadas && destConfigLlegadas.map((destino) => {
                    return (
                      <SListItem icon='bi bi-geo-alt mx-1' key={destino.id + destino.nombre} url={'/trafico/planeacionLlegadas/' + destino.id}>{destino.nombre}</SListItem>
                    )
                  })
                }
              </SHeaderList>
              : <></>
          }

          {
            //Plan Grafo
            permisos.includes(32) ?
              <SHeaderList title="Plan Llegada Destinos Para Enviar" icon='bi bi-clipboard2-check-fill' key={6} idcollapse='6'>
                {
                  destConfigLlegadas && destConfigLlegadas.map((destino) => {
                    return (
                      <SListItem icon='bi bi-geo-alt mx-1' key={destino.id + destino.nombre} url={'/trafico/planLlegadaGrafo/' + destino.id}>{destino.nombre}</SListItem>
                    )
                  })
                }
              </SHeaderList>
              : <></>
          }


          {
            permisos.includes(32) ?
              <SHeaderList title="Viajes Activos" icon='bi bi-geo-alt-fill' key={3} idcollapse='3'>
                {
                  destinosList && destinosList.map((destino) => {
                    return (
                      <SListItem icon='bi bi-geo-alt mx-1' key={destino.id + destino.nombre} url={'/trafico/viajesactivos/' + destino.id}>{destino.nombre}</SListItem>
                    )
                  })
                }
              </SHeaderList>
              : <></>
          }

          {
            permisos.includes(33) ?
              <SHeaderList title="Viajes por Llegar" icon='bi bi-airplane-fill' key={4} idcollapse='4'>
                {
                  destinosXllegar && destinosXllegar.map((destino) => {
                    return (
                      <SListItem icon='bi bi-geo-alt mx-1' key={destino.id} url={'/trafico/viajesxllegar/' + destino.id}>{destino.nombre}</SListItem>
                    )
                  })
                }
              </SHeaderList>
              : <></>
          }

          {
            permisos.includes(34) ?
              <SListItem icon='bi bi-geo-alt mx-2' url={'/trafico/viajesHistorico'}>Histórico</SListItem>
              : <></>
          }
          {
            permisos.includes(36) ?
              <SListItem icon='bi bi-file-earmark-spreadsheet mx-2' url={'/trafico/reporteViajes'}>Reporte Viajes Histórico</SListItem>
              : <></>
          }
          {
            permisos.includes(37) ?
              <SListItem icon='bi bi-file-earmark-spreadsheet mx-2' url={'/trafico/reporteRuta'}>Análisis Rutas</SListItem>
              : <></>
          } */}
        </SHeaderList>
      </div>
    </>
  );
};