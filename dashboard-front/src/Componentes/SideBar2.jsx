import React, { useContext } from 'react';
import '../Css/Sidebar2.css'
import { globalData } from '../App';
import Logo from '../assets/img/logo.png'
import SHeaderList from './SHeaderList';
import SListItem from './SListItem';


export default function SideBar2() {
  const { destinosListState, toggleSidebar, sessionUserState, destinosListXllegar, destinosPlanRuta, destPlanLlegada } = useContext(globalData);
  const destinosList = destinosListState;
  const destinosXllegar = destinosListXllegar;
  const destinosPlanLlegada = destPlanLlegada.Destinos;
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
          <h3>Dashboard</h3>
        </div>
        <SHeaderList title="Trafico" icon='bi bi-globe-americas' idcollapse='1'>
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
          }

          {
            permisos.includes(32) ?
              <SHeaderList title="Planeación Llegadas" icon='bi bi-clipboard2-check-fill' key={5} idcollapse='5'>
                {
                  destinosXllegar && destinosXllegar.map((destino) => {
                    return (
                      <SListItem icon='bi bi-geo-alt mx-1' key={destino.id + destino.nombre} url={'/trafico/planeacionLlegadas/' + destino.id}>{destino.nombre}</SListItem>
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
            permisos.includes(32) ?
              <SListItem icon='bi bi-clipboard2-data mx-1' url={'/trafico/newView/'}>Resumen Planeación Rutas</SListItem>
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
          }
        </SHeaderList>
      </div>
    </>
  );
};