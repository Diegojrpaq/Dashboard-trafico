import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Accordion, Spinner, Table } from 'react-bootstrap';
import GraficaPlaneacion from '../../viewsItems/graphs/GraficaPlaneacion';
import TablePlaneacion from '../../viewsItems/tables/TablePlaneacion';
import TableTreePlaneacion from '../../viewsItems/tables/TableTreePlaneacion';
import TableTreeEmbarcadas from '../../viewsItems/tables/TableTreeEmbarcadas';

export default function PlaneacionRutas() {
    const { idRuta } = useParams()
    const [planRuta, setPlanRuta] = useState(null)
    useEffect(() => {
        const peticiones = async (id) => {
            const urlApiNextpack = '/trafico/get_planRuta/' + id;
            await fetch(urlApiNextpack)
                .then((resp) => {
                    return resp.json();
                }).then((data) => {
                    if (data) {
                        //console.log(data)
                        setPlanRuta(data)
                    }
                }).catch(
                    () => console.log('Error al cargar los destinos')
                )
        }
        peticiones(idRuta)
        return () => {
            setPlanRuta(null)
        };
    }, [idRuta]);

    return (
        <>
            {
                planRuta ? <div className="col-12 col-md-12 p-1">
                    <div className="col-item shadow p-3 mb-4 mx-0 rounded">
                        <h1 className="mb-4">Trafico</h1>
                        <GraficaPlaneacion
                            planRuta={planRuta}
                        />
                        <h3>Detalles</h3>
                        <Accordion alwaysOpen>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>METRICAS</Accordion.Header>
                                <Accordion.Body>
                                    <TablePlaneacion
                                        nombreRuta={planRuta?.rutas[0]?.nombre}
                                        guiasPlaneadas={planRuta?.rutas[0]?.catalogoGuiasPlaneadas}
                                        guiasEmbarcadas={planRuta?.rutas[0]?.catalogoGuiasEmbarcadas}
                                    />
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>HISTORIAL DE GUIAS PLANEADAS</Accordion.Header>
                                <Accordion.Body>
                                    <TableTreePlaneacion
                                        guiasPlaneadas={planRuta?.rutas[0]?.catalogoGuiasPlaneadas}
                                        catalogoSuc={planRuta?.sucursales}
                                        guiasEmbarcadas={planRuta?.rutas[0]?.catalogoGuiasEmbarcadas}
                                    />
                                </Accordion.Body>
                            </Accordion.Item>
                            {
                                planRuta?.rutas[0]?.catalogoGuiasEmbarcadas != null ?
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>HISTORIAL DE GUIAS EMBARCADAS</Accordion.Header>
                                        <Accordion.Body>
                                            <TableTreeEmbarcadas
                                                guiasPlaneadas={planRuta?.rutas[0]?.catalogoGuiasPlaneadas}
                                                catalogoSuc={planRuta?.sucursales}
                                                guiasEmbarcadas={planRuta?.rutas[0]?.catalogoGuiasEmbarcadas}
                                            />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    : <></>
                            }
                        </Accordion>
                    </div>
                </div>
                    :
                    <Spinner className='text-dark' />
            }
        </>
    )
}
