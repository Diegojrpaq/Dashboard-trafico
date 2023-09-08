import React, { useContext} from 'react';
import '../Css/Sidebar2.css'
import { dataLogisticContext } from '../App';

export default function SideBar2() {


    return (
      <>
        <div className="sidebar d-none d-md-block">
          {/*  <!-- Contenido del sidebar --> */}
          <h2>Sidebar</h2>
          <p>Contenido del sidebar</p>
          <ul>
            
          </ul>
        </div>
      {/* <div className="accordion" id="accordionExample" >
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
        </div> */}
      </>
    );
};