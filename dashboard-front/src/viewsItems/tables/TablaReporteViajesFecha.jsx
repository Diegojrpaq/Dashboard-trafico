import React, { useRef, useState } from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';
import { DataTable } from 'primereact/datatable';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { formattedNumber, formatearFecha } from '../../utileria/utils';
export default function TablaReporteViajesFecha({ viajes, fecha }) {
    const totalViajes = viajes?.length;
    const fechaSeleccionada = formatearFecha(fecha)
        //Sumas para el apartado de totales
        const sumaVolumen = viajes?.reduce((acumulador, elemento) => {
            const suma = acumulador + elemento.volumenTotal;
            const totalRedondeado = Number(suma.toFixed(2));
            return totalRedondeado;
        }, 0);
        const sumaPeso = viajes?.reduce((acumulador, elemento) => {
            const suma = acumulador + elemento.pesoTotal;
            const totalRedondeado = Number(suma.toFixed(2));
            return totalRedondeado;
        }, 0);
        const sumaFlete = viajes?.reduce((acumulador, elemento) => {
            const suma = acumulador + elemento.fleteTotal;
            const totalRedondeado = Number(suma.toFixed(2));
            return totalRedondeado;
        }, 0);
        const sumaMonto = viajes?.reduce((acumulador, elemento) => {
            const suma = acumulador + elemento.montoSeguroTotal;
            const totalRedondeado = Number(suma.toFixed(2));
            return totalRedondeado;
        }, 0);
        const sumaSubtotal = viajes?.reduce((acumulador, elemento) => {
            const suma = acumulador + elemento.subtotalTotal;
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
        { field: "idViaje", header: "Numero Viaje" },
        { field: 'nombre', header: 'Nombre Viaje' },
        { field: 'cantidadGuias', header: 'Total Guías' },
        { field: 'volumenTotal', header: 'Volumen' },
        { field: 'pesoTotal', header: 'Peso' },
        { field: 'fleteTotal', header: 'Flete' },
        { field: 'montoSeguroTotal', header: 'Monto seguro' },
        { field: 'subtotalTotal', header: 'Subtotal' }
    ];

    const nombreArchivo = `${"Reporte"}-${fechaSeleccionada}`;
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

                doc.autoTable(exportColumns, viajes);
                doc.save(`${nombreArchivo}.pdf`);
            });
        });
    };
    //exportar en Excel
    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(viajes);
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
                    <input type="text" value={globalFilterValue} onChange={onGlobalFilterChange} className="ms-lg-2 p-2 pe-lg-5 border-1 rounded w-55" placeholder="Búsqueda general"></input>
                </span>
            </div>
            <div className="dropdown d-flex align-items-center justify-content-end" style={{ fontFamily: "Poppins" }}>
                <button className="dropdown-toggle border-0 rounded px-3 py-1" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={styleDropdown}>
                    Exportar
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ cursor: "pointer" }}>
                    <li className="dropdown-item" onClick={exportExcel}>Excel <i className="bi bi-file-earmark-excel"></i></li>
                    <li className="dropdown-item" onClick={() => exportCSV(false)}>CSV <i className="bi bi-filetype-csv"></i></li>
                    <li className="dropdown-item" onClick={exportPdf}>PDF <i className="bi bi-file-earmark-pdf"></i></li>
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
                <Column footer={formattedNumber(sumaFlete)} />
                <Column footer={formattedNumber(sumaMonto)} />
                <Column footer={formattedNumber(sumaSubtotal)} />
            </Row>
        </ColumnGroup>
    );

    const newData = viajes?.map(viaje => ({
        ...viaje,
        volumenTotal: `${viaje.volumenTotal.toFixed(2)} mt3`,
        pesoTotal: `${viaje.pesoTotal.toFixed(2)} kg`,
        fleteTotal: `${formattedNumber(viaje.fleteTotal)}`,
        montoSeguroTotal: `${formattedNumber(viaje.montoSeguroTotal)}`,
        subtotalTotal: `${formattedNumber(viaje.subtotalTotal)}`,
    }))
    return (
        <>
            {
                viajes ?
                    <>
                        <div className='d-flex align-items-center'>
                            <h3>Total de viajes: {totalViajes}</h3>
                        </div>
                        <div className="card">
                            <DataTable
                                ref={dt}
                                value={newData}
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
                        </div></>
                    : <h3>No existen viajes en esta fecha, selecciona otra fecha</h3>
            }
        </>
    )
}