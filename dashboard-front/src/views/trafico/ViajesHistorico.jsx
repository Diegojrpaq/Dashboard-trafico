import React from 'react'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { Calendar } from 'primereact/calendar'
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';
import '../../Css/viewViajesHistorico.css';
import { urlapi } from '../../utileria/config';
import { Dropdown } from 'primereact/dropdown';
import { addLocale } from 'primereact/api';
import SpinnerMain from '../../viewsItems/SpinnerMain'
import TimeLine from '../../viewsItems/TimeLine';
import GraficaHistorico from '../../viewsItems/graphs/GraficaHistorico';
import TablasHistorico from '../../viewsItems/tables/TablasHistorico';
import { bitacoraVSembarcadas } from '../../utileria/utils';



export default function ViajesHistorico() {

  const [rangoFechas, setRangofechas] = useState(null);
  const [date, setDate] = useState(null);
  const [infoGlobal, setInfoGlobal] = useState(null);
  const [destinosList, setDestinosList] = useState(null);
  const [selectedDestino, setselectedDestino] = useState(null);
  const [viajesList, setViajesList] = useState(null);
  const [selectedViaje, setselectedViaje] = useState(null);
  const [infoViaje, setInfoViaje] = useState(null)
  const [peticionBackEnd, setPeticionBackend] = useState(null);
  const [listParadas, setListParadas] = useState(null);
  const [numViaje, setNumViaje] = useState("");

  const peticion = async () => {
    const urlApiNextpack = urlapi + '/trafico/get_dateValidation';
    await fetch(urlApiNextpack)
      .then((resp) => {
        return resp.json();
      }).then((data) => {
        if (data) {
          setRangofechas(data.Rango)
        }

      }).catch(
        () => console.log('Error al cargar las fechas')
      )
  }
  const peticionInfoField = async () => {
    const fechaAConsultar = date && date.toISOString().split('T')[0].replace(/-/g, '')
    const urlApiNextpack = urlapi + '/trafico/get_infoHistorico/' + fechaAConsultar;
    await fetch(urlApiNextpack)
      .then((resp) => {
        return resp.json();
      }).then((data) => {
        if (data) {
          setInfoGlobal(data.infoSelected)
        }
      }).catch(
        () => console.log('Error al cargar los destinos y viajes')
      )
  }
  const peticionViaje = async () => {
    const urlApiNextpack = urlapi + '/trafico/get_viajeHistorico/' + selectedViaje.id_viaje;
    await fetch(urlApiNextpack)
      .then((resp) => {
        return resp.json();
      }).then((data) => {
        if (data) {

          setInfoViaje(data.viaje)
          setPeticionBackend(false)
          setListParadas(generarParadas(data.viaje.Bitacora))
          if (data.viaje.catalogoGuias == null) {
            Swal.fire({
              title: "¿Registro sin transacciones?",
              text: "El registro que seleccionaste no cuenta con transacciones de guias embarcadas o desembarcadas",
              icon: "question",

            });
          }
          const viajeError = bitacoraVSembarcadas(generarParadas(data.viaje.Bitacora), data.viaje.catalogoGuias)
          if (viajeError.error) {
            Swal.fire({
              icon: "error",
              title: "Inconsistencia en registro de viaje",
              text: "Las transacciones registradas de este viaje, no coinciden con el registro de la bitacora, consulta el detalle de las inconsistencias en la parte inferior 'Guías Error'.",
            });
          }
        }
      }).catch(
        () => console.log('Error al cargar los destinos y viajes')
      )
  }

  const generarParadas = (bitacora) => {
    const listTemp = [{ id: null, nombre: null }];

    if (bitacora !== null) {
      bitacora.forEach(element => {
        const existeOrigen = listTemp.some(
          (destino) => destino.nombre === element.Origen_Salida
        );

        if (!existeOrigen) {
          listTemp.push({
            id: element.Origen_id,
            nombre: element.Origen_Salida
          })
        }
        const existeDestino = listTemp.some(
          (destino) => destino.nombre === element.Destino_Llegada
        );

        if (!existeDestino) {
          listTemp.push({
            id: element.Destino_id,
            nombre: element.Destino_Llegada
          })
        }

      });
      // Elimina el elemento de inicialización
      listTemp.shift();
      /*  listTemp.forEach((elemnt)=>{
         bitacora.forEach((elemntbitacora)=>{
           if(elemnt.id == elemntbitacora.Origen_id){
             const horaSalida= elemntbitacora.HoraSalida;
             const fechaSalida= elemntbitacora.ForaSalida;
           }
         })
       }) */

      return listTemp;
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setPeticionBackend(true)
    setDate(null)
    setselectedDestino(null)
    setselectedViaje(null)
    if(numViaje.length > 0 && (/^\d{0,5}$/.test(numViaje))) {
      const urlApiNextpack = urlapi + '/trafico/get_viajeHistorico/' + numViaje;
      await fetch(urlApiNextpack)
        .then((resp) => {
          setNumViaje("")
          return resp.json();
        }).then((data) => {
          if (data) {
            setInfoViaje(data.viaje)
            setPeticionBackend(false)
            setListParadas(generarParadas(data.viaje.Bitacora))
            if (data.viaje.catalogoGuias == null) {
              Swal.fire({
                title: "¿Registro sin transacciones?",
                text: "El registro que seleccionaste no cuenta con transacciones de guias embarcadas o desembarcadas",
                icon: "question",
              });
            }
            const viajeError = bitacoraVSembarcadas(generarParadas(data.viaje.Bitacora), data.viaje.catalogoGuias)
            if (viajeError.error) {
              Swal.fire({
                icon: "error",
                title: "Inconsistencia en registro de viaje",
                text: "Las transacciones registradas de este viaje, no coinciden con el registro de la bitacora, consulta el detalle de las inconsistencias en la parte inferior 'Guías Error'.",
              });
            }
          }
        }).catch(
          () => console.log('Error al cargar los destinos y viajes')
        )
    } else {
      setNumViaje("")
      setPeticionBackend(null)
      Swal.fire({
        icon: "error",
        title: "Error!!",
        text: "Has dejado vacío el campo o contiene letras, por favor digita un número de viaje válido",
      });
    }
  }

  useEffect(() => {
    peticion();
  }, []);


  useEffect(() => {
    if (date !== null) {
      setInfoGlobal(null)
      setDestinosList(null)
      setselectedDestino(null)
      setViajesList(null)
      setselectedViaje(null)
      //setInfoViaje(null)
      peticionInfoField();
    }
  }, [date]);

  useEffect(() => {
    if (infoGlobal !== null) {
      let listaTemporal = [{ id_destino: null, nombre_destino: null }];

      infoGlobal.forEach((elemento) => {
        const existeDestino = listaTemporal.some(
          (destino) => destino.nombre_destino === elemento.nombre_destino
        );

        if (!existeDestino) {
          listaTemporal.push({
            id_destino: elemento.id_destino,
            nombre_destino: elemento.nombre_destino,
          });
        }
      });
      // Elimina el elemento de inicialización
      listaTemporal.shift();
      setDestinosList(listaTemporal)
    }
  }, [infoGlobal]);

  useEffect(() => {
    if (selectedDestino !== null) {
      const listaTemporal = infoGlobal.filter(destino => destino.nombre_destino === selectedDestino.nombre_destino)
      setViajesList(listaTemporal)
    }
  }, [selectedDestino]);

  useEffect(() => {
    if (selectedViaje !== null) {
      setPeticionBackend(true)
      setInfoViaje(null)
      setListParadas(null)
      peticionViaje();

    }
  }, [selectedViaje]);



  if (rangoFechas !== null) {

    // Extraer partes de la cadena de fecha
    let yearMin = parseInt(rangoFechas.fechaMin.substring(0, 4));
    let monthMin = parseInt(rangoFechas.fechaMin.substring(4, 6)) - 1; // Restar 1 al mes (ya que los meses en JavaScript se indexan desde 0)
    let dayMin = parseInt(rangoFechas.fechaMin.substring(6, 8));

    let yearMax = parseInt(rangoFechas.fechaMax.substring(0, 4));
    let monthMax = parseInt(rangoFechas.fechaMax.substring(4, 6)) - 1;
    let dayMax = parseInt(rangoFechas.fechaMax.substring(6, 8));

    // Crear objetos de fecha
    let minDate = new Date(yearMin, monthMin, dayMin);
    let maxDate = new Date(yearMax, monthMax, dayMax);



    const selectedCountryTemplate = (option, props) => {
      if (option) {
        return (
          <div className="flex align-items-center">
            <div>{option.nombre}</div>
          </div>
        );
      }
      return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option) => {
      return (
        <div className="flex align-items-center">
          <div>{option.nombre}</div>
        </div>
      );
    };

    addLocale('es', {
      firstDayOfWeek: 1,
      showMonthAfterYear: true,
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      today: 'Hoy',
      clear: 'Limpiar'
    });



    return (
      <>
        <div className="col-sm-12 col-md-6 col-lg-4 py-3 px-3">
          <div className="card shadow justify-content-center">
            <Calendar locale="es" value={date} onChange={(e) => setDate(e.value)} dateFormat="dd/MM/yy" minDate={minDate} maxDate={maxDate} showIcon readOnlyInput />
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 py-3 px-3">

          <div className="card flex shadow justify-content-center">
            <Dropdown disabled={destinosList === null} value={selectedDestino} onChange={(e) => setselectedDestino(e.value)} options={destinosList} optionLabel="nombre_destino"
              placeholder="Selecciona el Origen" className="w-full md:w-14rem" filter />
          </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-4 py-3 px-3">
          <div className="card flex shadow justify-content-center">
            <Dropdown disabled={viajesList === null} value={selectedViaje} onChange={(e) => setselectedViaje(e.value)} options={viajesList} optionLabel="nombre_viaje"
              placeholder="Selecciona un Viaje" className="w-full md:w-14rem" filter />
          </div>
        </div>

        <form className="d-md-flex justify-content-end" onSubmit={handleSubmit}>
          <div className='mx-2'>
            <input 
              type="text" id='numViaje'
              maxLength={5}
              minLength={5}
              className='form-control shadow my-2'
              placeholder='Número de viaje'
              value={numViaje}
              onChange={(e) => setNumViaje(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center mt-0">
            <button type="submit" className="btn my-2 shadow" style={{backgroundColor: "#6366f1", color: "white"}}>Buscar viaje</button>
          </div>
        </form>
        {/* {
          infoViaje ? <SpinnerMain /> : <LayoutViaje />
        } */}
        <LayoutViaje info={infoViaje} peticion={peticionBackEnd} listParadas={listParadas} />
      </>
    )
  } else {
    return (
      <>
        <SpinnerMain />
      </>
    )
  }
}


function LayoutViaje(props) {
  const viaje = props.info
  if (props.peticion === null) {
    return (
      <div className="col-12 col-md-12  p-1">
        <div className="col-item shadow p-3 mb-4 mx-0 rounded">
          <h1 className='text-black'>Viajes Historico</h1>
          <div className='timeLineContainer'>
          </div>
          <h3>Porfavor selecciona fecha y viaje  a visualizar</h3>
        </div>
      </div>
    )
  } else if (props.peticion === true) {
    return (
      <div className="col-12 col-md-12  p-1">
        <div className="col-item shadow p-3 mb-4 mx-0 rounded">
          <SpinnerMain></SpinnerMain>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="col-12 col-md-12  p-1">
        <div className="col-item shadow p-3 mb-4 mx-0 rounded">
          <TimeLine ListParadas={props.listParadas} info={viaje}></TimeLine>
          <GraficaHistorico listParadas={props.listParadas} info={viaje}></GraficaHistorico>
          <TablasHistorico info={viaje} paradas={props.listParadas} />
        </div>
      </div>
    )
  }
}




