import React,{useEffect} from 'react'
import { useParams, useNavigate } from 'react-router'
import GraficaRutasXLlegar from '../../viewsItems/graphs/GraficaRutasXLlegar'
import TableViajesActivos from '../../viewsItems/tables/TableViajesActivos'
import TableRutaXLlegar from '../../viewsItems/tables/TableRutaXLlegar'

export default function RutasXLlegar() {

  const { idDestino } = useParams()

  useEffect(() => {
    const peticiones = async (id) => {
      const urlApiNextpack = '/trafico/get_viajeActivo/' + id;
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
    peticiones(idDestino)
    return () => {
      setViajesActivos(null)
    };
  
  }, [idDestino]);


  return (
   <>
    <div><h5 style={{color:"black"}}>
      no mas en construccion 
      </h5></div>
      <GraficaRutasXLlegar/>
      <TableRutaXLlegar/>
   </>
  )
}
