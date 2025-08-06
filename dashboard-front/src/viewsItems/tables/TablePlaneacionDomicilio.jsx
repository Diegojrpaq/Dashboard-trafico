import React, { useRef, useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { MultiSelect } from "primereact/multiselect";
import { FilterMatchMode } from "primereact/api";
import { formattedNumber, formattedCantidad } from "../../utileria/utils";

export default function TablePlaneacionDomicilio({
  guias,
  nombreDestino,
  volumenTotal,
  pesoTotal,
}) {
  const dt = useRef(null);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    numGuia: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  const [globalFilterValue, setGlobalFilterValue] = useState("");

  // ✅ Definir todas las columnas disponibles
  const allCols = [
    { field: "numGuia", header: "Número de Guía" },
    { field: "origen", header: "Origen" },
    { field: "destinoFinal", header: "Destino Final" },
    { field: "fechaVenta", header: "Fecha Venta" },
    { field: "destinoUbicacion", header: "Ubicación Actual" },
    { field: "sucursalUbicacion", header: "Sucursal Ubicación" },
    { field: "clienteDestino", header: "Cliente Destino" },
    { field: "estatusMovimiento", header: "Estatus Movimiento" },
    { field: "volumen", header: "Volumen (m³)" },
    { field: "peso", header: "Peso (kg)" },
    { field: "items", header: "Items" },
    { field: "descripcion", header: "Descripción" },
    { field: "notaIncidencia", header: "Nota Incidencia" },
    { field: "rutaDomicilio", header: "Ruta Domicilio" },
  ];

  // ✅ Columnas disponibles para el selector (excluye las que no quieres mostrar)
  const cols = allCols.filter(
    (col) =>
      // Excluir columnas específicas del selector
      !["numGuia"].includes(col.field)
  );

  // ✅ Estado para columnas visibles (inicialmente todas excepto algunas que pueden ser menos importantes)
  const [visibleColumns, setVisibleColumns] = useState([
    { field: "origen", header: "Origen" },
    { field: "destinoFinal", header: "Destino Final" },
    { field: "fechaVenta", header: "Fecha Venta" },
    { field: "destinoUbicacion", header: "Ubicación Actual" },
    { field: "clienteDestino", header: "Cliente Destino" },
    { field: "estatusMovimiento", header: "Estatus Movimiento" },
    { field: "volumen", header: "Volumen (m³)" },
    { field: "peso", header: "Peso (kg)" },
    { field: "items", header: "Items" },
  ]);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      global: { value, matchMode: FilterMatchMode.CONTAINS },
    }));
    setGlobalFilterValue(value);
  };

  // ✅ Función para manejar cambios en la selección de columnas
  const onColumnToggle = (event) => {
    const selectedColumns = event.value;
    setVisibleColumns(selectedColumns);
  };

  const nombreArchivo = `guiasXllegarDe${nombreDestino}`;
  const exportColumns = allCols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(exportColumns, guias);
        doc.save(`${nombreArchivo}.pdf`);
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(guias);
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
        const data = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
        });
        module.default.saveAs(data, fileName + ".xlsx");
      }
    });
  };

  const styleDropdown = {
    background: "#405189",
    color: "white",
  };

  // ✅ Templates para volumen y peso
  const volumenBodyTemplate = (rowData) => {
    return `${formattedCantidad(rowData.volumen)} m³`;
  };

  const pesoBodyTemplate = (rowData) => {
    return `${formattedCantidad(rowData.peso)} kg`;
  };

  // ✅ Header actualizado con MultiSelect para toggle de columnas
  const header = (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
      <div className="d-flex justify-content-center align-items-center responsive">
        <span className="d-lg-flex flex-row justify-content-center align-items-center mb-2 mb-md-0">
          <input
            type="text"
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            className="ms-lg-2 p-2 pe-lg-5 border-1 rounded w-55"
            placeholder="Búsqueda general"
          />
        </span>
      </div>

      {/* ✅ MultiSelect para seleccionar columnas visibles */}
      <div className="d-flex align-items-center gap-2">
        <MultiSelect
          value={visibleColumns}
          options={cols}
          optionLabel="header"
          onChange={onColumnToggle}
          placeholder="Seleccionar Columnas"
          display="chip"
          className="w-full md:w-20rem"
          maxSelectedLabels={3}
          style={{ minWidth: "250px" }}
        />

        <div
          className="dropdown d-flex align-items-center justify-content-end"
          style={{ fontFamily: "Poppins" }}
        >
          <button
            className="dropdown-toggle border-0 rounded px-3 py-1"
            type="button"
            data-bs-toggle="dropdown"
            style={styleDropdown}
          >
            Exportar
          </button>
          <ul className="dropdown-menu" style={{ cursor: "pointer" }}>
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
    </div>
  );

  // ✅ Footer dinámico basado en columnas visibles
  const footerGroup = (
    <ColumnGroup>
      <Row>
        <Column
          footer="Totales"
          colSpan={1}
          footerStyle={{ textAlign: "right", fontSize: "20px" }}
        />
        {visibleColumns.map((col) => {
          if (col.field === "volumen") {
            return (
              <Column
                key={col.field}
                footer={`${formattedCantidad(volumenTotal)} m³`}
              />
            );
          }
          if (col.field === "peso") {
            return (
              <Column
                key={col.field}
                footer={`${formattedCantidad(pesoTotal)} kg`}
              />
            );
          }
          return <Column key={col.field} footer="" />;
        })}
      </Row>
    </ColumnGroup>
  );

  return (
    <DataTable
      ref={dt}
      value={guias}
      filters={filters}
      header={header}
      footerColumnGroup={footerGroup}
      showGridlines
      stripedRows
      sortMode="multiple"
      scrollable
      tableStyle={{ minWidth: "1500px", fontFamily: "Poppins" }}
      emptyMessage="No se encontraron resultados"
    >
      {/* ✅ Columna fija: Número de Guía siempre visible */}
      <Column
        field="numGuia"
        header="Número de Guía"
        sortable
        frozen
        style={{ minWidth: "150px" }}
      />

      {/* ✅ Columnas dinámicas basadas en la selección */}
      {visibleColumns.map((col) => {
        if (col.field === "volumen") {
          return (
            <Column
              key={col.field}
              field={col.field}
              header={col.header}
              body={volumenBodyTemplate}
              sortable
            />
          );
        }
        if (col.field === "peso") {
          return (
            <Column
              key={col.field}
              field={col.field}
              header={col.header}
              body={pesoBodyTemplate}
              sortable
            />
          );
        }
        return (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            sortable
          />
        );
      })}
    </DataTable>
  );
}
