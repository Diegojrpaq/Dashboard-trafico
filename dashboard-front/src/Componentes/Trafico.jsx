import React from 'react'
import { Accordion, Table } from 'react-bootstrap';
import GraficaBarrasPrueba from './GraficaBarrasPrueba';
import { useParams } from 'react-router-dom';
import TraficoInfo from './TraficoInfo';
function Trafico() {
    const destinos = {
        1: 'Guadalajara',
        2: 'Queretaro',
    }
    const { id } = useParams();

    return (
        <>
            <div className='col-item shadow p-3 mb-4  rounded'>
                <h1 className='mb-4'>Trafico</h1>
                <TraficoInfo />
                <hr></hr>
                <TraficoInfo />
            </div>

            {/*  <div className="container-fluid">
        <div className="row">

          <div className="col-10 col-md-10">
            {dataLogisticState.Destinos.map((Destino) => {
              return <SeccionDestino key={Destino.nombre} idDestino={Destino.id} />; // Debes devolver algo en cada iteración
            })}
          </div>
        </div>
      </div> */}
        </>
    )
}

export default Trafico