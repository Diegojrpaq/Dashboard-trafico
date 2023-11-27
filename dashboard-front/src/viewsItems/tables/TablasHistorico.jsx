import React from 'react'
import { Accordion } from 'react-bootstrap';
import TablaBitacora from './TablaBitacora'
import TablaHistoricoGuias from '../../viewsItems/tables/TablaHistoricoGuias';

export default function TablasHistorico(props) {
    return (
        <div>
            <Accordion className='mb-3'>
                <Accordion.Item>
                    <Accordion.Header>
                        <div className='container'>
                            <div className='row fs-5'>
                                Bitacora
                            </div>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <TablaBitacora info={props.info} />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            {
                props?.paradas.map((parada, index) => (
                    <Accordion key={index} className='mb-3'>
                        <Accordion.Item eventKey={index}>
                            <Accordion.Header>
                                <div className='container'>
                                    <div className="col fs-5">{parada.nombre}</div>
                                    <div className='row  p-1 mb-2 mt-1'>
                                        <div className="col fs-5 text-success ">SUBIDO <i class="bi bi-arrow-right-square-fill"></i></div>
                                        <div className="col">Volumen: x</div>
                                        <div className="col">Peso: x</div>
                                    </div>
                                    <div className='row p-1 mb-2 mt-1'>
                                        <div className="col fs-5 text-danger">BAJADO <i class="bi bi-arrow-left-square-fill"></i></div>
                                        <div className="col">Volumen: x</div>
                                        <div className="col">Peso: x</div>
                                    </div>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                {/* {
                    props.info.Bitacora.map((obj, index) => {
                      console.log(obj.Origen_Salida, parada.nombre , "Compar")
                      if(obj.Origen_Salida === parada.nombre) {
                        return (
                          <TablaBitacora info={props.info.Bitacora[index]}/>
                        )
                      }
                    })
                  } */}
                                <TablaHistoricoGuias guias={props.info.catalogoGuias} />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                ))
            }
        </div>
    )
}
