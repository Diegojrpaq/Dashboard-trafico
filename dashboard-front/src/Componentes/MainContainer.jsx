import React from 'react'
import '../Css/MainContainer.css'
import Logo from '../assets/img/logo.png'
import GraficaBarrasPrueba from './GraficaBarrasPrueba'
import Spinner from 'react-bootstrap/Spinner';
import { Accordion, Table } from 'react-bootstrap';

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


                <Spinner animation="border" variant="secundary" role="status" className='Spinner-Graph'>

                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <GraficaBarrasPrueba />
              </div>

            </div>
            <div className="12">
              <div className="col-item shadow p-3 rounded mb-4">
                <h3>Detalles</h3>
                import Accordion from 'react-bootstrap/Accordion';



                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Tabla 1 </Accordion.Header>
                    <Accordion.Body>
                      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque quam mollitia eligendi odio, quas optio dignissimos incidunt consequuntur a! Labore numquam nulla fugit quos quidem neque vero nobis repellat iure ipsam dolores fuga molestias hic, aperiam magni dolore culpa nostrum accusantium necessitatibus. Vel optio, eius odit tempore unde deserunt totam!
                      </p>


                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Accordion Item #2</Accordion.Header>
                    <Accordion.Body>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                      minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                      aliquip ex ea commodo consequat. Duis aute irure dolor in
                      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                      culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>


              </div>
            </div>
            <div className="col-md-5 ">
              <div className="col-item  shadow p-3 mb-4 bg-body rounded">
                <h1>Cr-19</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, debitis non. Adipisci omnis iste
                  earum
                  delectus quam magni accusantium eum architecto laboriosam placeat! Excepturi nisi quibusdam
                  eligendi
                  vero? Est, provident.</p>
              </div>
            </div>
            <div className="col-md-2 ">
              <div className="col-item  shadow p-3 mb-4 bg-body rounded">
                <h1>Cr-19</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, debitis non. Adipisci omnis iste
                  earum
                  delectus quam magni accusantium eum architecto laboriosam placeat! Excepturi nisi quibusdam
                  vero? Est, provident.</p>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className="col-item  shadow p-3 mb-5 bg-body rounded">
                <h1>Cr-19</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, debitis non. Adipisci omnis iste
                  earum
                  delectus quam magni accusantium eum architecto laboriosam placeat! Excepturi nisi quibusdam
                  eligendi
                  vero? Est, provident.</p>
              </div>
            </div>
            <div className="col-4 ">
              <div className="col-item shadow p-3 bg-body rounded">
                <h1>imagen
                </h1>
                <img
                  src={Logo}
                  alt=""
                  className='img-fluid'
                />
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
