import React, { useState, useEffect} from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { Spinner } from 'react-bootstrap'
import { formattedCantidad } from '../utileria/utils';
import TableViajesActivos from './tables/TableViajesActivos';
import { urlapi } from '../utileria/config';
export default function AccordionDestinos({idDestino, nombreDestino}) {
    const [destinosList, setDestinosList] = useState([]);
    const [guiasXruta, setGuiasXruta] = useState([]);
    const [clicAccordion, setClicAccordion] = useState(false);
    //console.log(idDestino, "ID", nombreDestino)
    const peticionDataDestinos = async (id) => {
        const urlApiNextpackSidebar = urlapi + "/trafico/get_planxDestino/" + id
        //const urlApiNextpackSidebar = "http://192.168.10.113/trafico/get_planxDestino/" + id
        await fetch(urlApiNextpackSidebar)
            .then((resp) => {
                return resp.json();
            }).then((data) => {
                if (data) {
                    setDestinosList(data?.Destino)
                    //console.log(data, "DATA")
                    return data
                }
            }).catch(
                () => console.log('Error los datos del destino: ' + id)
            )
    }

    const peticionXruta = async (id) => {
        const urlApiNextpackSidebar = urlapi + "/trafico/get_planRuta/" + id
        await fetch(urlApiNextpackSidebar)
            .then((resp) => {
                return resp.json();
            }).then((data) => {
                if (data) {
                    setGuiasXruta(data?.rutas[0]?.catalogoGuiasPlaneadas)
                    console.log(data.rutas[0].catalogoGuiasPlaneadas, "DATA Ruta")
                    return data
                }
            }).catch(
                () => console.log('Error los datos del destino: ' + id)
            )
    }
    useEffect(() => {
        peticionDataDestinos(idDestino)
    }, [idDestino])

    function onClicAccordion(idRuta) {
        setGuiasXruta([])
        if(clicAccordion) {
            console.log(idRuta)
            peticionXruta(idRuta)
        }
        setClicAccordion(!clicAccordion);
    }
    //console.log(destinosList?.ruta, "DESTINOS", destinosList?.length)
    function sumarPropiedad(array, propiedad) {
        return array.reduce((suma, elemento) => {
            return suma + elemento.Totales.reduce((subtotal, total) => subtotal + total[propiedad], 0);
        }, 0);
    }

    if(destinosList?.length !== 0 && destinosList?.ruta?.lenght !== 0) {
        let sumaVolumen;
        let sumaPeso;
        let  sumaFlete;
        let sumaMontoSeg;
        let sumaSubtotal;
        let sumaGuias;
        let sumaCajas;
        if(destinosList?.ruta === undefined) {
            return <></>
        }
        console.log(destinosList?.ruta)
        const rutas = destinosList?.ruta;
       // const totalRedondeado = Number(suma.toFixed(2));
        sumaVolumen = Number(sumarPropiedad(rutas, 'volumen').toFixed(2))
        sumaPeso = sumarPropiedad(rutas, 'peso').toFixed(2);
        sumaFlete = sumarPropiedad(rutas, 'flete');
        sumaMontoSeg = sumarPropiedad(rutas, 'montoSeguro');
        sumaSubtotal = sumarPropiedad(rutas, 'subtotal');
        sumaGuias = sumarPropiedad(rutas, 'cantidadGuias');
        sumaCajas = sumarPropiedad(rutas, 'cantidadCajas');
        console.log(sumaVolumen, sumaGuias, "Sumas", nombreDestino)
        return (
            <Accordion key={idDestino} className=''>
                <Accordion.Item eventKey={1}>
                    <Accordion.Header onClick={() => onClicAccordion("Clic Accordion")}>
                        <Header
                            nombre={nombreDestino}
                            volumen={sumaVolumen}
                            peso={sumaPeso}
                            flete={sumaFlete}
                            seguro={sumaMontoSeg}
                            subtotal={sumaSubtotal}
                            guias={sumaGuias}
                            cajas={sumaCajas}
                        />
                    </Accordion.Header>
                    <Accordion.Body>
                        {
                            destinosList?.ruta?.map((ruta, i) => (
                                <Accordion key={i}>
                                    <Accordion.Item eventKey='1.1'>
                                        <Accordion.Header onClick={() => onClicAccordion(ruta.idRuta)}>
                                            <Header
                                                nombre={ruta?.nombre}
                                                volumen={ruta.Totales[0].volumen}
                                                peso={ruta.Totales[0].peso}
                                                flete={ruta.Totales[0].flete}
                                                seguro={ruta.Totales[0].montoSeguro}
                                                subtotal={ruta.Totales[0].subtotal}
                                                guias={ruta.Totales[0].cantidadGuias}
                                                cajas={ruta.Totales[0].cantidadCajas}
                                                paddingSize={1}
                                            />
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {
                                                guiasXruta?.length > 0 ?  
                                                <TableViajesActivos
                                                guias={guiasXruta}
                                                infoRuta={ruta.nombre}
                                               />
                                               : <Spinner />
                                            }
                                           
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            ))
                        }
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        )
    } else {
        return (
            <div className='d-flex column m-2 justify-content-center'>
                <Spinner className='Spinner-Graph'/>
            </div>
        )
    }
    
}

function Header({ nombre, volumen, peso, flete, seguro, subtotal, guias, cajas, paddingSize }) {
    const padd = paddingSize ? paddingSize : '2';
    return (
        <div className={`container p-${padd}`}>
            <div className='row'>
                <div className='col'>{nombre}</div>
                <div className='col'>Peso: {formattedCantidad(peso)}Kg</div>
                <div className='col'>Volumen: {formattedCantidad(volumen)}</div>
                <div className='col'>Flete: ${formattedCantidad(flete)}</div>
                <div className='col'>Seguro: ${formattedCantidad(seguro)}</div>
                <div className='col'>Subtotal: ${formattedCantidad(subtotal)}</div>
                <div className='col'>Guias: {guias}</div>
                {/* <div className='col'>Cajas: {cajas}</div> */}
            </div>
        </div>
    )
}