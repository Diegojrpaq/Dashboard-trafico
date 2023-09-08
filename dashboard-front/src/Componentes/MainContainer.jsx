import React from 'react'

export default function MainContainer() {
  return (
    <>
        <div className="container-rigth d-flex">
          {/*  <!-- Contenedor principal --> */}
          <div className="main-container container-fluid">
            {/*   <!-- Dos filas y tres columnas --> */}
            <div className="row">
              <div className="col-12">
                <div className='col-item shadow p-3 mb-4 bg-body rounded'>

                  <h1>Trafico</h1>
                </div>

              </div>
              <div className="col-md-6 ">
                <div className="col-item  shadow p-3 mb-4 bg-body rounded">
                  <h1>Cr-19</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, debitis non. Adipisci omnis iste
                    earum
                    delectus quam magni accusantium eum architecto laboriosam placeat! Excepturi nisi quibusdam
                    eligendi
                    vero? Est, provident.</p>
                </div>
              </div>
              <div className="col-md-6 ">
                <div className="col-item  shadow p-3 mb-4 bg-body rounded">
                  <h1>Cr-19</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, debitis non. Adipisci omnis iste
                    earum
                    delectus quam magni accusantium eum architecto laboriosam placeat! Excepturi nisi quibusdam
                    eligendi
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
