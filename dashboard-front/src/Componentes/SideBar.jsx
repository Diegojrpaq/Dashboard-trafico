import React, { useContext} from 'react';
import { dataLogisticContext } from '../App';

export default function SideBar() {

  const Data = useContext(dataLogisticContext);

  console.log('cargando dattos')
  



  if (Data === undefined) {
    console.log('ya recibimos' + Data)
    return (
      <>
      </>
    );
  } else {
    return (
      <>
        {
          console.log('nunca llega ' + Data)
        }
        <h1>SideBar</h1>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-controls="collapseOne">
                Destino One
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">



              {
                Data.Destinos.map((Destinos, index) => {
                  return (
                    <div className="accordion-body" id={"checkNum"+Destinos.id} for={Destinos.id}>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id={Destinos.id} />
                        <label className="form-check-label" for={Destinos.id}>
                          {Destinos.destino}
                        </label>
                      </div>
                    </div>
                  )
                })
              }



            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Accordion Item #3
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};