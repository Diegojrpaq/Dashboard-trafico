import React, { useState, useEffect } from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { NodeService } from '../../Data/NodeService';

export default function TableTreePlaneacion({ guiasPlaneadas, guiasEmbarcadas, catalogoSuc }) {
    const [nodes, setNodes] = useState([]);
    console.log(guiasPlaneadas, "Tree")

    //let dataGuias;
    console.log(catalogoSuc)
    // Calcular la suma del peso y volumen por sucursal
    const sumaPesoVolumenPorSucursal = guiasPlaneadas.reduce((result, guia) => {
        const { sucursal_ubicacion, cotizacion_principal_peso, cotizacion_principal_volumen, flete, monto_seguro, subtotal } = guia;
        if (!result[sucursal_ubicacion]) {
            result[sucursal_ubicacion] = {
                totalPeso: 0,
                totalVolumen: 0,
                totalFlete: 0,
                totalSeguro: 0,
                totalSub: 0
            };
        }
        result[sucursal_ubicacion].totalPeso += cotizacion_principal_peso;
        result[sucursal_ubicacion].totalVolumen += cotizacion_principal_volumen;
        result[sucursal_ubicacion].totalFlete += flete;
        result[sucursal_ubicacion].totalSeguro += monto_seguro;
        result[sucursal_ubicacion].totalSub += subtotal;
        return result;
    }, {});

    // Construir la estructura dataGuias con los totales
    const dataGuias = Object.keys(sumaPesoVolumenPorSucursal).map((sucursal, index) => {
        const { totalPeso, totalVolumen, totalFlete, totalSeguro, totalSub } = sumaPesoVolumenPorSucursal[sucursal];
        return {
            key: index,
            data: {
                sucursal,
                peso: `${totalPeso.toFixed(2)} kg`,
                volumen: `${totalVolumen.toFixed(2)} mt3`,
                flete: `$ ${totalFlete.toFixed(2)}`,
                seguro: `$ ${totalSeguro.toFixed(2)}`,
                subtotal: `$ ${totalSub.toFixed(2)}`
            },
            children: guiasPlaneadas
                .filter((guia) => guia.sucursal_ubicacion === sucursal)
                .map((guia, childIndex) => ({
                    key: `${index}-${childIndex}`,
                    data: {
                        numG: guia.numGuia,
                        emb: 'Si',
                        peso: `${guia.cotizacion_principal_peso.toFixed(2)} kg`,
                        volumen: `${guia.cotizacion_principal_volumen.toFixed(2)} mt3`,
                        flete: `$ ${guia.flete.toFixed(2)}`,
                        seguro: `$ ${guia.monto_seguro.toFixed(2)}`,
                        subtotal: `$ ${guia.subtotal.toFixed(2)}`
                    },
                })),
        };
    });

    const columns = [
        { field: 'sucursal', header: 'Sucursal', expander: true },
        { field: 'numG', header: 'Num-Guía' },
        { field: 'emb', header: 'Embarcada' },
        { field: 'peso', header: 'Peso' },
        { field: 'volumen', header: 'Volumen' },
        { field: 'flete', header: 'Flete' },
        { field: 'seguro', header: 'Seguro' },
        { field: 'subtotal', header: 'Subtotal' }
    ]
    useEffect(() => {
        NodeService.getTreeTableNodes().then((data) => setNodes(data));
    }, []);

    const rowClassName = (node) => {
        return {
            'p-treetable-footer': (node.children),
            // 'p-highlight': (node.children)
        };
    }

    return (
        <div className="table-responsive">
            <TreeTable value={dataGuias} rowClassName={rowClassName} showGridlines tableStyle={{ minWidth: '50rem' }}>
                {
                    columns.map((col, i) => (
                        <Column highlighted={false} key={col.field} field={col.field} header={col.header} expander={col.expander} />
                    ))
                }
            </TreeTable>
        </div>
    )
}
