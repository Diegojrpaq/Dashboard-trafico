import React, { useEffect, useState } from 'react'
import { Calendar } from 'primereact/calendar'
import { addLocale } from 'primereact/api';
import Swal from 'sweetalert2';
import SpinnerMain from '../../viewsItems/SpinnerMain'
import { urlapi } from '../../utileria/config';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';
import TablaReporteViajesFecha from '../../viewsItems/tables/TablaReporteViajesFecha';
import ViajesHistorico from './ViajesHistorico';
export default function ReporteViajesPorFecha() {
    const [rangoFechas, setRangofechas] = useState(null);
    const [fechaState, setFechaState] = useState(null);
    const [peticionBackEnd, setPeticionBackend] = useState(false);
    const [viajesData, setViajesData] = useState(null);
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

    useEffect(() => {
        peticion();
    }, [])

    const peticionInfoViajes = async () => {
        const fechaAConsultar = fechaState && fechaState.toISOString().split('T')[0].replace(/-/g, '');
        const urlApiNextpack = urlapi + '/trafico/get_viajesDiario/' + fechaAConsultar;
        await fetch(urlApiNextpack)
            .then((resp) => {
                return resp.json();
            }).then((data) => {
                if (data) {
                    setPeticionBackend(true)
                    if (data.viajes === null) {
                        Swal.fire({
                            title: "¿Registro sin transacciones?",
                            text: "La fecha que seleccionaste no tiene viajes",
                            icon: "question",

                        });
                    } else {
                        setViajesData(data)
                    }
                }
            }).catch(
                () => console.log('Error al cargar los destinos y viajes')
            )
    }
    useEffect(() => {
        setPeticionBackend(false)
        setViajesData(null)
        if (fechaState !== null) {
            peticionInfoViajes();
        }
    }, [fechaState])

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
    let minDate;
    let maxDate;
    let fechaSelec = fechaState && fechaState.toISOString().split('T')[0].replace(/-/g, '');
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
                            showIcon 
                            readOnlyInput 
                        />
                    </div>
                </div>
                {
                    fechaState ? <LayoutViaje viajes={viajesData?.viajes} fecha={fechaSelec} peticion={peticionBackEnd} />
                        :
                        <>
                            <div className="col-12 col-md-12  p-1">
                                <div className="col-item shadow p-3 mb-4 mx-0 rounded">
                                    <h1 className='text-black'>Reporte Viajes Historico</h1>
                                    <div className='timeLineContainer'>
                                    </div>
                                    <h3>Porfavor selecciona una fecha</h3>
                                </div>
                            </div>
                        </>
                }
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
    const viajes = props.viajes;
    const fecha = props.fecha;
    return (
        <>
            {
                props.peticion ? <div className="col-12 col-md-12  p-1">
                    <div className="col-item shadow p-3 mb-4 mx-0 rounded">
                        <TablaReporteViajesFecha viajes={viajes} fecha={fecha} />
                    </div>
                    {/* <ViajesHistorico /> */}
                </div>
                    :
                    <div className="col-12 col-md-12  p-1">
                        <div className="col-item shadow p-3 mb-4 mx-0 rounded">
                            <SpinnerMain></SpinnerMain>
                        </div>
                    </div>
            }
        </>

    )
}
