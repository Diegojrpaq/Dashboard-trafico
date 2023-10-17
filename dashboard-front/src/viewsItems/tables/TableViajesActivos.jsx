//import React from 'react'
import { Table } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProductService } from '../../Data/ProductService';
export default function TableViajesActivos({ guias }) {

    const sumaVolumen = guias.reduce((acumulador, elemento) => {
        const suma = acumulador + elemento.volumen;
        const totalRedondeado = Number(suma.toFixed(2));
        return totalRedondeado;
    }, 0);
    const sumaPeso = guias.reduce((acumulador, elemento) => {
        const suma = acumulador + elemento.peso;
        const totalRedondeado = Number(suma.toFixed(2));
        return totalRedondeado;
    }, 0);
    const sumaFlete = guias.reduce((acumulador, elemento) => {
        const suma = acumulador + elemento.flete;
        const totalRedondeado = Number(suma.toFixed(2));
        return totalRedondeado;
    }, 0);
    const sumaMonto = guias.reduce((acumulador, elemento) => {
        const suma = acumulador + elemento.monto_seguro;
        const totalRedondeado = Number(suma.toFixed(2));
        return totalRedondeado;
    }, 0);
    const sumaSubtotal = guias.reduce((acumulador, elemento) => {
        const suma = acumulador + elemento.subtotal;
        const totalRedondeado = Number(suma.toFixed(2));
        return totalRedondeado;
    }, 0);

    const dt = useRef(null);

    const cols = [
        { field: "numGuia", header: "Numero Guía" },
        { field: 'origen', header: 'Origen' },
        { field: 'destino', header: 'Destino' },
        { field: 'volumen', header: 'Volumen' },
        { field: 'peso', header: 'Peso' },
        { field: 'flete', header: 'Flete' },
        { field: 'monto_seguro', header: 'Monto seguro' },
        { field: 'subtotal', header: 'Subtotal' }
    ];

    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    };

    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);

                doc.autoTable(exportColumns, guias);
                doc.save('guias.pdf');
            });
        });
    };

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(guias);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'guias');
        });
    };
    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };
    const styleDropdown = {
        background: "#405189",
        color: "white"
    }
    const header = (
        // <div className="d-flex align-items-center justify-content-end"  style={{fontFamily: "Poppins"}}>
        //     <button className='d-flex flex-row align-items-center justify-content-center rounded bg-success text-light px-2 py-1 border-0 mx-1' onClick={exportExcel}>
        //     <span className='mx-1'>Exportar</span>
        //     <i class="bi bi-file-earmark-excel fs-6 "></i>
        //     </button>
        // </div>
       <div>
        {/* <div>
            <span>Volumen total: {sumaVolumen}</span>
            <span>Peso total: {sumaPeso}</span>
            <span>Flete total: {sumaFlete}</span>
            <span>Monto total: {sumaMonto}</span>
            <span>Subtotal total: {sumaSubtotal}</span>
        </div> */}
         <div className="dropdown d-flex align-items-center justify-content-end" style={{ fontFamily: "Poppins" }}>
            
            <button className="dropdown-toggle border-0 rounded px-3 py-1" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={styleDropdown}>
                Exportar
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{cursor: "pointer"}}>
                <li class="dropdown-item" onClick={exportExcel}>Excel <i class="bi bi-file-earmark-excel"></i></li>
                <li class="dropdown-item" onClick={() => exportCSV(false)}>CSV <i class="bi bi-filetype-csv"></i></li>
                <li class="dropdown-item" onClick={exportPdf}>PDF <i class="bi bi-file-earmark-pdf"></i></li>
            </ul>
        </div>
       </div>
    );

   
    return (
        <>
            {/* <div className='table-responsive'>
                <Table striped bordered hover size='md'>
                    <thead>
                        <tr>
                            <th>Numero Guía</th>
                            <th>Origen</th>
                            <th>Destino</th>
                            <th>Volumen</th>
                            <th>Peso</th>
                            <th>Flete</th>
                            <th>Monto Seguro</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            guias.map((guia, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{guia.numGuia}</td>
                                        <td>{guia.origen}</td>
                                        <td>{guia.destino}</td>
                                        <td>{guia.volumen}</td>
                                        <td>{guia.peso}</td>
                                        <td>{guia.flete}</td>
                                        <td>{guia.monto_seguro}</td>
                                        <td>{guia.subtotal}</td>
                                    </tr>
                                )
                            })
                        }
                         <tr className='text-center'>
                            <td></td>
                            <td></td>
                            <td colSpan={3} className='text-center'><b>TOTALES</b></td>
                            <td><b>{sumaVolumen} mt3</b></td>
                            <td><b>{sumaPeso} Kg</b></td>
                            <td><b>$ {sumaFlete}</b></td>
                            <td><b>$ {sumaMonto}</b></td>
                            <td><b>$ {sumaSubtotal}</b></td>
                        </tr>
                    </tbody>
                </Table>
            </div> */}

            <div className="card">
                <DataTable ref={dt} value={guias} header={header} showGridlines stripedRows sortMode='multiple' tableStyle={{ minWidth: '50rem', fontFamily: "Poppins" }}>
                    {/* <Column field="numGuia" header="Numero Guía" sortable></Column>
                    <Column field="origen" header="Origen" sortable></Column>
                    <Column field="destino" header="Destino" sortable></Column>
                    <Column field="volumen" header="Volumen" sortable></Column>
                    <Column field="peso" header="Peso" sortable></Column>
                    <Column field="flete" header="Flete" sortable></Column>
                    <Column field="monto_seguro" header="Monto seguro" sortable></Column>
                    <Column field="subtotal" header="Subtotal" sortable></Column> */}
                    {
                        cols.map((col, index) => (
                            <Column key={index} field={col.field} header={col.header} sortable></Column>
                        ))
                    }
                </DataTable>

                
            </div>

        </>
    )
}