import React from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { ConvertirFecha, formattedNumber } from '../../utileria/utils';

export default function TablaArbol({ guias }) {
    // Calcular la suma del peso y volumen por sucursal
    const sumaPesoVolumenPorSucursal = guias?.reduce((result, guia) => {
        const { sucursal_ubicacion,
                peso,
                volumen, 
                flete, 
                monto_seguro,
                subtotal, 
                origen } = guia;
        if (!result[sucursal_ubicacion]) {
            result[sucursal_ubicacion] = {
                totalPeso: 0,
                totalVolumen: 0,
                totalFlete: 0,
                totalSeguro: 0,
                totalSub: 0
            };
        }

        result[sucursal_ubicacion].totalPeso += peso;
        result[sucursal_ubicacion].totalVolumen += volumen;
        result[sucursal_ubicacion].totalFlete += flete;
        result[sucursal_ubicacion].totalSeguro += monto_seguro;
        result[sucursal_ubicacion].totalSub += subtotal;
        result[sucursal_ubicacion].origen = origen;
        return result;
    }, {});

    // Construir la estructura dataGuias con los totales
    const dataGuias = Object.keys(sumaPesoVolumenPorSucursal).map((sucursal, index) => {
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
            children: guias
                .filter((guia) => guia.sucursal_ubicacion === sucursal)
                .map((guia, childIndex) => ({
                    key: `${index}-${childIndex}`,
                    data: {
                        numG: guia.numGuia,
                        origen: guia.sucursal_principal,
                        destino: guia.sucursal_destino,
                        fecha: ConvertirFecha(guia.fecha_registro),
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
        <div className="card table-responsive">
            <TreeTable 
                value={dataGuias} 
                rowClassName={rowClassName} 
                showGridlines
                stripedRows
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
