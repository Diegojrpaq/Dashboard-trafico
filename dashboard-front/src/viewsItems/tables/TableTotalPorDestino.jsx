import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { formattedNumber, formattedCantidad } from '../../utileria/utils';
export default function TableTotalPorDestino({ guias }) {
    
    //Columnas de la tabla
    const cols = [
        { field: 'destino_final', header: "Destino" },
        { field: 'volumen', header: 'Volumen' },
        { field: 'peso', header: 'Peso' },
        { field: 'flete', header: 'Flete' },
        { field: 'monto_seguro', header: 'Seguro' },
        { field: 'subtotal', header: 'Subtotal' },
        { field: 'guias', header: 'Guias' },
        { field: 'cantidad_caja', header: 'Items' }
    ];

    const map = new Map();

    guias.forEach(item => {
        if (!map.has(item.destino_final)) {
            map.set(item.destino_final, {
                destino_final: item.destino_final,
                volumen: 0,
                peso: 0,
                flete: 0,
                monto_seguro: 0,
                subtotal: 0,
                cantidad_caja: 0,
                guias: 0,
            });
        }
        const entry = map.get(item.destino_final);
        entry.volumen += item.volumen;
        entry.peso += item.peso;
        entry.flete += item.flete;
        entry.monto_seguro += item.monto_seguro;
        entry.subtotal += item.subtotal;
        entry.cantidad_caja += item.cantidad_caja;
        entry.guias += 1;
    });

    const resultGuiasXdestino = Array.from(map.values());

    const header = (
        <div className='d-flex flex-column flex-md-row justify-content-between align-items-center'>
            <h4>Totales por destino</h4>
        </div>
    );

    const newData = resultGuiasXdestino.map(guia => ({
        ...guia,
        volumen: `${formattedCantidad(guia.volumen)} mt3`,
        peso: `${formattedCantidad(guia.peso)} kg`,
        flete: formattedNumber(guia.flete),
        monto_seguro: formattedNumber(guia.monto_seguro),
        subtotal: formattedNumber(guia.subtotal),
    }))

    return (
        <div className="card mb-4">
            <DataTable
                value={newData}
                // header={header}
                showGridlines
                stripedRows
                sortMode='multiple'
                tableStyle={{ minWidth: '50rem', fontFamily: "Poppins" }}
                emptyMessage="No se encontraron resultados"
            >
                {
                    cols.map((col, index) => (
                        <Column key={index} field={col.field} header={col.header} sortable></Column>
                    ))
                }
            </DataTable>
        </div>
    )
}
