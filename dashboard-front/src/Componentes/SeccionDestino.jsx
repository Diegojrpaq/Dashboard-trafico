import React, { useContext } from 'react'
import GraphChart from './GraphChart';
import Graficalinea from './Graficalinea';
import { dataLogisticContext } from '../App';

export default function SeccionDestino(props) {

  const { dataLogisticState } = useContext(dataLogisticContext);
  const infoDestino = buscarDestino(dataLogisticState.Destinos, props.idDestino)





  return (
    <>
      <div className="row">
        <div className="col-12">
          <Tabla Destino={infoDestino}></Tabla>
        </div>
        <div className="col-4">{<GraphChart></GraphChart>}<h3>grafica de barras</h3></div>
        <div className="col-4"><Graficalinea></Graficalinea></div>
        <div className="col-4"><Graficalinea></Graficalinea></div>

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
          <th scope="col" key={"cabecera"}>Suma de M3 Sucursal X Destino <h4>{"("+Destino.nombre+")"}</h4></th>
          {
            Destino.mt3_vendidos_por_destino.map((Element, index) => {
              return (
                <th scope="col" key={index}>{Element.Destino}</th>

              )

            })
          }

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