import React, { useState, useEffect, useContext, useMemo } from 'react'
import GraficaRutasActivas from '../../viewsItems/graphs/GraficaRutasActivas'
import { useParams, useNavigate } from 'react-router'
import TableViajesActivos from '../../viewsItems/tables/TableViajesActivos'
import SpinnerMain from '../../viewsItems/SpinnerMain'
import { Accordion } from 'react-bootstrap';
import { ConvertirFecha } from '../../utileria/utils'
import { diferenciaFechas } from '../../utileria/utils'
import { globalData } from '../../App'
import { urlapi } from '../../utileria/config'

export default function RutasActivas() {

  const { idDestino } = useParams()

  const [viajesActivos, setViajesActivos] = useState(null)
  const [catalogoDestinoFinal, setCatalogoDestinoFinal] = useState(null)
  const { destinosListState, btnSwitch } = useContext(globalData)
  const navigate = useNavigate();
  const timer = 300000 // Duración de 1min, para 5 min son 300,000
  const peticiones = async (id) => {
    const urlApiNextpack = urlapi + '/trafico/get_viajeActivo/' + id;
    await fetch(urlApiNextpack)
      .then((resp) => {
        return resp.json();
      }).then((data) => {
        /* setDestinosList(data) */
        if (data) {
          setViajesActivos(data.viajes_activos)
          setCatalogoDestinoFinal(data.catalogoDestinos)

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

  useEffect(() => {
    peticiones(idDestino)
    if (!btnSwitch) {
      const interval = setInterval(() => {
        //console.log("Interval", idDestino)
        peticiones(idDestino)
      }, timer)
      return () => {
        clearInterval(interval)
        setViajesActivos(null)
      };
    }
    return () => {
      setViajesActivos(null)
    };
  }, [idDestino, btnSwitch]);

  const idDestinos = useMemo(() => [], [])
  const [indexAct, setIndexAct] = useState(0);

  destinosListState?.map((destino) => {
    idDestinos.push(destino.id)
  })
  useEffect(() => {
    if (btnSwitch) {
      const intervalId = setInterval(() => {
        navigate(`/trafico/viajesactivos/${idDestinos[indexAct]}`);
        setIndexAct((prevIndex) =>
          prevIndex === idDestinos.length - 1 ? 0 : prevIndex + 1
        );
      }, timer);
      return () => clearInterval(intervalId)
    }
  }, [navigate, indexAct, idDestinos, btnSwitch])

  if (viajesActivos != null) {
    return (
      <>
        <div className="col-12 col-md-12  p-1">
          <div className="col-item shadow p-3 mb-4 mx-0 rounded">
            <GraficaRutasActivas viajesList={viajesActivos} catalogoDestinoFinal={catalogoDestinoFinal} />

            {
              viajesActivos && viajesActivos.map((ruta, index) => {
                let guias;
                const totalGuias = ruta.catalogoGuias?.length
                const fecha = ConvertirFecha(ruta.fecha_registro)
                const infoRuta = {
                  nombreRuta: ruta.nombre,
                  fecha: fecha,
                }
                if (ruta.catalogoGuias != null) {
                  guias = ruta.catalogoGuias;
                  return (
                    <Accordion key={index}>
                      <Accordion.Item eventKey={index}>
                        <Accordion.Header>
                          <div className='container'>
                            <div className='row'>
                              <div className={`col ${diferenciaFechas(ruta?.fecha_registro)}`}>{ruta.nombre}</div>
                              <div className={`col ${diferenciaFechas(ruta?.fecha_registro)}`}>Vehículo: {ruta.Clave_vehiculo}</div>
                              <div className={`col ${diferenciaFechas(ruta?.fecha_registro)}`}>Fecha: {fecha}</div>
                              <div className={`col ${diferenciaFechas(ruta?.fecha_registro)}`}>Total guías: {totalGuias}</div>
                            </div>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <TableViajesActivos
                            guias={guias}
                            infoRuta={infoRuta}
                          />
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  )
                } else {
                  return (
                    <Accordion key={index}>
                      <Accordion.Item eventKey={index}>
                        <Accordion.Header>
                          <div className='container'>
                            <div className='row'>
                              <div className={`col ${diferenciaFechas(ruta?.fecha_registro)}`}>{ruta.nombre}</div>
                              <div className={`col ${diferenciaFechas(ruta?.fecha_registro)}`}>Vehículo: {ruta.Clave_vehiculo}</div>
                              <div className={`col ${diferenciaFechas(ruta?.fecha_registro)}`}>Fecha: {fecha}</div>
                              <div className={`col ${diferenciaFechas(ruta?.fecha_registro)}`}>Total guías: 0</div>
                            </div>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <h6>No hay guías en este viaje</h6>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  )
                }
              })
            }
          </div>
        </div>
      </>
    )
  } else {
    return (
      <SpinnerMain />
    )
  }
}
