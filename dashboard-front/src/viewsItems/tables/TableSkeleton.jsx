import React from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Skeleton } from 'primereact/skeleton';
export default function TableSkeleton({cols}) {
    const dataPrueba = [
        {
            volumen: 1,
            peso: 1,
            flete: 1,
            monto_seguro: 1,
            subtotal: 1,
        },
        {
            volumen: 1,
            peso: 1,
            flete: 1,
            monto_seguro: 1,
            subtotal: 1,
        },
        {
            volumen: 1,
            peso: 1,
            flete: 1,
            monto_seguro: 1,
            subtotal: 1,
        },
        {
            volumen: 1,
            peso: 1,
            flete: 1,
            monto_seguro: 1,
            subtotal: 1,
        }
    ]
    return (
        <>
            <div className="card">
                <DataTable
                    value={dataPrueba}
                    showGridlines
                    tableStyle={{ minWidth: '50rem', fontFamily: "Poppins" }}
                >
                    {
                        cols.map((col, index) => (
                            <Column key={index} field={col.field} header={col.header} body={<Skeleton />} sortable>{index}</Column>
                        ))
                    }
                </DataTable>
            </div>
        </>
    )
}
