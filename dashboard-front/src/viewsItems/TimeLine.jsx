import React from 'react'
import { Timeline } from 'primereact/timeline';

export default function TimeLine(props) {
    const listParadas = props.ListParadas;
  

    const customizedMarker = (item) => {
        return (
            <span className="icon-timeline">
                <i className='bi bi-geo-alt-fill'></i>
            </span>
        );
    };

    return (

        <Timeline
            value={listParadas}
            align='alternate'
            layout="horizontal"
            opposite={(item) => <p className='h5'>{item.nombre}</p>}
            marker={customizedMarker}
            content={<span>&nbsp;</span>}
        />

    )
}

