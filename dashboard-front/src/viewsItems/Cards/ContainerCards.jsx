import React from 'react'
import CardPromedio from './CardPromedio'

export default function ContainerCards({ sumas, totalViajes }) {
    return (
        <div className='mb-3 responsive'>
            <div className='row row-cols-auto justify-content-md-between mx-0'>
                {
                    sumas.map((sum, i) => (
                        <div key={i} className="col">
                            <CardPromedio title={sum.nombre} suma={sum.suma} signo={sum.signo} totalViajes={totalViajes} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
