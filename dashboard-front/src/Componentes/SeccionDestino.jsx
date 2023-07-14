import React, { useContext } from 'react'
import GraficaMt3PorSucursal from './GraficaMt3PorSucursal';
import Graficalinea from './Graficalinea';
import { dataLogisticContext } from '../App';
import GraficaRutas from './GraficaRutas';
import GraficaRutasNoEmbarcado from './GraficaRutasNoEmbarcado';
import GraficaNoEmbarcadaXSucursal from './GraficaNoEmbarcadaXSucursal';

export default function SeccionDestino(props) {

  const { dataLogisticState } = useContext(dataLogisticContext);
  const infoDestino = buscarDestino(dataLogisticState.Destinos, props.idDestino)



  return (
    <>
      <div className="row">
        <div className="col-12">
          <Tabla Destino={infoDestino}></Tabla>
        </div>
        {/* <div className="col-10">{<GraficaMt3PorSucursal destino={infoDestino}></GraficaMt3PorSucursal>}<h3>Venta en Tiempo Real</h3></div> */}
        <div className="col-11">{<GraficaRutas destino={infoDestino}></GraficaRutas>}<h3>Venta en Tiempo Real</h3></div>
        <div className="col-4">{<GraficaNoEmbarcadaXSucursal destino={infoDestino}></GraficaNoEmbarcadaXSucursal>}<h3>grafica sucursal no Embarcadas </h3></div>
        <div className="col-4">{<GraficaRutasNoEmbarcado destino={infoDestino}></GraficaRutasNoEmbarcado>}<h3>grafica Rutas  no Embarcadas </h3></div>
        <div className="col-4">{<GraficaRutas destino={infoDestino}></GraficaRutas>}<h3>grafica Rutas embarcadas</h3></div>
        {/* <div className="col-12 col-md-10 col-xl-4">{<GraficaMt3PorSucursal destino={infoDestino}></GraficaMt3PorSucursal>}<h3>grafica de barras</h3></div> */}


      </div>
    </>
  )



}


function Tabla(props) {
  const Destino = props.Destino;

  return (
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
              return (
                <td key={index}>{Element.Mt3_vendido + " mt3"}</td>
              )
            })
          }
          <td>{Destino.total_mt3_distino}</td>
        </tr>
      </tbody>
    </table>
  );

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