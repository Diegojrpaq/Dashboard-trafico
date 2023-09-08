import React, { useContext } from 'react';
import { dataLogisticContext } from '../App';

export default function SideBar() {

  const { dataLogisticState, setRenderInicial } = useContext(dataLogisticContext);

  const handleClick = (info) => {
    setRenderInicial(info);
  }
  return (
    <>
      <div className="d-none d-md-block">
        <h1>SideBar</h1>
        <div className="accordion" id="accordionExample" >
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-controls="collapseOne">
                Destino One
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                {dataLogisticState.Destinos.map((Destino) => {
                  return (
                    <div className="form-check" key={Destino.id}>
                      <input className="form-check-input" type="checkbox" value="" id={Destino.id} />
                      <label className="form-check-label" htmlFor={Destino.id}>
                        {Destino.nombre}
                      </label>
                    </div>
                  )
                })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};