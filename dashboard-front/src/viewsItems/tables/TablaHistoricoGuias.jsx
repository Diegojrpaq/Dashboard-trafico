import React from 'react'
import TableViajesActivos from './TableViajesActivos'

export default function TablaHistoricoGuias(props) {
    console.log(props, 'TablaHistoricoGuias')
    return (
        <TableViajesActivos
            guias={props.guias}
            infoRuta={props.infoRuta}
        />
    )
}
