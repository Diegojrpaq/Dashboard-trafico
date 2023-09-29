import React from 'react'
import { useState, useEffect } from 'react'
import GraficaRutasActivas from '../../viewsItems/graphs/GraficaRutasActivas'
import { useParams } from 'react-router'
import TableViajesActivos from '../../viewsItems/tables/TableViajesActivos'
import SpinnerMain from '../../viewsItems/SpinnerMain'


export default function RutasActivas() {

  const { idDestino } = useParams()

  const [viajesActivos, setViajesActivos] = useState(null)

  useEffect(() => {



    const peticiones = async (id) => {
      const urlApiNextpack = '/trafico/get_viajeActivo/' + id;
      await fetch(urlApiNextpack)
        .then((resp) => {
          return resp.json();
        }).then((data) => {
          /* setDestinosList(data) */
          if (data) {
            setViajesActivos(data)

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
    peticiones(idDestino)
  }, [idDestino]);


 
  if(viajesActivos != null) {
    return (
      <>
        <div className="col-12 col-md-12  p-1">
          <div className="col-item shadow p-3 mb-4 mx-0 rounded">
            <GraficaRutasActivas />
            
                <TableViajesActivos
                  nombreRuta={viajesActivos}
                />
               
  
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
