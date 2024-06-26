import React from 'react';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';   // theme
import 'primereact/resources/primereact.css';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { ConvertirFecha, formattedNumber, formattedCantidad } from '../../utileria/utils';

export default function TablaArbol({ guias, guiasClientes }) {
    let newData;
    let guiasData = [];
    if (guias !== null) {
        // Calcular la suma del peso y volumen por sucursal
        const sumaPesoVolumenPorSucursal = guias?.reduce((result, guia) => {
            const { sucursal_ubicacion,
                peso,
                volumen,
                flete,
                monto_seguro,
                subtotal,
                origen,
                cantidad_caja } = guia;
            if (!result[sucursal_ubicacion]) {
                result[sucursal_ubicacion] = {
                    totalPeso: 0,
                    totalVolumen: 0,
                    totalFlete: 0,
                    totalSeguro: 0,
                    totalSub: 0,
                    totalGuias: 0,
                    totalItemsSuc: 0,
                };
            }

            result[sucursal_ubicacion].totalPeso += peso;
            result[sucursal_ubicacion].totalVolumen += volumen;
            result[sucursal_ubicacion].totalFlete += flete;
            result[sucursal_ubicacion].totalSeguro += monto_seguro;
            result[sucursal_ubicacion].totalSub += subtotal;
            result[sucursal_ubicacion].origen = origen;
            result[sucursal_ubicacion].totalGuias += 1;
            result[sucursal_ubicacion].totalItemsSuc += cantidad_caja;
            return result;
        }, {});
        // Construir la estructura dataGuias con los totales
        const dataGuias = Object.keys(sumaPesoVolumenPorSucursal).map((sucursal, index) => {
            const { totalPeso, totalVolumen, totalFlete, totalSeguro, totalSub, origen, totalGuias, totalItemsSuc } = sumaPesoVolumenPorSucursal[sucursal];
            return {
                key: index,
                data: {
                    sucursal,
                    cantG: totalGuias,
                    //origen,
                    peso: `${formattedCantidad(totalPeso)} kg`,
                    volumen: `${totalVolumen.toFixed(2)} mt3`,
                    flete: formattedNumber(totalFlete),
                    seguro: formattedNumber(totalSeguro),
                    subtotal: formattedNumber(totalSub),
                    cantidad: totalItemsSuc,
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
                            suc_ubi: guia.sucursal_ubicacion,
                            peso: `${formattedCantidad(guia.peso)} kg`,
                            volumen: `${guia.volumen.toFixed(2)} mt3`,
                            flete: formattedNumber(guia.flete),
                            seguro: formattedNumber(guia.monto_seguro),
                            subtotal: formattedNumber(guia.subtotal),
                            empaque: guia.Empaque,
                            cantidad: guia.cantidad_caja
                        },
                    })),
            };
        });
        guiasData = [...dataGuias];
    }

    if (guiasClientes !== null && guiasClientes !== undefined) {
        // Calcular la suma del peso y volumen por cliente
        const sumaPesoVolumenPorCliente = guiasClientes?.reduce((result, guia) => {
            const {
                clienteOrigen,
                peso,
                volumen,
                flete,
                monto_seguro,
                subtotal,
                origen,
                cantidad_caja } = guia;
            if (!result[clienteOrigen]) {
                result[clienteOrigen] = {
                    totalPeso: 0,
                    totalVolumen: 0,
                    totalFlete: 0,
                    totalSeguro: 0,
                    totalSub: 0,
                    totalGuias: 0,
                    totalItemsSuc: 0,
                };
            }

            result[clienteOrigen].totalPeso += peso;
            result[clienteOrigen].totalVolumen += volumen;
            result[clienteOrigen].totalFlete += flete;
            result[clienteOrigen].totalSeguro += monto_seguro;
            result[clienteOrigen].totalSub += subtotal;
            result[clienteOrigen].origen = origen;
            result[clienteOrigen].totalGuias += 1;
            result[clienteOrigen].totalItemsSuc += cantidad_caja;
            return result;
        }, {});

        // Construir la estructura dataGuiasClientes con los totales
        const dataGuiasClientes = Object.keys(sumaPesoVolumenPorCliente).map((sucursal, index) => {
            const { totalPeso, totalVolumen, totalFlete, totalSeguro, totalSub, origen, totalGuias, totalItemsSuc } = sumaPesoVolumenPorCliente[sucursal];
            return {
                key: index + 100,
                data: {
                    sucursal,
                    cantG: totalGuias,
                    //origen,
                    peso: `${formattedCantidad(totalPeso)} kg`,
                    volumen: `${formattedCantidad(totalVolumen)} mt3`,
                    flete: formattedNumber(totalFlete),
                    seguro: formattedNumber(totalSeguro),
                    subtotal: formattedNumber(totalSub),
                    cantidad: totalItemsSuc,
                },
                children: guiasClientes
                    .filter((guia) => guia.clienteOrigen === sucursal)
                    .map((guia, childIndex) => ({
                        key: `${index + 100}-${childIndex + 100}`,
                        data: {
                            numG: guia.numGuia,
                            origen: guia.sucursal_principal,
                            destino: guia.sucursal_destino,
                            fecha: ConvertirFecha(guia.fecha_registro),
                            suc_ubi: guia.sucursal_ubicacion,
                            peso: `${formattedCantidad(guia.peso)} kg`,
                            volumen: `${formattedCantidad(guia.volumen)} mt3`,
                            flete: formattedNumber(guia.flete),
                            seguro: formattedNumber(guia.monto_seguro),
                            subtotal: formattedNumber(guia.subtotal),
                            empaque: guia.Empaque,
                            cantidad: guia.cantidad_caja
                        },
                    })),
            };
        });
        newData = [...guiasData, ...dataGuiasClientes];
    } else {
        newData = [...guiasData]
    }

    const columns = [
        { field: 'sucursal', header: 'Sucursal', expander: true },
        { field: 'numG', header: 'Num-Guía' },
        { field: 'cantG', header: 'Cant. Guías' },
        { field: 'origen', header: 'Origen' },
        { field: 'destino', header: 'Destino' },
        { field: 'fecha', header: 'Fecha' },
        { field: 'suc_ubi', header: 'Suc. Ubic.' },
        { field: 'peso', header: 'Peso' },
        { field: 'volumen', header: 'Volumen' },
        { field: 'flete', header: 'Flete' },
        { field: 'seguro', header: 'Seguro' },
        { field: 'subtotal', header: 'Subtotal' },
        // { field: 'empaque', header: 'Empaque' },
        { field: 'cantidad', header: 'Num. Items' }
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
                value={newData}
                rowClassName={rowClassName}
                showGridlines
                stripedRows
                tableStyle={{ minWidth: '100rem', fontFamily: "Poppins" }}
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
