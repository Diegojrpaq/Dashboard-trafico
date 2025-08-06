import React, { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";
import Swal from "sweetalert2";
import SpinnerMain from "../../viewsItems/SpinnerMain";
import { Dropdown } from "primereact/dropdown";
import { urlapi } from "../../utileria/config";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import TablaReporteViajesFecha from "../../viewsItems/tables/TablaReporteViajesFecha";
import ContainerCards from "../../viewsItems/Cards/ContainerCards";

export default function ReporteRutaPorLapso() {
  const [rangoFechas, setRangofechas] = useState(null);
  const [fechaState, setFechaState] = useState(null);
  const [peticionBackEnd, setPeticionBackend] = useState(false);
  const [viajesData, setViajesData] = useState(null);
  const [selectedViaje, setselectedViaje] = useState(null);
  const [dataViajes, setDataViajes] = useState(null);
  const [fechas, setFechas] = useState(null);

  const peticion = async () => {
    const urlApiNextpack = urlapi + "/trafico/get_dateValidation";
    await fetch(urlApiNextpack)
      .then((resp) => resp.json())
      .then((data) => {
        if (data) setRangofechas(data.Rango);
      })
      .catch(() => console.log("Error al cargar las fechas"));
  };

  const data = async () => {
    if (fechaState?.[1]) {
      const [start, end] = fechaState;
      const fechaInicio = start.toISOString().slice(0, 10).replace(/-/g, "");
      const fechaFin = end.toISOString().slice(0, 10).replace(/-/g, "");
      setFechas([fechaInicio, fechaFin]);
      const idRuta = selectedViaje?.id;
      const urlApiNextpack = `${urlapi}/trafico/get_rutaRango/${fechaInicio}/${fechaFin}/${idRuta}`;
      await fetch(urlApiNextpack)
        .then((resp) => resp.json())
        .then((data) => {
          if (data) {
            console.log("📦 Data completa del backend:", data);
            setPeticionBackend(true);
            setDataViajes(data);
          }
        })
        .catch(() => console.log("Error al cargar las fechas"));
    }
  };

  useEffect(() => {
    peticion();
  }, []);

  const peticionInfoViajes = async () => {
    const urlApiNextpack = urlapi + "/trafico/get_rutasForaneas";
    await fetch(urlApiNextpack)
      .then((resp) => resp.json())
      .then((data) => {
        if (data) setViajesData(data);
      })
      .catch(() => console.log("Error al cargar los destinos y viajes"));
  };

  useEffect(() => {
    setselectedViaje(null);
    setViajesData(null);
    setDataViajes(null);
    if (fechaState?.[1]) peticionInfoViajes();
  }, [fechaState]);

  useEffect(() => {
    setDataViajes(null);
    setPeticionBackend(false);
    data();
  }, [selectedViaje]);

  addLocale("es", {
    firstDayOfWeek: 1,
    showMonthAfterYear: true,
    dayNames: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
    dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    monthNamesShort: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
    today: "Hoy",
    clear: "Limpiar",
  });

  let minDate, maxDate;
  if (rangoFechas) {
    minDate = new Date(
      parseInt(rangoFechas.fechaMin.substring(0, 4)),
      parseInt(rangoFechas.fechaMin.substring(4, 6)) - 1,
      parseInt(rangoFechas.fechaMin.substring(6, 8))
    );
    maxDate = new Date(
      parseInt(rangoFechas.fechaMax.substring(0, 4)),
      parseInt(rangoFechas.fechaMax.substring(4, 6)) - 1,
      parseInt(rangoFechas.fechaMax.substring(6, 8))
    );
  }

  let list = viajesData?.Rutas;

  if (!rangoFechas) return <SpinnerMain />;

  return (
    <>
      <div className="col-sm-12 col-md-6 col-lg-4 py-3 px-3">
        <div className="card shadow justify-content-center">
          <Calendar
            locale="es"
            value={fechaState}
            onChange={(e) => setFechaState(e.value)}
            dateFormat="dd/MM/yy"
            minDate={minDate}
            maxDate={maxDate}
            selectionMode="range"
            showIcon
            readOnlyInput
          />
        </div>
      </div>
      <div className="col-sm-12 col-md-12 col-lg-4 py-3 px-3">
        <div className="card flex shadow justify-content-center">
          <Dropdown
            disabled={!viajesData}
            value={selectedViaje}
            onChange={(e) => setselectedViaje(e.value)}
            options={list}
            optionLabel="nombre"
            placeholder="Selecciona un Viaje"
            className="w-full md:w-14rem"
            filter
          />
        </div>
      </div>

      {fechaState && selectedViaje ? (
        <LayoutViaje
          dataGuias={dataViajes?.viajes}
          fechas={fechas}
          peticion={peticionBackEnd}
        />
      ) : (
        <div className="col-12 col-md-12 p-1">
          <div className="col-item shadow p-3 mb-4 mx-0 rounded">
            <h1 className="text-black">Reporte Rutas Historico Analisis</h1>
            <h3>Porfavor selecciona un rango de fechas</h3>
          </div>
        </div>
      )}
    </>
  );
}

function LayoutViaje(props) {
  const viajes = props.dataGuias;
  const fechas = props.fechas;

  const viajesPorDestino = viajes?.reduce((acc, viaje) => {
    const destino = viaje.destinoFinal || "Sin destino";
    if (!acc[destino]) acc[destino] = [];
    acc[destino].push(viaje);
    return acc;
  }, {});

  const renderCardsPorDestino = () => {
    if (!viajesPorDestino) return null;

    return Object.entries(viajesPorDestino).map(([destino, lista]) => {
      const totalViajes = lista.length;
      const sumaVolumen = lista.reduce((sum, v) => sum + v.volumenTotal, 0);
      const sumaPeso = lista.reduce((sum, v) => sum + v.pesoTotal, 0);
      const sumaFlete = lista.reduce((sum, v) => sum + v.fleteTotal, 0);
      const sumaMonto = lista.reduce((sum, v) => sum + v.montoSeguroTotal, 0);
      const sumaSubtotal = lista.reduce((sum, v) => sum + v.subtotalTotal, 0);

      const sumas = [
        { nombre: "Volumen", suma: sumaVolumen, signo: "mt3" },
        { nombre: "Peso", suma: sumaPeso, signo: "kg" },
        { nombre: "Flete", suma: sumaFlete, signo: "$" },
        { nombre: "Monto seguro", suma: sumaMonto, signo: "$" },
        { nombre: "Subtotal", suma: sumaSubtotal, signo: "$" },
      ];

      return (
        <div key={destino} className="my-5">
          <h4 className="fw-bold text-primary mb-3">Destino: {destino}</h4>
          <ContainerCards sumas={sumas} totalViajes={totalViajes} />
        </div>
      );
    });
  };

  return (
    <>
      {props.peticion ? (
        <div className="col-12 col-md-12 p-1">
          <div className="col-item shadow p-3 mb-4 mx-0 rounded">
            <TablaReporteViajesFecha
              viajes={viajes}
              fecha={fechas}
              mostrarDesglosePorDestino={true}
            />
            <div className="mt-5">
              <h3 className="fw-bold mb-4 text-dark">Totales por destino</h3>
              {renderCardsPorDestino()}
            </div>
          </div>
        </div>
      ) : (
        <div className="col-12 col-md-12 p-1">
          <div className="col-item shadow p-3 mb-4 mx-0 rounded">
            <SpinnerMain />
          </div>
        </div>
      )}
    </>
  );
}
