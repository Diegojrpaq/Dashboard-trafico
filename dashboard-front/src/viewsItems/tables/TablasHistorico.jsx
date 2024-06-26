import React from 'react'
import { Accordion } from 'react-bootstrap';
import TablaBitacora from './TablaBitacora'
import TablaHistoricoGuias from '../../viewsItems/tables/TablaHistoricoGuias';
import { guiasFilter, bitacoraVSembarcadas, formattedCantidad, formattedNumber } from '../../utileria/utils';
import TablaErrorViaje from './TablaErrorViaje';
export default function TablasHistorico(props) {
    if (props.info.catalogoGuias != null) {
        const totalVolumen = (guiasFiltradas) => {
            const sumaVolumen = guiasFiltradas.reduce((acumulador, elemento) => {
                const suma = acumulador + elemento.volumen;
                const totalRedondeado = Number(suma.toFixed(2));
                return totalRedondeado;
            }, 0);
            return sumaVolumen;
        }

        const totalPeso = (guiasFiltradas) => {
            const sumaPeso = guiasFiltradas.reduce((acumulador, elemento) => {
                const suma = acumulador + elemento.peso;
                const totalRedondeado = Number(suma.toFixed(2));
                return totalRedondeado;
            }, 0);
            return formattedCantidad(sumaPeso);
        }

        const totalSubtotal = (guiasFiltradas) => {
            const sumaTotal = guiasFiltradas.reduce((acumulador, elemento) => {
                const suma = acumulador + elemento.subtotal;
                const totalRedondeado = Number(suma.toFixed(2));
                return totalRedondeado;
            }, 0);
            return formattedNumber(sumaTotal);
        }

        const arrAnterior = (arr, item) => {
            const index = arr.findIndex(obj => obj.id === item);
            if (index === 0 || index === -1) {
                return null;
            }
            return index - 1;
        }

        const guiasSubidasAntes = (arrParadas, ubicacionAct, catGuias) => {
            const index = arrParadas.findIndex(obj => obj.id === ubicacionAct);
            let destinosAnteriores;
            let newArr = [];
            let newArr2 = [];
            if (index !== 0 && index !== -1) {
                destinosAnteriores = arrParadas.slice(0, index);
            } else {
                return {
                    newArr: null,
                    newArr2: null
                };
            }

            destinosAnteriores.forEach(destino => {
                newArr = [...newArr, ...guiasFilter(catGuias, 17, destino.id)];
                newArr2 = [...newArr2, ...guiasFilter(catGuias, 18, destino.id)]
            });

            return {
                newArr,
                newArr2
            };
        }

        const viajeError = bitacoraVSembarcadas(props.paradas, props.info.catalogoGuias);

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
                                        <div className="col fs-5 border-bottom border-dark mb-2" style={{ width: "200px" }}>{parada.nombre}</div>
                                        <div className='row  p-1 mb-1 mt-1 fs-5'>
                                            <div className="col fs-5 text-success ">SUBIDO <i className="bi bi-arrow-right-square-fill mx-2"></i></div>
                                            <div className="col"><i className="bi bi-arrow-right-square-fill text-success"></i> Total guías: {guiasFilter(props.info.catalogoGuias, 17, parada.id).length}</div>
                                            <div className="col"><i className="bi bi-arrow-right-square-fill text-success"></i> Volumen: {totalVolumen(guiasFilter(props.info.catalogoGuias, 17, parada.id))} mt3</div>
                                            <div className="col"><i className="bi bi-arrow-right-square-fill text-success"></i> Peso: {totalPeso(guiasFilter(props.info.catalogoGuias, 17, parada.id))} kg</div>
                                            <div className="col"><i className="bi bi-arrow-right-square-fill text-success"></i> Subtotal: {totalSubtotal(guiasFilter(props.info.catalogoGuias, 17, parada.id))}</div>
                                        </div>
                                        <div className='row p-1 mb-1 mt-1 fs-5'>
                                            <div className="col fs-5 text-danger">BAJADO <i className="bi bi-arrow-left-square-fill"></i></div>
                                            <div className="col"><i className="bi bi-arrow-left-square-fill text-danger"></i> Total guías: {guiasFilter(props.info.catalogoGuias, 18, parada.id).length}</div>
                                            <div className="col"><i className="bi bi-arrow-left-square-fill text-danger"></i> Volumen: {totalVolumen(guiasFilter(props.info.catalogoGuias, 18, parada.id))} mt3</div>
                                            <div className="col"><i className="bi bi-arrow-left-square-fill text-danger"></i> Peso: {totalPeso(guiasFilter(props.info.catalogoGuias, 18, parada.id))} kg</div>
                                            <div className="col"><i className="bi bi-arrow-left-square-fill text-danger"></i> Subtotal: {totalSubtotal(guiasFilter(props.info.catalogoGuias, 18, parada.id))}</div>
                                        </div>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <TablaHistoricoGuias
                                        guias={props.info.catalogoGuias}
                                        guiasSubidas={guiasFilter(props.info.catalogoGuias, 17, parada.id)}
                                        guiasBajadas={guiasFilter(props.info.catalogoGuias, 18, parada.id)}
                                        guiasAnterior={guiasSubidasAntes(props.paradas, parada.id, props.info.catalogoGuias)}
                                        idUbicacion={parada.id}
                                        infoRuta={props.info} />
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    ))
                }


                {
                    viajeError.error === true ?
                        <>
                            < Accordion key={1000} className='mb-3'>
                                <Accordion.Item eventKey={100}>
                                    <Accordion.Header>
                                        <div className='container'>
                                            <div className="col fs-5 border-bottom border-dark mb-3" style={{ width: "200px" }}>Guías Error <i className="bi bi-x-square-fill text-danger"></i></div>
                                            <div className='row  p-1 mb-1 mt-1 fs-5'>
                                                <div className="col"><i className="bi bi-x-square-fill text-danger"></i> Total guías: {viajeError.guiasError.length}</div>
                                                <div className="col"><i className="bi bi-x-square-fill text-danger"></i> Volumen: {totalVolumen(viajeError.guiasError)} mt3</div>
                                                <div className="col"><i className="bi bi-x-square-fill text-danger"></i> Peso: {totalPeso(viajeError.guiasError)} kg</div>
                                                <div className="col"><i className="bi bi-x-square-fill text-danger"></i> Subtotal: {totalSubtotal(viajeError.guiasError)}</div>
                                            </div>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <TablaErrorViaje
                                            guias={viajeError.guiasError}
                                            infoRuta={props.info}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </>
                        : <></>
                }
            </div >
        )
    } else {
        <></>
    }
}
