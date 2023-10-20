import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import GraficaBarrasPrueba from '../../Componentes/GraficaBarrasPrueba'
import { Accordion, Spinner, Table } from 'react-bootstrap';
import GraficaPlaneacion from '../../viewsItems/graphs/GraficaPlaneacion';
import TablePlaneacion from '../../viewsItems/tables/TablePlaneacion';
import TableTreePlaneacion from '../../viewsItems/tables/TableTreePlaneacion';

export default function PlaneacionRutas() {
    const { idDestino, idRuta } = useParams()
    const [planRuta, setPlanRuta] = useState(null)
    console.log(idDestino, idRuta)
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
    console.log(planRuta)
    return (
        <>
            {
                planRuta ? <div className="col-12 col-md-12 p-1">
                <div className="col-item shadow p-3 mb-4 mx-0 rounded">
                    <h1 className="mb-4">Trafico</h1>
                    <GraficaBarrasPrueba />
                    <GraficaPlaneacion
                        planRuta={planRuta}
                    />
                    <h3>Detalles</h3>
                    <Accordion defaultActiveKey={['0']} alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>METRICAS</Accordion.Header>
                            <Accordion.Body>
                                {/* <div className="table-responsive">
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
                                </div> */}
                            
                            <TablePlaneacion
                                nombreRuta={planRuta?.rutas[0]?.nombre}
                                guiasPlaneadas={planRuta?.rutas[0]?.catalogoGuiasPlaneadas}
                                guiasEmbarcadas={planRuta?.rutas[0]?.catalogoGuiasEmbarcadas}
                            />

                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>HISTORIAL DE GUIAS</Accordion.Header>
                            <Accordion.Body>
                                {/* <div className="table-responsive">
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
                                </div> */}
                                <TableTreePlaneacion 
                                    guiasPlaneadas={planRuta?.rutas[0]?.catalogoGuiasPlaneadas}
                                    catalogoSuc={planRuta?.sucursales}
                                    guiasEmbarcadas={planRuta?.rutas[0]?.catalogoGuiasEmbarcadas}
                                />

                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
            :
            <Spinner className='text-dark'/>
            }
        </>
    )
}
