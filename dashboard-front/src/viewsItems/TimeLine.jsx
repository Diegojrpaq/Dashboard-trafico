import React from 'react'
import { Timeline } from 'primereact/timeline';

export default function TimeLine(props) {
    const listParadas = props.ListParadas;
    const viaje = props.info;


    const customizedMarker = (item) => {
        return (
            <span className="icon-timeline">
                <i className='bi bi-geo-alt-fill'></i>
            </span>
        );
    };

    return (
        <>
            <Timeline
                value={listParadas}
                align='alternate'
                layout="horizontal"
                opposite={(item) => <p className='h5'>{item.nombre}</p>}
                marker={customizedMarker}
                content={<span>&nbsp;</span>}
            />
            <div className="row">
                <div className='col-12 col-md-5'>
                    <h3>
                        Viaje: {viaje.nombre}
                    </h3>
                    <h3 className='mt-2'>
                        Num viaje: {viaje.id}
                    </h3>
                </div>
                <div className='col-12 col-md-6'>
                    <h3>
                        Tracto: {viaje.Clave_vehiculo}
                    </h3>
                    
                    {viaje.idCaja > 0 ? (
        <h3 className='mt-2'>Caja: {viaje.idCaja}</h3>
      ) : null}
                    
                </div>
            </div>
        </>

    )
}

