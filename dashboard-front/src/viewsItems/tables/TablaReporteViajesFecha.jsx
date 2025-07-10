import React, { useRef, useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { FilterMatchMode } from "primereact/api";
import {
  formattedNumber,
  formatearFecha,
  formattedCantidad,
} from "../../utileria/utils";
import ContainerCards from "../../viewsItems/Cards/ContainerCards";

export default function TablaReporteViajesFecha({
  viajes,
  fecha,
  mostrarDesglosePorDestino = false,
}) {
  const dt = useRef(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    numGuia: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [expandedRows, setExpandedRows] = useState(null);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const totalViajes = viajes?.length;
  const fecha1 = formatearFecha(fecha[0]);
  const fecha2 = formatearFecha(fecha[1]);

  const sumaGuias = viajes?.reduce((acc, v) => acc + v.cantidadGuias, 0);
  const sumaVolumen = viajes?.reduce((acc, v) => acc + v.volumenTotal, 0);
  const sumaPeso = viajes?.reduce((acc, v) => acc + v.pesoTotal, 0);
  const sumaFlete = viajes?.reduce((acc, v) => acc + v.fleteTotal, 0);
  const sumaMonto = viajes?.reduce((acc, v) => acc + v.montoSeguroTotal, 0);
  const sumaSubtotal = viajes?.reduce((acc, v) => acc + v.subtotalTotal, 0);

  const cols = [
    { field: "idViaje", header: "Numero Viaje" },
    { field: "nombre", header: "Nombre Viaje" },
    { field: "fechaRegistro", header: "Fecha" },
    { field: "cantidadGuias", header: "Total Guías" },
    { field: "volumenTotal", header: "Volumen" },
    { field: "pesoTotal", header: "Peso" },
    { field: "fleteTotal", header: "Flete" },
    { field: "montoSeguroTotal", header: "Monto seguro" },
    { field: "subtotalTotal", header: "Subtotal" },
  ];

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const nombreArchivo = `Reporte-${fecha1}-${fecha2}`;

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(exportColumns, viajes);
        doc.save(`${nombreArchivo}.pdf`);
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(viajes);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, nombreArchivo);
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });
        module.default.saveAs(data, fileName + EXCEL_EXTENSION);
      }
    });
  };

  const styleDropdown = {
    background: "#405189",
    color: "white",
  };

  const header = (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
      <div className="d-flex justify-content-center align-items-center responsive">
        <span className="d-lg-flex flex-row justify-content-center align-items-center mb-2 mb-md-0">
          <input
            type="text"
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            className="ms-lg-2 p-2 pe-lg-5 border-1 rounded w-55"
            placeholder="Búsqueda general"
          ></input>
        </span>
      </div>
      <div
        className="dropdown d-flex align-items-center justify-content-end"
        style={{ fontFamily: "Poppins" }}
      >
        <button
          className="dropdown-toggle border-0 rounded px-3 py-1"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={styleDropdown}
        >
          Exportar
        </button>
        <ul
          className="dropdown-menu"
          aria-labelledby="dropdownMenuButton1"
          style={{ cursor: "pointer" }}
        >
          <li className="dropdown-item" onClick={exportExcel}>
            Excel <i className="bi bi-file-earmark-excel"></i>
          </li>
          <li className="dropdown-item" onClick={() => exportCSV(false)}>
            CSV <i className="bi bi-filetype-csv"></i>
          </li>
          <li className="dropdown-item" onClick={exportPdf}>
            PDF <i className="bi bi-file-earmark-pdf"></i>
          </li>
        </ul>
      </div>
    </div>
  );

  const footerGroup = (
    <ColumnGroup>
      <Row>
        <Column
          footer="Totales"
          colSpan={4}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={`${formattedCantidad(sumaVolumen)} mt3`} />
        <Column footer={`${formattedCantidad(sumaPeso)} Kg`} />
        <Column footer={formattedNumber(sumaFlete)} />
        <Column footer={formattedNumber(sumaMonto)} />
        <Column footer={formattedNumber(sumaSubtotal)} />
      </Row>
    </ColumnGroup>
  );

  const newData = viajes?.map((viaje) => ({
    ...viaje,
    fechaRegistro: formatearFecha(viaje.fechaRegistro),
    volumenTotal: `${viaje.volumenTotal.toFixed(2)} mt3`,
    pesoTotal: `${formattedCantidad(viaje.pesoTotal)} kg`,
    fleteTotal: `${formattedNumber(viaje.fleteTotal)}`,
    montoSeguroTotal: `${formattedNumber(viaje.montoSeguroTotal)}`,
    subtotalTotal: `${formattedNumber(viaje.subtotalTotal)}`,
  }));

  const rowExpansionTemplate = (viaje) => {
    if (!mostrarDesglosePorDestino) return null;

    return (
      <div className="p-3 border-top">
        <h5 className="fw-bold mb-3">
          Detalle por destino – {viaje.nombre} – {viaje.fechaRegistro}
        </h5>

        {(viaje.destinos?.length > 0 ? viaje.destinos : ["Destino Mock"]).map(
          (destino, i) => (
            <div key={i} className="mb-4 border-top pt-3">
              <h6 className="fw-bold text-secondary mb-3">
                {typeof destino === "string"
                  ? destino
                  : destino.destinoFinal || "Destino"}
              </h6>
              <DataTable
                value={[viaje]} // Usamos el viaje principal mientras llegan los datos reales por destino
                showGridlines
                stripedRows
                tableStyle={{ fontFamily: "Poppins" }}
              >
                <Column field="idViaje" header="Numero Viaje" />
                <Column field="nombre" header="Nombre Viaje" />
                <Column field="fechaRegistro" header="Fecha" />
                <Column field="cantidadGuias" header="Total Guías" />
                <Column field="volumenTotal" header="Volumen" />
                <Column field="pesoTotal" header="Peso" />
                <Column field="fleteTotal" header="Flete" />
                <Column field="montoSeguroTotal" header="Monto seguro" />
                <Column field="subtotalTotal" header="Subtotal" />
              </DataTable>
            </div>
          )
        )}
      </div>
    );
  };

  const sumas = [
    { nombre: "Volumen", suma: sumaVolumen, signo: "mt3" },
    { nombre: "Peso", suma: sumaPeso, signo: "kg" },
    { nombre: "Flete", suma: sumaFlete, signo: "$" },
    { nombre: "Monto seguro", suma: sumaMonto, signo: "$" },
    { nombre: "Subtotal", suma: sumaSubtotal, signo: "$" },
  ];

  return (
    <>
      {viajes ? (
        <>
          <div className="">
            <h3 className="badge bg-secondary fs-4">
              Total de viajes: {totalViajes}
            </h3>
            <h3 className="badge bg-secondary fs-4 mx-md-3">
              Total de guías: {sumaGuias.toLocaleString("en")}
            </h3>
          </div>
          <ContainerCards
            sumas={sumas}
            totalViajes={totalViajes}
            totalGuias={sumaGuias}
          />
          <div className="card">
            <DataTable
              ref={dt}
              value={newData}
              filters={filters}
              header={header}
              footerColumnGroup={footerGroup}
              showGridlines
              stripedRows
              sortMode="multiple"
              tableStyle={{ minWidth: "50rem", fontFamily: "Poppins" }}
              emptyMessage="No se encontraron resultados"
              {...(mostrarDesglosePorDestino && {
                expandedRows,
                onRowToggle: (e) => setExpandedRows(e.data),
                rowExpansionTemplate,
              })}
            >
              {mostrarDesglosePorDestino && (
                <Column expander style={{ width: "3em" }} />
              )}
              {cols.map((col, index) => (
                <Column
                  key={index}
                  field={col.field}
                  header={col.header}
                  sortable
                />
              ))}
            </DataTable>
          </div>
        </>
      ) : (
        <h3>No existen viajes en esta fecha, selecciona otra fecha</h3>
      )}
    </>
  );
}
