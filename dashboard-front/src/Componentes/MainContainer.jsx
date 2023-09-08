import React from 'react'

export default function MainContainer() {
  return (
    <>
  


  <div className="container-fluid">
            <div className="row">
             
              <div className="col-10 col-md-10">
                {dataLogisticState.Destinos.map((Destino) => {
                  return <SeccionDestino key={Destino.nombre} idDestino={Destino.id} />; // Debes devolver algo en cada iteración
                })}

                {/*  <SeccionDestino idDestino={1} />
                <SeccionDestino idDestino={21} />
                <SeccionDestino idDestino={2} />
                <SeccionDestino idDestino={3} />
                <SeccionDestino idDestino={4} />
                <SeccionDestino idDestino={17} />
                <SeccionDestino idDestino={6} />
                <SeccionDestino idDestino={8} />
                <SeccionDestino idDestino={13} /> */}








                <div className="row">
                  <div className="col-xl-6 col-12">
                    <div className="contenedordechart">
                      {/*  <Graficalinea></Graficalinea> */}
                    </div>
                  </div>
                  <div className="col-xl-6 col-12">
                    <div className="contenedordechart">
                      {/* <GraphChart></GraphChart> */}
                    </div>
                  </div>
                  <div className="col-4"></div>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}
