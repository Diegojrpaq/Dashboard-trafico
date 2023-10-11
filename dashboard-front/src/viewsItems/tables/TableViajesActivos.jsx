import React from 'react'
import { Table } from 'react-bootstrap';
export default function TableViajesActivos({ guias }) {

    const sumaVolumen = guias.reduce((acumulador, elemento) => {
        const suma = acumulador + elemento.volumen;
        const totalRedondeado = Number(suma.toFixed(2));
        return totalRedondeado;
    }, 0);
    const sumaPeso = guias.reduce((acumulador, elemento) => {
        const suma = acumulador + elemento.peso;
        const totalRedondeado = Number(suma.toFixed(2));
        return totalRedondeado;
    }, 0); 
    const sumaFlete = guias.reduce((acumulador, elemento) => {
        const suma = acumulador + elemento.flete;
        const totalRedondeado = Number(suma.toFixed(2));
        return totalRedondeado;
    }, 0); 
    const sumaMonto = guias.reduce((acumulador, elemento) => {
        const suma = acumulador + elemento.monto_seguro;
        const totalRedondeado = Number(suma.toFixed(2));
        return totalRedondeado;
    }, 0); 
    const sumaSubtotal = guias.reduce((acumulador, elemento) => {
        const suma = acumulador + elemento.subtotal;
        const totalRedondeado = Number(suma.toFixed(2));
        return totalRedondeado;
    }, 0); 

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
                            guias.map((guia, index) => {
                                return (
                                    <tr key={index}>
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
                         <tr>
                            <td></td>
                            <td></td>
                            <td><b>TOTALES</b></td>
                            <td><b>{sumaVolumen} mt3</b></td>
                            <td><b>{sumaPeso} Kg</b></td>
                            <td><b>$ {sumaFlete}</b></td>
                            <td><b>$ {sumaMonto}</b></td>
                            <td><b>$ {sumaSubtotal}</b></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </>
    )
}