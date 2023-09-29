import React from 'react'
import { Accordion, Table } from 'react-bootstrap';
export default function TableViajesActivos({ nombreRuta }) {
    console.log('Holaaa', nombreRuta)
    return (
        <>
            {

                nombreRuta && nombreRuta.viajes_activos.map((ruta, index) => {
                    let guias;
                    console.log('Map', ruta)
                    if (ruta.catalogoGuias != null) {
                        console.log(ruta.catalogoGuias)
                        guias = ruta.catalogoGuias;
                        console.log('Guiaaas', guias)
                        return (
                            <Accordion alwaysOpen={true}>
                                <Accordion.Item eventKey={index}>
                                    <Accordion.Header>
                                        {ruta.nombre}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div className='table-responsive'>
                                            <Table striped bordered hover size='md'>
                                                <thead>
                                                    <tr>
                                                        <th>Numero Guía</th>
                                                        <th>Origen</th>
                                                        <th>Destino</th>
                                                        <th>Volumen</th>
                                                        <th>Peso</th>
                                                        <th>Flete</th>
                                                        <th>Monto Seguro</th>
                                                        <th>Subtotal</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        guias.map((guia, index) => {
                                                            return (
                                                                <tr>
                                                                    <td>{guia.numGuia}</td>
                                                                    <td>{guia.origen}</td>
                                                                    <td>{guia.destino}</td>
                                                                    <td>{guia.volumen}</td>
                                                                    <td>{guia.peso}</td>
                                                                    <td>{guia.flete}</td>
                                                                    <td>{guia.monto_seguro}</td>
                                                                    <td>{guia.subtotal}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </Table>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        )
                    } else {
                        console.log("No hay viajes")
                        return (
                            <Accordion>
                                <Accordion.Item>
                                    <Accordion.Header>
                                        {ruta.nombre}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <h6>No hay guías en este viaje</h6>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        )
                    }

                })
            }
        </>
    )
}