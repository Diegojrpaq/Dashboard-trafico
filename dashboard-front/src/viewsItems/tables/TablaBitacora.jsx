import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function TablaBitacora(props) {
  const cols = [
    { field: "origen_salida", header: "Origen" },
    { field: "fecha_salida", header: "Fecha Salida" },
    { field: 'hora_salida', header: 'Hora Salida' },
    { field: 'kmSalida', header: 'Km Salida' },
    { field: 'destino_llegada', header: 'Destino' },
    { field: 'fecha_llegada', header: 'Fecha Llegada' },
    { field: 'hora_llegada', header: 'Hora Llegada' },
    { field: 'kmLlegada', header: 'Km Llegada' },
    { field: 'selloPosterior', header: 'Sello Posterior' },
    { field: 'selloLateral', header: 'Sello Lateral' },
  ];

  const data = props.info.Bitacora.map(registro => ({
    origen_salida: registro.Origen_Salida,
    fecha_salida: registro.FechaSalida,
    hora_salida: registro.HoraSalida,
    kmSalida: registro.KMSalida,
    destino_llegada: registro.Destino_Llegada,
    fecha_llegada: registro.FechaLlegada,
    hora_llegada: registro.HoraLlegada,
    kmLlegada: registro.KMLlegada,
    selloPosterior: registro.SelloPosterior,
    selloLateral: registro.SelloLateral,
  }))

  return (
    <>
      <div className="card">
        <DataTable
          value={data}
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
