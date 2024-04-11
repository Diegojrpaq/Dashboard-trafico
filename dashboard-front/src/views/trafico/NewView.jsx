import React, { useContext, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { globalData } from '../../App';
import { urlapi } from '../../utileria/config';

export default function NewView() {
    const { destinosPlanRuta } = useContext(globalData);
    const [destinosList, setDestinosList] = useState([]);
    const peticionSidebar = async () => {
        /* const urlApiNextpackSidebar = '/trafico/get_destinos/' + tokenUser; */
        const urlApiNextpackSidebar = urlapi + '/trafico/get_destinos';
        await fetch(urlApiNextpackSidebar)
            .then((resp) => {
                return resp.json();
            }).then((data) => {
                if (data) {
                    setDestinosList(data.Destinos)
                    console.log(data)
                    return data
                }
            }).catch(
                () => console.log('Error al cargar los destinos')
            )
    }

    //Obtener los destinos que su sucural tiene al menos una ruta configurada
    const destinosConRutasConfiguradas = destinosPlanRuta.filter(destino => {
        return destino.sucursales.some(sucursal => sucursal.rutas_configuradas !== null);
    });
    //Crea objeto con el destino y sus rutas configuradas
    const destinosRutas = destinosConRutasConfiguradas.map(destino => {
        const rutas = destino.sucursales
            .filter(sucursal => sucursal.rutas_configuradas !== null)
            .flatMap(sucursal => sucursal.rutas_configuradas);

        return {
            id: destino.id,
            nombre: destino.nombre,
            rutas: rutas
        }
    })

    function getDestinosRutas() {
        console.log("Clic")
        setDestinosList(destinosRutas);
    }

    function onClicAccordion(text) {
        console.log(text)
    }

    return (
        <>
            {
                destinosRutas.map((destino, i) => (
                    <Accordion className=''>
                        <Accordion.Item eventKey={1}>
                            <Accordion.Header onClick={() => onClicAccordion("Clic Accordion")}>
                                <Header
                                    nombre={destino.nombre}
                                    peso="47"
                                    flete={2111}
                                    subtotal="1220"
                                />
                            </Accordion.Header>
                            <Accordion.Body>
                                {
                                    destino.rutas.map((ruta) => (
                                        <Accordion>
                                            <Accordion.Item eventKey='1.1'>
                                                <Accordion.Header onClick={() => onClicAccordion(`Clic Accordion ruta: ${ruta.id_ruta}`)}>
                                                    <Header
                                                        nombre={ruta.nombre_ruta}
                                                        peso="89"
                                                        flete={908}
                                                        subtotal="220"
                                                        paddingSize={1}
                                                    />
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    Detalles
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    ))
                                }
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                ))
            }
        </>
    );
}

function Header({ nombre, peso, flete, subtotal, paddingSize }) {
    const padd = paddingSize ? paddingSize : '2';
    return (
        <div className={`container p-${padd}`}>
            <div className='row'>
                <div className='col'>{nombre}</div>
                <div className='col'>Flete: ${flete}</div>
                <div className='col'>Peso: {peso}Kg</div>
                <div className='col'>Subtotal: ${subtotal}</div>
            </div>
        </div>
    )
}
