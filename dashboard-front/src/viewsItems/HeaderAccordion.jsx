import React from 'react';
import { diferenciaFechas } from '../utileria/utils';

export default function HeaderAccordion(props) {
    return (
        <div className='container'>
            <div className='row'>
                <div className={`col ${diferenciaFechas(props?.fecha_registro)}`}>
                    {props.nombre}
                </div>
                <div className={`col ${diferenciaFechas(props?.fecha_registro)}`}>
                    Vehículo: {props.Clave_vehiculo}
                </div>
                <div className={`col ${diferenciaFechas(props?.fecha_registro)}`}>
                    Fecha: {props.fecha}
                </div>
                <div className={`col ${diferenciaFechas(props?.fecha_registro)}`}>
                    Total guías: {props.totalGuias ? props.totalGuias : 0}
                </div>
            </div>
        </div>
    )
}
