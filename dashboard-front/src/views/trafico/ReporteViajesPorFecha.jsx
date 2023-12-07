import React, { useEffect, useState } from 'react'
import { Calendar } from 'primereact/calendar'
import { addLocale } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';
export default function ReporteViajesPorFecha() {
    const [fechaState, setFechaState] = useState(null);
    const [peticionBackEnd, setPeticionBackend] = useState(null);

    // const peticion = async () => {
    //     const urlApiNextpack = urlapi + '/trafico/get_dateValidation';
    //     await fetch(urlApiNextpack)
    //         .then((resp) => {
    //             return resp.json();
    //         }).then((data) => {
    //             if (data) {
    //                 setRangofechas(data.Rango)
    //             }

    //         }).catch(
    //             () => console.log('Error al cargar las fechas')
    //         )
    // }

    // useEffect(() => {
    //     if (fechaState !== null) {
    //         //hacemos fetch
    //         fetch(urlApiNextpack)
    //             .then((resp) => {
    //                 setPeticionBackend(true);
    //                 return resp.json();
    //             }).then((data) => {
    //                 if (data) {
    //                     setRangofechas(data.Rango)
    //                     setPeticionBackend(false);
    //                 }

    //             }).catch(
    //                 () => console.log('Error al cargar las fechas')
    //             )

    //     }
    // }, [fechaState])
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
                    <Calendar locale="es" value={fechaState} onChange={(e) => setFechaState(e.value)} dateFormat="dd/MM/yy" showIcon readOnlyInput />
                </div>
            </div>
        </>
    )
}
