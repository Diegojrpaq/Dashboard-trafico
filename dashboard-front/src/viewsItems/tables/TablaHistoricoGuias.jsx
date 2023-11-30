import React, { useRef, useState } from 'react';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { formattedNumber } from '../../utileria/utils';
export default function TableViajesActivos({ guias, guiasSubidas, guiasBajadas, guiasAnterior, idUbicacion, infoRuta }) {
    let newCatalogoGuias = [];
    let guiasTransito = [];
    let desembarcadas;
    let guiasCompl;
    if (guiasSubidas.length > 0 && guiasBajadas.length === 0 && guiasAnterior.newArr === null) {
        newCatalogoGuias = [...guiasSubidas]
    }
    else if (guiasAnterior.newArr.length > 0 && guiasAnterior.newArr2.length === 0) {
        guiasTransito = [...guiasAnterior.newArr]
        if (guiasSubidas.length > 0) {
            newCatalogoGuias = [...guiasSubidas, ...guiasTransito]
        } else {
            if (guiasBajadas.length > 0) {
                guiasCompl = guiasTransito.map(guia =>
                    guiasBajadas.some(guiaBajada => guiaBajada.numGuia === guia.numGuia)
                        ? guiasBajadas.find(newObj => newObj.numGuia === guia.numGuia)
                        : guia
                )
                newCatalogoGuias = [...guiasCompl]
            } else {
                newCatalogoGuias = [...guiasTransito]
            }
        }
    } else if (guiasAnterior.newArr.length > 0 && guiasAnterior.newArr2.length > 0) {
        guiasTransito = [...guiasAnterior.newArr]
        if (guiasSubidas.length > 0) {
            desembarcadas = guiasTransito.filter(guia => !guiasAnterior.newArr2.some(guiaBajada => guiaBajada.numGuia === guia.numGuia));
            if (guiasBajadas.length > 0) {
                guiasCompl = desembarcadas.map(guia =>
                    guiasBajadas.some(guiaBajada => guiaBajada.numGuia === guia.numGuia)
                        ? guiasBajadas.find(newObj => newObj.numGuia === guia.numGuia)
                        : guia
                )
                newCatalogoGuias = [...guiasSubidas, ...guiasCompl]
            } else {
                newCatalogoGuias = [...guiasSubidas, ...desembarcadas]
            }
        } else {
            desembarcadas = guiasTransito.filter(guia => !guiasAnterior.newArr2.some(guiaBajada => guiaBajada.numGuia === guia.numGuia));
            if (guiasBajadas.length > 0) {
                guiasCompl = desembarcadas.map(guia =>
                    guiasBajadas.some(guiaBajada => guiaBajada.numGuia === guia.numGuia)
                        ? guiasBajadas.find(newObj => newObj.numGuia === guia.numGuia)
                        : guia
                )
                newCatalogoGuias = [...guiasCompl]
            } else {
                newCatalogoGuias = [...desembarcadas]
            }
        }
    }

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
        { field: 'tipoOperacion', header: 'Tipo Operación' },
        { field: 'ubicacion_transaccion', header: 'Ubicación transacción' },
        { field: 'fecha_transaccion', header: 'Fecha' },
        // { field: 'origen_cotizacion', header: 'Origen' },
        { field: 'destino_cotizacion', header: 'Destino' },
        { field: 'volumen', header: 'Volumen' },
        { field: 'peso', header: 'Peso' },
        { field: 'flete', header: 'Flete' },
        { field: 'monto_seguro', header: 'Monto seguro' },
        { field: 'subtotal', header: 'Subtotal' },
        { field: 'Empaque', header: 'Empaque' },
        { field: 'cantidad_caja', header: 'Cantidad' },
    ];

    const nombreArchivo = `${infoRuta.nombre}-${infoRuta.fecha_registro}`;
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

    const newData = newCatalogoGuias.map(guia => ({
        ...guia,
        tipoOperacion: guia.idTipoOperacion,
        fecha_transaccion: guia.fecha_de_transaccion,
        volumen: `${guia.volumen} mt3`,
        peso: `${guia.peso} kg`,
        flete: formattedNumber(guia.flete),
        monto_seguro: formattedNumber(guia.monto_seguro),
        subtotal: formattedNumber(guia.subtotal),
    }))

    const rowClass = (data) => {
        //console.log(data, "Color<<<<<")
        // if (data.idTipoOperacion === 17 && idUbicacion === data.ubicacion_transaccion_id) {
        //     return {
        //         'bg-success': true,
        //         'text-light': true
        //     };
        // } else if (data.idTipoOperacion === 17 && idUbicacion !== data.ubicacion_transaccion_id) {
        //     return {
        //         'bg-dark': true,
        //         'text-light': true
        //     };
        // } else if (data.idTipoOperacion === 18) {
        //     return {
        //         'bg-danger': true,
        //         'text-light': true
        //     };
        // }
        if (data.idTipoOperacion === 17 && idUbicacion === data.ubicacion_transaccion_id) {
            return {
                'fw-bold': true,
                'text-success': true
                
            };
        } else if (data.idTipoOperacion === 17 && idUbicacion !== data.ubicacion_transaccion_id) {
            return {
                'fw-bold': true,
                'text-dark': true
            };
        } else if (data.idTipoOperacion === 18) {
            return {
                'fw-bold': true,
                'text-danger': true
            };
        }

    };

    return (
        <>
            <div className="card">
                <DataTable
                    ref={dt}
                    value={newData}
                    rowClassName={rowClass}
                    filters={filters}
                    header={header}
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
