import React, { useRef, useState } from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { FilterMatchMode } from 'primereact/api';
export default function TableViajesActivos({ guias, infoRuta }) {

    //Sumas para el apartado de totales
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
    //funciones para filtrar
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        numGuia: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    //Columnas de la tabla
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

    const nombreArchivo = `${infoRuta.nombreRuta}-${infoRuta.fecha}`;
    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));
    //exportar en CSV
    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    };
    //exportar en PDF
    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);

                doc.autoTable(exportColumns, guias);
                doc.save(`${nombreArchivo}.pdf`);
            });
        });
    };
    //exportar en Excel
    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(guias);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, nombreArchivo);
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

                module.default.saveAs(data, fileName + EXCEL_EXTENSION);
            }
        });
    };
    //Style para boton dropdown
    const styleDropdown = {
        background: "#405189",
        color: "white"
    }
    //Header de la tabla, contiene la barra de búsqueda y el boton de exportar
    const header = (
        <div className='d-flex flex-column flex-md-row justify-content-between align-items-center'>
            <div className="d-flex justify-content-center align-items-center responsive">
                <span className="d-lg-flex flex-row justify-content-center align-items-center mb-2 mb-md-0">
                    <label className='d-none w-100'>Búsqueda general:</label>
                    <input type="text" value={globalFilterValue} onChange={onGlobalFilterChange} class="ms-lg-2 p-2 pe-lg-5 border-1 rounded w-55" placeholder="Keyword Search"></input>
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
    //Footer de la tabla, contiene los totales
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
                <DataTable 
                    ref={dt}
                    value={guias} 
                    filters={filters} 
                    header={header} 
                    footerColumnGroup={footerGroup} 
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
        </>
    )
}