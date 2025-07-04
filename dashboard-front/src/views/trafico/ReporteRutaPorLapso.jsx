import React, { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";
import Swal from "sweetalert2";
import SpinnerMain from "../../viewsItems/SpinnerMain";
import { Dropdown } from "primereact/dropdown";
import { urlapi } from "../../utileria/config";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css";
import TablaReporteViajesFecha from "../../viewsItems/tables/TablaReporteViajesFecha";
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
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        if (data) {
          setRangofechas(data.Rango);
        }
      })
      .catch(() => console.log("Error al cargar las fechas"));
  };
  //console.log(fechaState, "fechas")

  const data = async () => {
    if (fechaState !== null) {
      if (fechaState[1] !== null) {
        const primerFecha = new Date(fechaState[0]);
        const year1 = primerFecha.getFullYear();
        const month1 = (primerFecha.getMonth() + 1).toString().padStart(2, "0");
        const day1 = primerFecha.getDate().toString().padStart(2, "0");
        const fechaInicio = year1 + month1 + day1;
        const segundaFecha = new Date(fechaState[1]);
        const year2 = segundaFecha.getFullYear();
        const month2 = (segundaFecha.getMonth() + 1)
          .toString()
          .padStart(2, "0");
        const day2 = segundaFecha.getDate().toString().padStart(2, "0");
        const fechaFin = year2 + month2 + day2;
        setFechas([fechaInicio, fechaFin]);
        const idRuta = selectedViaje?.id;
        const urlApiNextpack = `${urlapi}/trafico/get_rutaRango/${fechaInicio}/${fechaFin}/${idRuta}`;
        await fetch(urlApiNextpack)
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            if (data) {
              //console.log(data, "data fetch")
              setPeticionBackend(true);
              setDataViajes(data);
            }
          })
          .catch(() => console.log("Error al cargar las fechas"));
      }
    }
  };

  useEffect(() => {
    peticion();
  }, []);

  const peticionInfoViajes = async () => {
    const urlApiNextpack = urlapi + "/trafico/get_rutasForaneas";
    await fetch(urlApiNextpack)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        if (data) {
          setViajesData(data);
        }
      })
      .catch(() => console.log("Error al cargar los destinos y viajes"));
  };
  useEffect(() => {
    setselectedViaje(null);
    setViajesData(null);
    setDataViajes(null);
    if (fechaState !== null) {
      if (fechaState[1] !== null) {
        peticionInfoViajes();
      }
    }
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
  let minDate;
  let maxDate;
  let fechaSelec = fechaState && fechaState;
  let list;
  if (viajesData?.Rutas) {
    list = viajesData?.Rutas;
  }
  if (rangoFechas !== null) {
    // Extraer partes de la cadena de fecha
    let yearMin = parseInt(rangoFechas.fechaMin.substring(0, 4));
    let monthMin = parseInt(rangoFechas.fechaMin.substring(4, 6)) - 1; // Restar 1 al mes (ya que los meses en JavaScript se indexan desde 0)
    let dayMin = parseInt(rangoFechas.fechaMin.substring(6, 8));

    let yearMax = parseInt(rangoFechas.fechaMax.substring(0, 4));
    let monthMax = parseInt(rangoFechas.fechaMax.substring(4, 6)) - 1;
    let dayMax = parseInt(rangoFechas.fechaMax.substring(6, 8));

    // Crear objetos de fecha
    minDate = new Date(yearMin, monthMin, dayMin);
    maxDate = new Date(yearMax, monthMax, dayMax);

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
              disabled={viajesData === null}
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
          <>
            <div className="col-12 col-md-12  p-1">
              <div className="col-item shadow p-3 mb-4 mx-0 rounded">
                <h1 className="text-black">Reporte Rutas Historico Analisis</h1>
                <div className="timeLineContainer"></div>
                <h3>Porfavor selecciona un rango de fechas </h3>
              </div>
            </div>
          </>
        )}
      </>
    );
  } else {
    return (
      <>
        <SpinnerMain />
      </>
    );
  }
}

function LayoutViaje(props) {
  const viajes = props.dataGuias;
  const fechas = props.fechas;
  return (
    <>
      {props.peticion ? (
        <div className="col-12 col-md-12  p-1">
          <div className="col-item shadow p-3 mb-4 mx-0 rounded">
            <TablaReporteViajesFecha viajes={viajes} fecha={fechas} />
          </div>
        </div>
      ) : (
        <div className="col-12 col-md-12  p-1">
          <div className="col-item shadow p-3 mb-4 mx-0 rounded">
            <SpinnerMain></SpinnerMain>
          </div>
        </div>
      )}
    </>
  );
}
