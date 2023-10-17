import React, { useRef, useState } from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { FilterMatchMode } from 'primereact/api';
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

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    });

    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

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
        <div className='d-flex justify-content-between align-items-center'>
            <div className="d-flex justify-content-center align-items-center">
                <span className="d-flex flex-row justify-content-center align-items-center">
                    <label className='w-100'>Búsqueda general:</label>
                    <input type="text" value={globalFilterValue} onChange={onGlobalFilterChange} class="ms-2 p-2 pe-5 border-1 rounded" placeholder="Keyword Search"></input>
                </span>
            </div>
            <div className="dropdown d-flex align-items-center justify-content-end" style={{ fontFamily: "Poppins" }}>
                <button className="dropdown-toggle border-0 rounded px-3 py-1" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={styleDropdown}>
                    Exportar
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ cursor: "pointer" }}>
                    <li class="dropdown-item" onClick={exportExcel}>Excel <i class="bi bi-file-earmark-excel"></i></li>
                    <li class="dropdown-item" onClick={() => exportCSV(false)}>CSV <i class="bi bi-filetype-csv"></i></li>
                    <li class="dropdown-item" onClick={exportPdf}>PDF <i class="bi bi-file-earmark-pdf"></i></li>
                </ul>
            </div>
        </div>
    );
    const footerGroup = (
        <ColumnGroup>
            <Row>
                <Column footer="Totales" colSpan={3} footerStyle={{ textAlign: 'right' }} />
                <Column footer={`${sumaVolumen} mt3`} />
                <Column footer={`${sumaPeso} Kg`} />
                <Column footer={`$${sumaFlete}`} />
                <Column footer={`$${sumaMonto}`} />
                <Column footer={`$${sumaSubtotal}`} />
            </Row>
        </ColumnGroup>
    );

    return (
        <>
            <div className="card">
                <DataTable ref={dt} value={guias} filters={filters} header={header} footerColumnGroup={footerGroup} showGridlines stripedRows sortMode='multiple' tableStyle={{ minWidth: '50rem', fontFamily: "Poppins" }}>
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