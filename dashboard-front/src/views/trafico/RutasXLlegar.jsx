import React,{useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router'
import GraficaRutasXLlegar from '../../viewsItems/graphs/GraficaRutasXLlegar'
import TableViajesActivos from '../../viewsItems/tables/TableViajesActivos'
import TableRutaXLlegar from '../../viewsItems/tables/TableRutaXLlegar'
import SpinnerMain from '../../viewsItems/SpinnerMain'

export default function RutasXLlegar() {

  const { idDestino } = useParams()
  const[ viajesList, setViajesList]= useState(null)

  useEffect(() => {
    const peticiones = async (id) => {
      const urlApiNextpack = '/trafico/get_viajesxllegar/' + idDestino;
      await fetch(urlApiNextpack)
        .then((resp) => {
          return resp.json();
        }).then((data) => {
          if (data) {
            setViajesList(data.viajes_activos) 
           //codigo si llego la info 

          }
        }).catch(
          () => console.log('Error al cargar los destinos')
        )
    }
    peticiones(idDestino)
    return () => {
      //setViajesActivos(null)
    };
  }, [idDestino]);

if(viajesList !=null){
  return (
    <>
     <div><h5 style={{color:"black"}}>
       no mas en construccion 
       </h5></div>
       <GraficaRutasXLlegar viajesList={viajesList } idDestino={idDestino}/>
       <TableRutaXLlegar/>
    </>
   )
}else{
  return (
    <SpinnerMain/>
  )
}
}
