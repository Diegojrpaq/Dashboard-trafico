import React from 'react';
import Card from 'react-bootstrap/Card';


export default function CardTotales({ title, suma, signo }) {
    return (
        <Card border="primary my-2" style={{ width: '15rem', height: 'auto' }}>
            <Card.Header className='text-light fs-5' style={{ backgroundColor: "rgb(49 64 81)" }}>{title}</Card.Header>
            <Card.Body>
                <Card.Text className='fs-5'><span>Total:</span> <span>{signo === "$" ? signo + suma : suma + " " + signo}</span></Card.Text>
            </Card.Body>
        </Card>
    )
}
