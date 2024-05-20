import React from 'react'
import Card from 'react-bootstrap/Card';
import { formattedCantidad } from '../../utileria/utils';
export default function CardPromedio({ title, suma, signo, totalViajes }) {
    const promedio = suma / totalViajes;
    let promFormatted;
    let sumaFormatted;
    promFormatted = formattedCantidad(promedio);
    sumaFormatted = formattedCantidad(suma);
    return (
        <>
            <Card border="primary my-2" style={{ width: '16rem', height: 'auto' }}>
                <Card.Header className='text-light fs-5' style={{ backgroundColor: "rgb(49 64 81)" }}>{title}</Card.Header>
                <Card.Body>
                    {/* <Card.Title className='fs-5'><span className='badge bg-dark'>Promedio:</span> <span className='badge bg-success fs-6 text-center'>{signo === "$" ? signo + promFormatted : promFormatted + " " + signo}</span></Card.Title>
                    <Card.Text>
                        <span className='badge bg-dark fs-6'>Total:</span> <span className='badge bg-success fs-6'>{signo === "$" ? signo + sumaFormatted : sumaFormatted + " " + signo}</span>
                    </Card.Text> */}
                    <Card.Title className='fs-5'><span>Promedio:</span> <span>{signo === "$" ? signo + promFormatted : promFormatted + " " + signo}</span></Card.Title>
                    <Card.Text>
                        <span>Total:</span> <span>{signo === "$" ? signo + sumaFormatted : sumaFormatted + " " + signo}</span>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}
