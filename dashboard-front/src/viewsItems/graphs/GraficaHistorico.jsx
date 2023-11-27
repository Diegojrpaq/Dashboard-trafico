import React from 'react'
import {guiasFilter}  from '../../utileria/utils'

export default function GraficaHistorico(props) {
    console.log(props.info)
    console.log(props.listParadas)

    console.log(guiasFilter(props.info.catalogoGuias, 17 , 1 ), "guias embarcadas en guadalajara");

    return (
        <div>GraficaHistorico</div>
    )
}
