import React from 'react';
import CardTotales from './CardTotales';

export default function ContainerTotales({ sumas }) {
    return (
        <div className='mb-3 responsive'>
            <div className='row row-cols-auto  justify-content-evenly align-items-center mx-0'>
                {
                    sumas.map((sum, i) => (
                        <div key={i} className="col">
                            <CardTotales title={sum.nombre} suma={sum.suma} signo={sum.signo} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
