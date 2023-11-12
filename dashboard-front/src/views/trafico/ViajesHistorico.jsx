import React from 'react'
import { useState, useEffect } from 'react'
import { Calendar } from 'primereact/calendar'
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';
import '../../Css/viewViajesHistorico.css';
import { urlapi } from '../../utileria/config';
import { Dropdown } from 'primereact/dropdown';
import { addLocale } from 'primereact/api';

export default function ViajesHistorico() {


  const [date, setDate] = useState(null);
  const [selectedDestino, setselectedDestino] = useState(null);
  const [selectedViaje, setselectedViaje] = useState(null);
  const [peticionBackEnd, setPeticionBackend] = useState(null);
  const [optionDestino, setOptionDestino]= useState(null);


  const peticiones = async () => {
    const urlApiNextpack = urlapi + '/trafico/get_destinos';
    await fetch(urlApiNextpack)
      .then((resp) => {
        return resp.json();
      }).then((data) => {
        if (data) {
          console.log(data)
          setOptionDestino(data.Destinos)
        }

      }).catch(
        () => console.log('Error al cargar los destinos')
      )
  }

  useEffect(() => {
    peticiones();
  }, []);



  useEffect(() => {
    console.log(date, "Fecha")
  }, [date]);

  useEffect(() => {
    console.log(selectedDestino, "Destino")
  }, [selectedDestino]);

  useEffect(() => {
    console.log(selectedViaje, "Viaje")
    
    setPeticionBackend(true);
  }, [selectedViaje]);

  useEffect(() => {
    
  }, [peticionBackEnd]);

  

  const optionViajes = [
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' }
  ];

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
          <Calendar locale="es" value={date} onChange={(e) => setDate(e.value)} dateFormat="dd/MM/yy" showIcon readOnlyInput  />
        </div>
      </div>
      <div className="col-sm-12 col-md-6 col-lg-4 py-3 px-3">

      <div className="card flex shadow justify-content-center">
          <Dropdown disabled={date === null}  value={selectedDestino} onChange={(e) => setselectedDestino(e.value)} options={optionDestino} optionLabel="nombre"
            placeholder="Selecciona un Destino" className="w-full md:w-14rem" filter  />
        </div>
      </div>
      <div className="col-sm-12 col-md-12 col-lg-4 py-3 px-3">
        <div className="card flex shadow justify-content-center">
          <Dropdown disabled={selectedDestino === null} value={selectedViaje} onChange={(e) => setselectedViaje(e.value)} options={optionViajes} optionLabel="name"
            placeholder="Selecciona un Viaje" className="w-full md:w-14rem" filter  />
        </div>
      </div>
      <div className="col-12 col-md-12  p-1">
        <div className="col-item shadow p-3 mb-4 mx-0 rounded">
          <h1 className='text-black'>Viajes Historico</h1>
          <h3>Porfavor selecciona fecha y viaje  a visualizar</h3>
        </div>
      </div>
    </>
  )
}
