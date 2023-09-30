import React from 'react'
import { Table } from 'react-bootstrap';
export default function TableViajesActivos({ guias }) {
    console.log('Holaaa', guias)
    return (
        <>
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
                            guias.map((guia) => {
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
        </>
    )
}