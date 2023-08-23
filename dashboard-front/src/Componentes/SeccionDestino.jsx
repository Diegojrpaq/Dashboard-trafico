import React, { useContext } from 'react'
import GraficaMt3PorSucursal from './GraficaMt3PorSucursal';
import Graficalinea from './Graficalinea';
import { dataLogisticContext } from '../App';
import GraficaRutas from './GraficaRutas';
import GraficaRutasNoEmbarcado from './GraficaRutasNoEmbarcado';
import GraficaNoEmbarcadaXSucursal from './GraficaNoEmbarcadaXSucursal';
import GraficaCargasPorLlegar from './GraficaCargasPorLLegar';

export default function SeccionDestino(props) {

  const { dataLogisticState } = useContext(dataLogisticContext);
  const infoDestino = buscarDestino(dataLogisticState.Destinos, props.idDestino)



  return (
    <>
      <div className="row">
        <div className="col-12">
          <Tabla Destino={infoDestino}></Tabla>
        </div>
        <div className="col-12 col-xl-11"><h3>Grafica Venta en Tiempo Real mt3</h3>{<GraficaMt3PorSucursal destino={infoDestino}></GraficaMt3PorSucursal>}</div>
       {/*  <div className="col-12"><h3>grafica sucursal no Embarcadas </h3>{<GraficaNoEmbarcadaXSucursal destino={infoDestino}></GraficaNoEmbarcadaXSucursal>}</div>
        <div className="col-12"><h3>grafica Viajes Embarcadas</h3>{<GraficaRutas destino={infoDestino}></GraficaRutas>}</div>
        <div className="col-12"><h3>Grafica Viajes por llegar</h3>{<GraficaCargasPorLlegar destino={infoDestino}></GraficaCargasPorLlegar>}</div> */}
        {/* <div className="col-6">{<GraficaRutasNoEmbarcado destino={infoDestino}></GraficaRutasNoEmbarcado>}<h3>grafica Rutas  no Embarcadas </h3></div> */}
        


      </div>
    </>
  )



}


function Tabla(props) {
  const Destino = props.Destino;

 if(Destino.sucursales != null){
  return (
    <div className="table-responsive">
      <table className="table table-hover">
      {/* Llenado de cabeceras */}
      <thead>
        <tr>
          <th scope="col" key={"cabecera"}>Suma de M3 Sucursal X Destino <h4>{"(" + Destino.nombre + ")"}</h4></th>
          {
            Destino.mt3_vendidos_por_destino.map((Element, index) => {
              return (
                <th scope="col" key={index}>{Element.Destino}</th>

              )

            })
          }
          <th><h3>Total</h3></th>
        </tr>
      </thead>

      {/* Llenado de cabeceras */}


      <tbody>
        {
          Destino.sucursales.map((Sucursal, index) => {
            return (
              <tr key={index}>
                <th scope="row" key={index}> {Sucursal.nombre}</th>
                {
                  Sucursal.mt3_por_destino.map((ventaxDestino, i) => {
                    return (<td key={i}>{ventaxDestino.Mt3_vendido}</td>)
                  })
                }
                <th>{Sucursal.total_mt3_sucursal}</th>


              </tr>
            )
          })
        }



        <tr>
          <th scope='row'><h3>Total</h3> </th>
          {
            Destino.mt3_vendidos_por_destino.map((Element, index) => {
              /* console.log(Element.Mt3_vendido) */
              return (
                <td key={index}>{Element.Mt3_vendido + " mt3"}</td>
              )
            })
          }
          <td>{Destino.total_mt3_distino}</td>
        </tr>
      </tbody>
    </table>
    </div>
  );
 }else{
  return(
    <h1>Este Destino no tiene venta {Destino.nombre}</h1>
  )
 }

}
/* Funciones utileria */
const buscarDestino = (arregloDestinos, idBuscado) => {

  for (let index = 0; index <= arregloDestinos.length; index++) {
    if (arregloDestinos[index].id === idBuscado) {
      return arregloDestinos[index];
    }
  }
  return -1;
}
/* Funciones utileria */