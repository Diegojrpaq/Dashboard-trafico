import React from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';

export default function TableTreeEmbarcadas({ guiasPlaneadas, guiasEmbarcadas, catalogoSuc }) {
    // Calcular la suma del peso y volumen por sucursal
    const sumaPesoVolumenPorSucursal = guiasEmbarcadas?.reduce((result, guia) => {
        const { nombre_sucursal, peso, volumen, flete, monto_seguro, subtotal } = guia;
        if (!result[nombre_sucursal]) {
            result[nombre_sucursal] = {
                totalPeso: 0,
                totalVolumen: 0,
                totalFlete: 0,
                totalSeguro: 0,
                totalSub: 0
            };
        }
        result[nombre_sucursal].totalPeso += peso;
        result[nombre_sucursal].totalVolumen += volumen;
        result[nombre_sucursal].totalFlete += flete;
        result[nombre_sucursal].totalSeguro += monto_seguro;
        result[nombre_sucursal].totalSub += subtotal;
        return result;
    }, {});

    // Construir la estructura dataGuias con los totales
    const dataGuias = Object?.keys(sumaPesoVolumenPorSucursal).map((sucursal, index) => {
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
            children: guiasEmbarcadas
                .filter((guia) => guia.nombre_sucursal === sucursal)
                .map((guia, childIndex) => ({
                    key: `${index}-${childIndex}`,
                    data: {
                        numG: guia.numGuia,
                        emb: 'Si',
                        peso: `${guia.peso.toFixed(2)} kg`,
                        volumen: `${guia.volumen.toFixed(2)} mt3`,
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
        // { field: 'emb', header: 'Embarcada' },
        { field: 'peso', header: 'Peso' },
        { field: 'volumen', header: 'Volumen' },
        { field: 'flete', header: 'Flete' },
        { field: 'seguro', header: 'Seguro' },
        { field: 'subtotal', header: 'Subtotal' }
    ]

    const rowClassName = (node) => {
        return {
            'p-treetable-footer': (node.children),
            // 'p-highlight': (node.children)
        };
    }

    return (
        <div className="table-responsive">
            <TreeTable 
                value={dataGuias} 
                rowClassName={rowClassName} 
                showGridlines
                tableStyle={{ minWidth: '50rem', fontFamily: "Poppins" }}
                >
                {
                    columns.map((col, i) => (
                        <Column highlighted={false} key={col.field} field={col.field} header={col.header} expander={col.expander} />
                    ))
                }
            </TreeTable>
        </div>
    )
}

