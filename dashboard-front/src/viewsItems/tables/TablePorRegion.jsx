import React from 'react';
import { Table } from 'react-bootstrap';
import { formattedCantidad, formattedNumber } from '../../utileria/utils';
export default function TablePorRegion({ enSucursal, transbordo }) {
    return (
        <div className="table-responsive text-center mb-2">
            <Table striped bordered hover size='md'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Peso</th>
                        <th>Volumen</th>
                        <th>Flete</th>
                        <th>Seguro</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>En Sucursal</td>
                        <td>{formattedCantidad(enSucursal?.peso)} kg</td>
                        <td>{formattedCantidad(enSucursal?.volumen)} mt3</td>
                        <td>{formattedNumber(enSucursal?.flete)}</td>
                        <td>{formattedNumber(enSucursal?.montoSeguro)}</td>
                        <td>{formattedNumber(enSucursal?.subtotal)}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>Transbordo</td>
                        <td>{formattedCantidad(transbordo?.peso)} kg</td>
                        <td>{formattedCantidad(transbordo?.volumen)} mt3</td>
                        <td>{formattedNumber(transbordo?.flete)}</td>
                        <td>{formattedNumber(transbordo?.montoSeguro)}</td>
                        <td>{formattedNumber(transbordo?.subtotal)}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}
