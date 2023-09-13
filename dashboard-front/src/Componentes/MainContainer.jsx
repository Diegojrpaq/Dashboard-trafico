import React from 'react'
import '../Css/MainContainer.css'
import Logo from '../assets/img/logo.png'
import GraficaBarrasPruebaTopher from './GraficaBarrasPruebaTopher'
import Spinner from 'react-bootstrap/Spinner';
import { Accordion, Table } from 'react-bootstrap';
import GraficaBarrasPrueba from './GraficaBarrasPrueba';

export default function MainContainer() {
  return (
    <>
      <div className="container-rigth d-flex">
        {/*  <!-- Contenedor principal --> */}
        <div className="main-container container-fluid">
          {/*   <!-- Dos filas y tres columnas --> */}
          <div className="row">

            <div className="col-12 col-md-12">
              <div className='col-item shadow p-3 mb-4  rounded'>
                <h1 className='mb-4'>Trafico</h1>
                <h3>ORIGEN: Guadalajara - Gonzalez gallo</h3>
                
                <GraficaBarrasPrueba />
                <h3>Detalles</h3>
                <Accordion defaultActiveKey={['0']} alwaysOpen>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>METRICAS</Accordion.Header>
                    <Accordion.Body>
                      <Table striped bordered hover size='md'>
                        <thead>
                          <tr>
                            <th>Ruta</th>
                            <th>Peso Planeado</th>
                            <th>Volumen Planeado</th>
                            <th>Flete Planeado</th>
                            <th>Seguro</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Planeacion GUA-QRO-1</td>
                            <td>85,000 kg.</td>
                            <td>85 mt3</td>
                            <td>$ 25.800</td>
                            <td>$ 2800.00</td>
                            <td>$ 28,600.00</td>
                          </tr>
                        </tbody>
                        <thead>
                          <tr>
                            <th>Ruta</th>
                            <th>Peso Embarcada</th>
                            <th>Volumen Embarcada</th>
                            <th>Flete Embarcada</th>
                            <th>Seguro</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Embarcado </td>
                            <td>55,000 kg.</td>
                            <td>55 mt3</td>
                            <td>$ 19,000.00</td>
                            <td>$ 280.00</td>
                            <td>$ 19,280.00</td>
                          </tr>
                        </tbody>
                      </Table>

                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>HISTORIAL DE GUIAS</Accordion.Header>
                    <Accordion.Body>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Sucursal</th>
                            <th>Num-Guia</th>
                            <th></th>
                            <th>Peso</th>
                            <th>Volumen</th>
                            <th>Flete</th>
                            <th>Seguro</th>
                            <th>SubTotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Pablo Valdez </td>
                            <td></td>
                            <td></td>
                            <td>20,000kg</td>
                            <td>20 mt3</td>
                          </tr>
                          <tr>
                            <td></td>
                            <td>PVD-001</td>
                            <td>Si</td>
                            <td>1 kg</td>
                            <td>10 mt3</td>
                          </tr>
                          <tr>
                            <td></td>
                            <td>PVD-002</td>
                            <td>No</td>
                            <td>3 kg</td>
                            <td>30 mt3</td>
                          </tr>
                          <tr>
                            <td>Patria </td>
                            <td></td>
                            <td></td>
                            <td>20,000kg</td>
                            <td>20 mt3</td>
                          </tr>
                          <tr>
                            <td></td>
                            <td>PAT-001</td>
                            <td>No</td>
                            <td>1 kg</td>
                            <td>10 mt3</td>
                          </tr>
                          <tr>
                            <td></td>
                            <td>PAT-002</td>
                            <td>Si</td>
                            <td>3 kg</td>
                            <td>30 mt3</td>
                          </tr>
                          
                        </tbody>
                      </Table>

                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
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
