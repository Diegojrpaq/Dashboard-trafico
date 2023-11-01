import React from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { ConvertirFecha, formattedNumber } from '../../utileria/utils';

export default function TableTreeEmbarcadas({ guiasPlaneadas, guiasEmbarcadas, catalogoSuc }) {
    // Calcular la suma del peso y volumen por sucursal
    const sumaPesoVolumenPorSucursal = guiasEmbarcadas?.reduce((result, guia) => {
        const { sucursal_principal, peso, volumen, flete, monto_seguro, subtotal, origen } = guia;
        if (!result[sucursal_principal]) {
            result[sucursal_principal] = {
                totalPeso: 0,
                totalVolumen: 0,
                totalFlete: 0,
                totalSeguro: 0,
                totalSub: 0
            };
        }
        result[sucursal_principal].totalPeso += peso;
        result[sucursal_principal].totalVolumen += volumen;
        result[sucursal_principal].totalFlete += flete;
        result[sucursal_principal].totalSeguro += monto_seguro;
        result[sucursal_principal].totalSub += subtotal;
        result[sucursal_principal].origen = origen;
        return result;
    }, {});

    // Construir la estructura dataGuias con los totales
    const dataGuias = Object?.keys(sumaPesoVolumenPorSucursal).map((sucursal, index) => {
        const { totalPeso, totalVolumen, totalFlete, totalSeguro, totalSub, origen } = sumaPesoVolumenPorSucursal[sucursal];
        return {
            key: index,
            data: {
                sucursal,
                origen,
                peso: `${totalPeso.toFixed(2)} kg`,
                volumen: `${totalVolumen.toFixed(2)} mt3`,
                flete: formattedNumber(totalFlete),
                seguro: formattedNumber(totalSeguro),
                subtotal: formattedNumber(totalSub)
            },
            children: guiasEmbarcadas
                .filter((guia) => guia.sucursal_principal === sucursal)
                .map((guia, childIndex) => ({
                    key: `${index}-${childIndex}`,
                    data: {
                        numG: guia.numGuia,
                        origen: guia.sucursal_principal,
                        destino: guia.sucursal_destino,
                        fecha: ConvertirFecha(guia.fecha_registro),
                        emb: 'Si',
                        peso: `${guia.peso.toFixed(2)} kg`,
                        volumen: `${guia.volumen.toFixed(2)} mt3`,
                        flete: formattedNumber(guia.flete),
                        seguro: formattedNumber(guia.monto_seguro),
                        subtotal: formattedNumber(guia.subtotal)
                    },
                })),
        };
    });

    const columns = [
        { field: 'sucursal', header: 'Sucursal', expander: true },
        { field: 'numG', header: 'Num-Guía' },
        { field: 'origen', header: 'Origen' },
        { field: 'destino', header: 'Destino' },
        { field: 'fecha', header: 'Fecha' },
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

